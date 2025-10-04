import QuickActions from "../components/QuickActions";

export default function Dashboard() {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-4">Dashboard Overview</h1>
      <p className="text-lg mb-8 text-black/70">
        Access CO₂ analytics, supply chain data, and live sustainability KPIs.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white shadow-soft rounded-2xl p-6 border-l-4 border-brand-green">
          <h2 className="text-xl font-semibold mb-2 text-brand-green">Carbon Footprint</h2>
          <p className="text-black/70">Monitor CO₂ emissions across product lifecycles.</p>
        </div>
        <div className="bg-white shadow-soft rounded-2xl p-6 border-l-4 border-brand-orange">
          <h2 className="text-xl font-semibold mb-2 text-brand-orange">Production Insights</h2>
          <p className="text-black/70">Track fabric, yarn, and finishing stages in real time.</p>
        </div>
        <div className="bg-white shadow-soft rounded-2xl p-6 border-l-4 border-brand-red">
          <h2 className="text-xl font-semibold mb-2 text-brand-red">Alerts & Thresholds</h2>
          <p className="text-black/70">Get notified when emission limits are exceeded.</p>
        </div>
      </div>

      <QuickActions />
    </>
  );
}