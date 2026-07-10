"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import { Concert } from "@/data/concerts";
import { useFavorites } from "@/hooks/useFavorites";

type EventListProps = {
  concerts: Concert[];
};

const ITEMS_PER_PAGE = 8;

export default function EventList({ concerts }: EventListProps) {
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { isFavorite } = useFavorites();

  const genres = ["All", ...new Set(concerts.map((c) => c.genre))];

  const filteredConcerts = concerts.filter((concert) => {
    const matchesSearch =
      concert.title.toLowerCase().includes(searchText.toLowerCase()) ||
      concert.title_en.toLowerCase().includes(searchText.toLowerCase()) ||
      concert.venue.toLowerCase().includes(searchText.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" || concert.genre === selectedGenre;

    const matchesFavorite = !showFavoritesOnly || isFavorite(concert.id);

    return matchesSearch && matchesGenre && matchesFavorite;
  });

  // Whenever a filter changes, snap back to page 1 —
  // otherwise you could be stuck on a page that no longer has results.
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, selectedGenre, showFavoritesOnly]);

  const totalPages = Math.ceil(filteredConcerts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedConcerts = filteredConcerts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          placeholder="Search by title or venue..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full rounded-lg bg-neutral-100 px-4 py-2 text-neutral-900 placeholder-neutral-500 outline-none ring-1 ring-neutral-300 focus:ring-neutral-500 dark:bg-neutral-900 dark:text-white dark:placeholder-neutral-500 dark:ring-neutral-800 dark:focus:ring-neutral-600 sm:max-w-xs"
        />

        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="rounded-lg bg-neutral-100 px-4 py-2 text-neutral-900 outline-none ring-1 ring-neutral-300 focus:ring-neutral-500 dark:bg-neutral-900 dark:text-white dark:ring-neutral-800 dark:focus:ring-neutral-600"
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
          <input
            type="checkbox"
            checked={showFavoritesOnly}
            onChange={(e) => setShowFavoritesOnly(e.target.checked)}
          />
          Favorites only
        </label>
      </div>

      {filteredConcerts.length === 0 ? (
        <p className="text-neutral-500">No concerts match your search.</p>
      ) : (
        <>
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedConcerts.map((concert) => (
              <EventCard key={concert.id} concert={concert} />
            ))}
          </section>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-lg px-3 py-1.5 text-sm text-neutral-700 ring-1 ring-neutral-300 disabled:opacity-40 dark:text-neutral-300 dark:ring-neutral-700"
            >
              Previous
            </button>

            <span className="text-sm text-neutral-500">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
              className="rounded-lg px-3 py-1.5 text-sm text-neutral-700 ring-1 ring-neutral-300 disabled:opacity-40 dark:text-neutral-300 dark:ring-neutral-700"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}