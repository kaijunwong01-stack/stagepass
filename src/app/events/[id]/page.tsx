import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import FavoriteButton from "@/components/FavoriteButton";
import VenueMap from "@/components/VenueMap";
import ImageLightbox from "@/components/ImageLightbox";
import TicketButton from "@/components/TicketButton";

type EventPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;

  const { data: concert, error } = await supabase
    .from("concerts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !concert) {
    notFound();
  }

  const formattedDate = new Date(concert.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="mx-auto min-h-screen max-w-2xl bg-white px-4 py-10 dark:bg-black sm:px-8">
      {concert.image_url && (
        <div className="mb-6">
          <ImageLightbox src={concert.image_url} alt={concert.title_en} />
        </div>
      )}

      <div className="flex items-start justify-between">
        <span className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          {concert.genre}
        </span>
        <FavoriteButton concertId={concert.id} />
      </div>

      <h1 className="mt-2 text-3xl font-bold text-neutral-900 dark:text-white">
        {concert.title_en}
      </h1>
      <p className="mt-1 text-sm text-neutral-500">{concert.title}</p>

      <div className="mt-6 space-y-2 text-neutral-700 dark:text-neutral-300">
        <p>
          <span className="text-neutral-500">Venue: </span>
          {concert.venue}, {concert.city}
        </p>
        <p>
          <span className="text-neutral-500">Date: </span>
          {formattedDate}
        </p>
        <p>
          <span className="text-neutral-500">Price: </span>
          {concert.price}
        </p>
      </div>

      {concert.ticket_url && (
        <TicketButton url={concert.ticket_url} className="mt-4" />
      )}

      {concert.artists && concert.artists.length > 0 && (
        <div className="mt-6 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-900">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Lineup
          </h2>
          <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
            {concert.artists.map((artist: string) => (
              <li key={artist}>{artist}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <VenueMap venue={concert.venue} city={concert.city} />
      </div>
    </main>
  );
}