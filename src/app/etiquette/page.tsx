export default function EtiquettePage() {
  return (
    <main className="mx-auto min-h-screen max-w-2xl bg-white px-4 py-10 dark:bg-black sm:px-8">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
        Concert Etiquette
      </h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        A few friendly pointers before your first live house show in Japan
        nothing to stress about, just good to know!
      </p>

      <div className="mt-8 space-y-8">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-white">
            Ticket order system (seiri bango)
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300">
            Most standing tickets come with a queue number. Get there a
            little early, line up, and you'll be let in order — the lower
            your number, the sooner you're in!
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-white">
            The "one drink" system
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300">
            Most live houses ask for a small drink fee (around ¥500-700) on
            top of your ticket. You'll get a token or ticket to swap for a
            drink at the bar — think of it as a little welcome perk.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-white">
            Standing area norms
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300">
            There's no assigned spot, so just give a quick "can I stand here?"
            before squeezing in. Ducking out for a bit? A quick "I'll be
            right back!" to your neighbors usually means they'll happily hold
            your spot.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-white">
            Photography
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300">
            Best to keep the phone/camera away once the music starts, unless
            you spot a sign or hear an announcement saying otherwise.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-white">
            Crowd behavior
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300">
            You'll notice the crowd go wonderfully quiet during softer
            moments, then erupt into cheers between songs — a bit different
            from constant singing along, but just as much fun once you get
            into the rhythm of it.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-white">
            Cash
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300">
            Venues and drink counters are often cash-only, so come prepared
            with enough on hand — better safe than thirsty!
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-white">
            Bag size
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300">
            Big backpacks can be a squeeze in standing areas, so consider
            traveling light. Coin lockers and baggage storage are often
            available nearby for a small fee if you need to stash something
            bigger.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-white">
            Trains
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300">
            Worth a quick check of the last train time for your route,
            especially for smaller venues a bit further out — you don't want
            a great night to end with a very expensive taxi ride!
          </p>
        </section>
      </div>
    </main>
  );
}