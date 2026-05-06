import Link from "next/link";
import { OPTIONS } from "@/lib/options";
import type { Option } from "@/lib/options";

function OptionCard({ opt }: { opt: Option }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border-2 ${opt.borderColor} ${opt.bgColor} p-7 transition-shadow hover:shadow-lg`}
    >
      {/* Letter badge */}
      <span
        className="absolute -top-3.5 left-7 inline-flex h-7 w-7 items-center justify-center rounded-full text-white text-xs font-bold shadow"
        style={{ background: opt.color }}
      >
        {opt.letter}
      </span>

      <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
        {opt.problem}
      </p>
      <h2 className="mt-1.5 text-2xl font-bold text-gray-900">{opt.name}</h2>
      <p className="mt-1 text-sm font-medium" style={{ color: opt.color }}>
        {opt.tagline}
      </p>

      <p className="mt-4 text-sm text-gray-600 leading-relaxed">{opt.description}</p>

      <ul className="mt-5 space-y-2">
        {opt.benefits.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="mt-0.5 flex-shrink-0 text-base" style={{ color: opt.color }}>
              ✓
            </span>
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-7">
        <Link
          href={`/waitlist/${opt.key}`}
          className="block w-full rounded-xl py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: opt.color }}
        >
          Join Waitlist for {opt.name} →
        </Link>
      </div>
    </div>
  );
}

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            ← Back to analysis
          </Link>
          <h1 className="mt-5 text-4xl font-bold text-gray-900 tracking-tight">
            We're launching — but we need your input first.
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Based on what the community told us, we identified{" "}
            <strong className="text-gray-700">3 possible products</strong>. The one
            that gets the most serious interest gets built first.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(OPTIONS).map((opt) => (
            <OptionCard key={opt.key} opt={opt} />
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-gray-400">
          Not sure? Pick the one closest to your biggest headache. There are no wrong answers.
        </p>
      </section>
    </main>
  );
}
