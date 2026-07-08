import EventList from "@/components/EventList";
import { supabase } from "@/lib/supabase";

export default async function HomePage() {
  const { data: concerts, error } = await supabase
    .from("concerts")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    return (
      <main className="min-h-screen bg-black px-4 py-8 text-white sm:px-8">
        Something went wrong loading concerts. Please try again later.
      </main>
    );
  }

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