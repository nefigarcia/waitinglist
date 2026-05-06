import Link from "next/link";
import { ProblemChart } from "@/components/ProblemChart";

const STATS = [
  { value: "186", label: "posts analyzed" },
  { value: "42", label: "problem signals found" },
  { value: "4", label: "main pain categories" },
];

export default function AnalysisPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold text-blue-700 tracking-wide uppercase mb-6">
            AI-Powered Community Analysis
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            We analyzed <span className="text-blue-600">186 posts</span> from
            Utah business owners.
          </h1>
          <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Using AI we scanned a local business networking Facebook group and
            classified every post by the pain it signals. Here's what we found.
          </p>

          {/* Stats row */}
          <div className="mt-10 flex justify-center gap-10 sm:gap-16">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-gray-900">{s.value}</p>
                <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chart */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Top problems — by number of posts mentioning them
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Each bar = posts that explicitly state the problem or offer a service
          solving it. Hover for details.
        </p>

        <ProblemChart />

        {/* Callout */}
        <div className="mt-10 rounded-2xl bg-blue-50 border border-blue-100 px-6 py-5">
          <p className="text-sm font-semibold text-blue-800 mb-1">
            🔍 Most telling signal
          </p>
          <p className="text-sm text-blue-700 leading-relaxed">
            The post with the highest engagement in the entire dataset (24
            likes) was about an AI receptionist that answers missed calls
            24/7. The comment: <em>"Do you ever miss calls when you're busy?"</em> —
            missed calls = missed revenue resonated immediately.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 py-14 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            We're building solutions for the top 3 problems.
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Tell us which one matters most to you — and we'll build it first.
          </p>
          <Link
            href="/waitlist"
            className="inline-block rounded-xl bg-gray-900 px-8 py-3.5 text-white font-semibold text-sm hover:bg-gray-700 transition-colors"
          >
            See the 3 options →
          </Link>
        </div>
      </section>
    </main>
  );
}
