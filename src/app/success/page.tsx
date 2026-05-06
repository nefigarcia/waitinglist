import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center py-20">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl mb-6">
          ✓
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">You're on the list.</h1>
        <p className="mt-4 text-gray-500 leading-relaxed">
          Thanks for sharing your situation. We read every response personally
          and will reach out before we launch.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          If you'd like, share this page with another business owner who might benefit.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            ← Back to analysis
          </Link>
          <Link
            href="/waitlist"
            className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
          >
            See the other options
          </Link>
        </div>
      </div>
    </main>
  );
}
