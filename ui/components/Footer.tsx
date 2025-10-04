export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/5">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-6 text-sm text-black/60 flex items-center justify-between">
        <span>© 2025 Onat Ltd · Zero@Design</span>
        <nav className="flex gap-4">
          <a href="/sustainability" className="hover:underline">Sustainability</a>
          <a href="/privacy" className="hover:underline">Privacy</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </nav>
      </div>
    </footer>
  );
}