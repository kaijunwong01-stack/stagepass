"use client";

type TicketButtonProps = {
  url: string;
  className?: string;
};

export default function TicketButton({ url, className = "" }: TicketButtonProps) {
  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      onClick={handleClick}
      className={`rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 ${className}`}
    >
      Buy Tickets
    </button>
  );
}