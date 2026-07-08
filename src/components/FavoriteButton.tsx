"use client";

import { useFavorites } from "@/hooks/useFavorites";

type FavoriteButtonProps = {
  concertId: string;
  className?: string;
};

export default function FavoriteButton({
  concertId,
  className = "",
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(concertId);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(concertId);
  }

  return (
    <button
      onClick={handleClick}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      className={`text-xl ${
        favorited ? "text-red-500" : "text-neutral-400 dark:text-white"
      } ${className}`}
    >
      {favorited ? "★" : "☆"}
    </button>
  );
}