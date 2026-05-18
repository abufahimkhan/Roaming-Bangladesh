import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-sky-50 via-white to-cyan-50 text-slate-900">
      <div className="max-w-xl w-full text-center rounded-3xl border border-sky-100 bg-white/90 shadow-xl p-10">
        <p className="text-xs font-black tracking-[0.25em] uppercase text-sky-600 mb-3">404 Not Found</p>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">This page could not be found.</h1>
        <p className="text-slate-600 font-medium mb-8">
          The link may be outdated or the page may have been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-black uppercase tracking-wider shadow-lg shadow-cyan-600/30 hover:from-blue-500 hover:to-cyan-500 transition-all"
        >
          Go to Home
        </Link>
      </div>
    </main>
  );
}
