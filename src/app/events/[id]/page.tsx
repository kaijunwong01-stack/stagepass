import { concerts } from "@/data/concerts";
import { notFound } from "next/navigation";

type EventPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const concert = concerts.find((c) => c.id === id);

  // If someone visits /events/999 and no concert has that id, show a 404 page.
  if (!concert) {
    notFound();
  }

  const formattedDate = new Date(concert.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-4 py-10 sm:px-8">
      <span className="text-xs uppercase tracking-wide text-neutral-400">
        {concert.genre}
      </span>
      <h1 className="mt-2 text-3xl font-bold text-white">{concert.title}</h1>

      <div className="mt-6 space-y-2 text-neutral-300">
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
    </main>
  );
}