import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  name: string;
  email: string;
  message: string;
  honeypot?: string; // Anti-spam honeypot field
}

// HTML escape function to prevent XSS in emails
const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Processing contact form submission");

    // Get IP address and user agent for rate limiting
    const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Parse and validate request body
    const { name, email, message, honeypot }: ContactFormRequest = await req.json();

    // Anti-spam honeypot check
    if (honeypot) {
      console.log("Honeypot triggered - potential spam detected");
      return new Response(
        JSON.stringify({ error: "Invalid submission" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Input validation
    if (!name || name.trim().length === 0 || name.trim().length > 100) {
      return new Response(
        JSON.stringify({ error: "Name must be between 1 and 100 characters" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid email address" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!message || message.trim().length === 0 || message.trim().length > 2000) {
      return new Response(
        JSON.stringify({ error: "Message must be between 1 and 2000 characters" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedMessage = message.trim();

    // Sanitize inputs for HTML email display
    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeMessage = escapeHtml(trimmedMessage);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Rate limiting - check last 3 submissions in past hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    // Check email rate limit
    const { data: emailSubmissions, error: emailCheckError } = await supabase
      .from("contact_submissions")
      .select("id")
      .eq("email", trimmedEmail)
      .gte("created_at", oneHourAgo);

    if (emailCheckError) {
      console.error("Error checking email rate limit:", emailCheckError);
    } else if (emailSubmissions && emailSubmissions.length >= 3) {
      return new Response(
        JSON.stringify({ error: "Too many submissions. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Check IP rate limit
    const { data: ipSubmissions, error: ipCheckError } = await supabase
      .from("contact_submissions")
      .select("id")
      .eq("ip_address", ipAddress)
      .gte("created_at", oneHourAgo);

    if (ipCheckError) {
      console.error("Error checking IP rate limit:", ipCheckError);
    } else if (ipSubmissions && ipSubmissions.length >= 3) {
      return new Response(
        JSON.stringify({ error: "Too many submissions from this location. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Insert submission into database
    const { error: insertError } = await supabase
      .from("contact_submissions")
      .insert({
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
        ip_address: ipAddress,
        user_agent: userAgent,
      });

    if (insertError) {
      console.error("Error inserting submission:", insertError);
      throw new Error("Failed to save submission");
    }

    console.log("Submission saved to database");

    // Send notification email to you
    const notificationEmail = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["dsahare75@gmail.com"],
      subject: `New Contact Form Submission from ${safeName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
        <p><small>IP: ${ipAddress}</small></p>
      `,
    });

    if (notificationEmail.error) {
      console.error("Error sending notification email:", notificationEmail.error);
    } else {
      console.log("Notification email sent successfully");
    }

    // Send auto-reply to the person who contacted you
    const autoReplyEmail = await resend.emails.send({
      from: "Diksha Sahare <onboarding@resend.dev>",
      to: [trimmedEmail],
      subject: "Thanks for reaching out!",
      html: `
        <h2>Hi ${safeName},</h2>
        <p>Thank you for contacting me! I've received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Diksha Sahare</p>
        <hr>
        <p><small>This is an automated response. Please do not reply to this email.</small></p>
      `,
    });

    if (autoReplyEmail.error) {
      console.error("Error sending auto-reply email:", autoReplyEmail.error);
    } else {
      console.log("Auto-reply email sent successfully");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Thank you for your message! I'll get back to you soon." 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    // Return generic error message to client (don't expose internal details)
    return new Response(
      JSON.stringify({ error: "Failed to send message. Please try again later." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
