import { notFound } from "next/navigation";
import Link from "next/link";
import { OPTIONS, type OptionKey } from "@/lib/options";
import { WaitlistForm } from "@/components/WaitlistForm";

export async function generateStaticParams() {
  return [{ option: "a" }, { option: "b" }, { option: "c" }];
}

export default async function FormPage({
  params,
}: {
  params: Promise<{ option: string }>;
}) {
  const { option } = await params;
  const opt = OPTIONS[option as OptionKey];
  if (!opt) notFound();

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section
        className="border-b border-gray-100"
        style={{ background: `${opt.color}08` }}
      >
        <div className="max-w-2xl mx-auto px-6 py-10">
          <Link
            href="/waitlist"
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← Back to options
          </Link>

          <div className="mt-5 flex items-center gap-3">
            <span
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white text-sm font-bold shadow"
              style={{ background: opt.color }}
            >
              {opt.letter}
            </span>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                {opt.problem}
              </p>
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                {opt.name}{" "}
                <span className="text-base font-medium text-gray-500">
                  — {opt.tagline}
                </span>
              </h1>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-500 leading-relaxed">
            Your answers help us understand exactly what to build. We'll reach
            out personally before we launch.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-2xl mx-auto px-6 py-12">
        <WaitlistForm option={opt} />
      </section>
    </main>
  );
}
