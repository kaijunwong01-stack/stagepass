"use client";

import { createContext, useContext, useEffect, useState } from "react";

type FavoritesContextType = {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const STORAGE_KEY = "stagepass-favorites";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

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
        ? prev.filter((favId) => favId !== id)
        : [...prev, id];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  function isFavorite(id: string) {
    return favoriteIds.includes(id);
  }

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}