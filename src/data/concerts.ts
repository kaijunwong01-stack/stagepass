// This defines the "shape" every concert object must have.
// TypeScript will now warn us if we ever forget a field, or use the wrong type.
export type Concert = {
  id: string;
  title: string;
  venue: string;
  city: string;
  date: string; // format: "YYYY-MM-DD"
  genre: string;
  price: string; // e.g. "¥2,500" or "Free"
};

// Sample data — this will later be replaced by real scraped/database data.
export const concerts: Concert[] = [
  {
    id: "1",
    title: "Underground Noise Night",
    venue: "Shelter",
    city: "Tokyo",
    date: "2026-08-15",
    genre: "Hardcore",
    price: "¥2,500",
  },
  {
    id: "2",
    title: "Midnight Jazz Session",
    venue: "Blue Note Basement",
    city: "Osaka",
    date: "2026-08-20",
    genre: "Jazz",
    price: "¥3,000",
  },
  {
    id: "3",
    title: "Riot Fest Live House",
    venue: "Club Quattro",
    city: "Nagoya",
    date: "2026-09-02",
    genre: "Punk",
    price: "¥2,000",
  },
  {
    id: "4",
    title: "Indie Echoes",
    venue: "Fever",
    city: "Tokyo",
    date: "2026-09-10",
    genre: "Indie",
    price: "Free",
  },
];