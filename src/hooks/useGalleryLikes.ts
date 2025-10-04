import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

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
  const [userIdentifier] = useState(getBrowserFingerprint());

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
  const { data: likedPhotos = [] } = useQuery({
    queryKey: ["gallery-likes", userIdentifier],
    queryFn: async () => {
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
      const { error } = await supabase.from("gallery_likes").insert({
        photo_id: photoId,
        user_identifier: userIdentifier,
      });
      
      if (error) throw error;

      // Increment likes_count
      const photo = photos.find(p => p.id === photoId);
      if (photo) {
        await supabase
          .from("gallery_photos")
          .update({ likes_count: photo.likes_count + 1 })
          .eq("id", photoId);
      }
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
      const { error } = await supabase
        .from("gallery_likes")
        .delete()
        .eq("photo_id", photoId)
        .eq("user_identifier", userIdentifier);
      
      if (error) throw error;

      // Decrement likes_count
      const photo = photos.find(p => p.id === photoId);
      if (photo) {
        await supabase
          .from("gallery_photos")
          .update({ likes_count: Math.max(0, photo.likes_count - 1) })
          .eq("id", photoId);
      }
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
