import './globals.css';

export const metadata = {
  title: 'Zero@Design — UI',
  description: 'Production build served from app.onatltd.com',
  metadataBase: new URL('https://app.onatltd.com'),
  openGraph: { title: 'Zero@Design — UI', url: '/', siteName: 'Zero@Design' },
  twitter: { card: 'summary_large_image', title: 'Zero@Design — UI' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
