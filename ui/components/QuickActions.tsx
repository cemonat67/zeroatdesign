export default function QuickActions() {
  const actions = [
    { title: "Open CO₂ Dashboard", href: "/dashboard" },
    { title: "Export CSV", href: "/downloads/data.csv" },
    { title: "Settings", href: "/settings" },
  ];
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {actions.map(a => (
          <a
            key={a.title}
            href={a.href}
            className="rounded-full px-5 py-3 text-white font-medium text-center bg-brand-orange hover:opacity-90 transition shadow-soft"
          >
            {a.title}
          </a>
        ))}
      </div>
    </section>
  );
}