import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#02154e" />
        <meta name="description" content="Zero@Design — Sustainable AI & design platform." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-brand-bg text-brand-navy">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}