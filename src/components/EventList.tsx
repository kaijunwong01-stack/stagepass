"use client";

import { useState } from "react";
import EventCard from "@/components/EventCard";
import { Concert } from "@/data/concerts";

type EventListProps = {
  concerts: Concert[];
};

export default function EventList({ concerts }: EventListProps) {
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Build the genre dropdown options from the actual data,
  // so we never have to manually update this list when new genres appear.
  const genres = ["All", ...new Set(concerts.map((c) => c.genre))];

  const filteredConcerts = concerts.filter((concert) => {
    const matchesSearch =
      concert.title.toLowerCase().includes(searchText.toLowerCase()) ||
      concert.venue.toLowerCase().includes(searchText.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" || concert.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Search by title or venue..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full rounded-lg bg-neutral-900 px-4 py-2 text-white placeholder-neutral-500 outline-none ring-1 ring-neutral-800 focus:ring-neutral-600 sm:max-w-xs"
        />

        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="rounded-lg bg-neutral-900 px-4 py-2 text-white outline-none ring-1 ring-neutral-800 focus:ring-neutral-600"
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {filteredConcerts.length === 0 ? (
        <p className="text-neutral-500">No concerts match your search.</p>
      ) : (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredConcerts.map((concert) => (
            <EventCard key={concert.id} concert={concert} />
          ))}
        </section>
      )}
    </div>
  );
}