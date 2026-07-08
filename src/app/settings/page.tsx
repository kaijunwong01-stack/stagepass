import ThemeToggle from "@/components/ThemeToggle";

export default function SettingsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-2xl bg-white px-4 py-10 dark:bg-black sm:px-8">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
        Settings
      </h1>

      <div className="mt-8 flex items-center justify-between border-t border-neutral-200 py-4 dark:border-neutral-800">
        <span className="text-neutral-700 dark:text-neutral-300">
          Appearance
        </span>
        <ThemeToggle />
      </div>
    </main>
  );
}