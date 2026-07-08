import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-black/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
        <Link href="/" className="text-lg font-bold text-white">
          StagePass
        </Link>

        <div className="flex gap-6 text-sm text-neutral-300">
          <Link href="/" className="hover:text-white">
            Explore
          </Link>
          <Link href="/venues" className="hover:text-white">
            Venues
          </Link>
          <Link href="/about" className="hover:text-white">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}