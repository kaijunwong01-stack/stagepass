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
        className="mt-3 inline-block rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
      >
        Open in Google Maps
      </a>
    </div>
  );
}