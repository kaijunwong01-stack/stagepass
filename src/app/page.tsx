import EventList from "@/components/EventList";
import { concerts } from "@/data/concerts";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black px-4 py-8 sm:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">StagePass</h1>
        <p className="mt-1 text-neutral-400">
          Discover underground concerts across Japan
        </p>
      </header>

      <EventList concerts={concerts} />
    </main>
  );
}