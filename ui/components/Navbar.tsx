import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const { asPath, pathname } = useRouter();
  const path = asPath || pathname || "/";
  const active = (p: string) => path === p || path === p + "/";
  const linkCls = (p: string) =>
    active(p) ? "text-brand-orange border-b-2 border-brand-orange" : "hover:text-brand-orange";

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-brand-navy text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-wide">
          Zero<span className="text-brand-orange">@</span>Design
        </Link>
        <div className="flex gap-4 text-sm font-medium">
          <Link href="/" className={linkCls("/")}>Home</Link>
          <Link href="/dashboard" className={linkCls("/dashboard")}>Dashboard</Link>
          <Link href="/settings" className={linkCls("/settings")}>Settings</Link>
          <Link href="/sustainability" className={linkCls("/sustainability")}>Sustainability</Link>
          <Link href="/privacy" className={linkCls("/privacy")}>Privacy</Link>
          <Link href="/contact" className={linkCls("/contact")}>Contact</Link>
        </div>
      </div>
    </nav>
  );
}
