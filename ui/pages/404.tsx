export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center text-center">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Page not found</h1>
        <p className="text-black/70">The page you are looking for doesn’t exist.</p>
        <a href="/" className="inline-block mt-6 px-5 py-3 bg-brand-orange text-white rounded-full">Go Home</a>
      </div>
    </main>
  );
}
