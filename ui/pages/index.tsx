export default function Home() {
  return (
    <section className="text-center py-16">
      <h1 className="text-4xl font-semibold mb-4">Welcome to Zero@Design</h1>
      <p className="text-lg max-w-2xl mx-auto">
        A sustainable innovation platform that connects AI, design, and circular production ecosystems.
      </p>
      <a
        href="/dashboard"
        className="inline-block mt-8 bg-brand-orange text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition"
      >
        Go to Dashboard →
      </a>
    </section>
  );
}