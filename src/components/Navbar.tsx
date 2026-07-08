import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-black/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
        <Link href="/" className="text-lg font-bold text-neutral-900 dark:text-white">
          StagePass
        </Link>

        <div className="flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-300">
          <Link href="/" className="hover:text-neutral-900 dark:hover:text-white">
            Explore
          </Link>
          <Link href="/venues" className="hover:text-neutral-900 dark:hover:text-white">
            Venues
          </Link>
          <Link href="/about" className="hover:text-neutral-900 dark:hover:text-white">
            About
          </Link>
          <Link href="/settings" className="hover:text-neutral-900 dark:hover:text-white">
            Settings
          </Link>
        </div>
      </nav>
    </header>
  );
}