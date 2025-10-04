import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-navy">
      <Navbar />
      {/* fixed navbar yüksekliği ≈ 56px → güvenli boşluk */}
      <main className="pt-20 px-6 md:px-8 max-w-6xl mx-auto">{children}</main>
      <Footer />
    </div>
  );
}