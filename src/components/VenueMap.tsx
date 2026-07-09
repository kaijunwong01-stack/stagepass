type VenueMapProps = {
  venue: string;
  city: string;
};

export default function VenueMap({ venue, city }: VenueMapProps) {
  const query = encodeURIComponent(`${venue}, ${city}, Japan`);
  const embedUrl = `https://www.google.com/maps?q=${query}&z=15&output=embed`;
  const externalUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
        <iframe
          src={embedUrl}
          className="h-48 w-full"
          loading="lazy"
          title={`Map of ${venue}`}
        />
      </div>

      <a
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-sm text-neutral-500 underline hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
      >
        Open in Google Maps
      </a>
    </div>
  );
}