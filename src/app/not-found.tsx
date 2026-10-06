import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="fixed inset-0 flex flex-col justify-between px-5 py-5 s:px-10 s:py-8">
      <Link href="/" className="text-[15px] font-medium">
        Emircan Can <span className="opacity-50">— software engineer</span>
      </Link>
      <div>
        <p className="text-[clamp(96px,26vw,360px)] leading-[0.8] tracking-tightest">404</p>
        <div className="mt-6 flex items-end justify-between gap-6">
          <p className="max-w-[28ch] opacity-60">
            This page drifted out of orbit. / Bu sayfa yörüngeden çıkmış.
          </p>
          <Link href="/" className="rounded-full bg-white px-4 py-2 text-black transition-opacity hover:opacity-80">
            ← Home
          </Link>
        </div>
      </div>
    </main>
  );
}
