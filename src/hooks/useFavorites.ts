"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "stagepass-favorites";

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // Runs once, when a component using this hook first loads.
  // We read whatever was saved previously from localStorage.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setFavoriteIds(JSON.parse(stored));
    }
  }, []);

  function toggleFavorite(id: string) {
    setFavoriteIds((prev) => {
      const isAlreadyFavorite = prev.includes(id);
      const updated = isAlreadyFavorite
        ? prev.filter((favId) => favId !== id) // remove it
        : [...prev, id]; // add it

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  function isFavorite(id: string) {
    return favoriteIds.includes(id);
  }

  return { favoriteIds, toggleFavorite, isFavorite };
}