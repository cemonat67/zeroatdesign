import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const { asPath, pathname } = useRouter();
  const path = asPath || pathname || "/";
  const active = (p: string) => path === p || path === p + "/";

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-brand-navy text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-wide">
          Zero<span className="text-brand-orange">@</span>Design
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link
            href="/"
            className={active("/") ? "text-brand-orange border-b-2 border-brand-orange" : "hover:text-brand-orange"}
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className={active("/dashboard") ? "text-brand-orange border-b-2 border-brand-orange" : "hover:text-brand-orange"}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
