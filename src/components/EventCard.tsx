import Link from "next/link";
import { Concert } from "@/data/concerts";
import FavoriteButton from "@/components/FavoriteButton";

type EventCardProps = {
  concert: Concert;
};

export default function EventCard({ concert }: EventCardProps) {
  const formattedDate = new Date(concert.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/events/${concert.id}`}
      className="relative block rounded-2xl bg-neutral-900 p-5 shadow-md transition-shadow hover:shadow-lg"
    >
      <FavoriteButton
        concertId={concert.id}
        className="absolute right-4 top-4"
      />

      <div className="mb-2 flex items-center justify-between pr-8">
        <span className="text-xs uppercase tracking-wide text-neutral-400">
          {concert.genre}
        </span>
        <span className="text-xs text-neutral-400">{concert.price}</span>
      </div>
      <h3 className="mb-1 text-lg font-semibold text-white">{concert.title}</h3>
      <p className="text-sm text-neutral-300">
        {concert.venue}, {concert.city}
      </p>
      <p className="mt-1 text-sm text-neutral-500">{formattedDate}</p>
    </Link>
  );
}