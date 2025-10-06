import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

// Check if user is authenticated
const getIsAuthenticated = async (): Promise<boolean> => {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
};

// Generate a simple browser fingerprint for guest tracking
const getBrowserFingerprint = (): string => {
  const stored = localStorage.getItem("gallery_user_id");
  if (stored) return stored;
  
  const fingerprint = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem("gallery_user_id", fingerprint);
  return fingerprint;
};

interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  date: string;
  location: string;
  span: string;
  likes_count: number;
}

export const useGalleryLikes = () => {
  const queryClient = useQueryClient();
  const [userIdentifier, setUserIdentifier] = useState(getBrowserFingerprint());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Update user identifier based on authentication status
  useEffect(() => {
    const updateUserIdentifier = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsAuthenticated(true);
        setUserIdentifier(data.session.user.id);
      } else {
        setIsAuthenticated(false);
        setUserIdentifier(getBrowserFingerprint());
      }
    };
    
    updateUserIdentifier();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsAuthenticated(true);
        setUserIdentifier(session.user.id);
      } else {
        setIsAuthenticated(false);
        setUserIdentifier(getBrowserFingerprint());
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch all photos
  const { data: photos = [], isLoading } = useQuery({
    queryKey: ["gallery-photos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_photos")
        .select("*")
        .order("created_at", { ascending: true });
      
      if (error) throw error;
      return data as GalleryPhoto[];
    },
  });

  // Fetch user's liked photos
  // For guests: use localStorage (can't query DB due to RLS)
  // For authenticated users: query from database
  const { data: likedPhotos = [] } = useQuery({
    queryKey: ["gallery-likes", userIdentifier],
    queryFn: async () => {
      // For guests, retrieve likes from localStorage
      if (!isAuthenticated || userIdentifier.startsWith('guest_')) {
        const stored = localStorage.getItem(`gallery_likes_${userIdentifier}`);
        return stored ? JSON.parse(stored) : [];
      }
      
      // For authenticated users, query from database
      const { data, error } = await supabase
        .from("gallery_likes")
        .select("photo_id")
        .eq("user_identifier", userIdentifier);
      
      if (error) throw error;
      return data.map(like => like.photo_id);
    },
  });

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel("gallery-photos-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "gallery_photos",
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["gallery-photos"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  // Like mutation
  const likeMutation = useMutation({
    mutationFn: async (photoId: string) => {
      // For guests, also update localStorage
      if (userIdentifier.startsWith('guest_')) {
        const stored = localStorage.getItem(`gallery_likes_${userIdentifier}`);
        const currentLikes = stored ? JSON.parse(stored) : [];
        localStorage.setItem(
          `gallery_likes_${userIdentifier}`,
          JSON.stringify([...currentLikes, photoId])
        );
      }
      
      const { error } = await supabase.from("gallery_likes").insert({
        photo_id: photoId,
        user_identifier: userIdentifier,
      });
      
      if (error) throw error;
      // likes_count is now automatically updated by database trigger
    },
    onMutate: async (photoId) => {
      await queryClient.cancelQueries({ queryKey: ["gallery-photos"] });
      await queryClient.cancelQueries({ queryKey: ["gallery-likes", userIdentifier] });

      const previousPhotos = queryClient.getQueryData<GalleryPhoto[]>(["gallery-photos"]);
      const previousLikes = queryClient.getQueryData<string[]>(["gallery-likes", userIdentifier]);

      queryClient.setQueryData<GalleryPhoto[]>(["gallery-photos"], (old = []) =>
        old.map(photo =>
          photo.id === photoId
            ? { ...photo, likes_count: photo.likes_count + 1 }
            : photo
        )
      );

      queryClient.setQueryData<string[]>(["gallery-likes", userIdentifier], (old = []) => [
        ...old,
        photoId,
      ]);

      return { previousPhotos, previousLikes };
    },
    onError: (err, photoId, context) => {
      if (context?.previousPhotos) {
        queryClient.setQueryData(["gallery-photos"], context.previousPhotos);
      }
      if (context?.previousLikes) {
        queryClient.setQueryData(["gallery-likes", userIdentifier], context.previousLikes);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery-photos"] });
      queryClient.invalidateQueries({ queryKey: ["gallery-likes", userIdentifier] });
    },
  });

  // Unlike mutation
  const unlikeMutation = useMutation({
    mutationFn: async (photoId: string) => {
      // For guests, also update localStorage
      if (userIdentifier.startsWith('guest_')) {
        const stored = localStorage.getItem(`gallery_likes_${userIdentifier}`);
        const currentLikes = stored ? JSON.parse(stored) : [];
        localStorage.setItem(
          `gallery_likes_${userIdentifier}`,
          JSON.stringify(currentLikes.filter((id: string) => id !== photoId))
        );
      }
      
      const { error } = await supabase
        .from("gallery_likes")
        .delete()
        .eq("photo_id", photoId)
        .eq("user_identifier", userIdentifier);
      
      if (error) throw error;
      // likes_count is now automatically updated by database trigger
    },
    onMutate: async (photoId) => {
      await queryClient.cancelQueries({ queryKey: ["gallery-photos"] });
      await queryClient.cancelQueries({ queryKey: ["gallery-likes", userIdentifier] });

      const previousPhotos = queryClient.getQueryData<GalleryPhoto[]>(["gallery-photos"]);
      const previousLikes = queryClient.getQueryData<string[]>(["gallery-likes", userIdentifier]);

      queryClient.setQueryData<GalleryPhoto[]>(["gallery-photos"], (old = []) =>
        old.map(photo =>
          photo.id === photoId
            ? { ...photo, likes_count: Math.max(0, photo.likes_count - 1) }
            : photo
        )
      );

      queryClient.setQueryData<string[]>(["gallery-likes", userIdentifier], (old = []) =>
        old.filter(id => id !== photoId)
      );

      return { previousPhotos, previousLikes };
    },
    onError: (err, photoId, context) => {
      if (context?.previousPhotos) {
        queryClient.setQueryData(["gallery-photos"], context.previousPhotos);
      }
      if (context?.previousLikes) {
        queryClient.setQueryData(["gallery-likes", userIdentifier], context.previousLikes);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery-photos"] });
      queryClient.invalidateQueries({ queryKey: ["gallery-likes", userIdentifier] });
    },
  });

  const toggleLike = (photoId: string) => {
    if (likedPhotos.includes(photoId)) {
      unlikeMutation.mutate(photoId);
    } else {
      likeMutation.mutate(photoId);
    }
  };

  return {
    photos,
    isLoading,
    likedPhotos,
    toggleLike,
    isLiked: (photoId: string) => likedPhotos.includes(photoId),
  };
};
