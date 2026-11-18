import React from "react";
import { Instrument_Sans, Newsreader } from "next/font/google";
import "./styles.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
});

export const metadata = {
  description: "The film ends. The conversation begins.",
  title: "Rulletekst",
  icons: {
    icon: { url: "/favicon.png", type: "image/png", sizes: "32x32" },
  },
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en" className={`${newsreader.variable} ${instrumentSans.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};
