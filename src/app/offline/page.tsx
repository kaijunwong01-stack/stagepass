export default function OfflinePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center bg-white px-4 text-center dark:bg-black sm:px-8">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
        You&apos;re offline
      </h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        Check your internet connection and try again.
      </p>
    </main>
  );
}