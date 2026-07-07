export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-black/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
        <span className="text-lg font-bold text-white">StagePass</span>

        <div className="flex gap-6 text-sm text-neutral-300">
          <span className="cursor-pointer hover:text-white">Explore</span>
          <span className="cursor-pointer hover:text-white">Venues</span>
          <span className="cursor-pointer hover:text-white">About</span>
        </div>
      </nav>
    </header>
  );
}