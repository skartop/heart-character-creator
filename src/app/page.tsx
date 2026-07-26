import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-heart-ink px-6 py-12 text-heart-bone">
      <section className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-heart-brass">Heart Character Creator</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Build a character one dangerous choice at a time.</h1>
          <p className="max-w-2xl text-lg text-heart-bone/80">
            A guided builder for turning a character concept into choices, unanswered questions, and a table-ready summary.
          </p>
        </div>

        <div className="rounded-2xl border border-heart-brass/30 bg-black/20 p-6 shadow-2xl">
          <h2 className="text-xl font-semibold">MVP Flow</h2>
          <ol className="mt-4 grid gap-3 text-heart-bone/80 md:grid-cols-2">
            <li>1. Choose ancestry</li>
            <li>2. Choose calling</li>
            <li>3. Choose class</li>
            <li>4. Capture character questions</li>
            <li>5. Track unresolved items</li>
            <li>6. Export a Markdown summary</li>
          </ol>
        </div>

        <Link
          href="/character-builder"
          className="inline-flex rounded-lg bg-heart-ember px-5 py-3 font-semibold text-white transition hover:brightness-110"
        >
          Start builder
        </Link>
      </section>
    </main>
  );
}
