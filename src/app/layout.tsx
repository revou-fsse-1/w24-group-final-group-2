import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Providers from "@/components/nextAuth/Providers";

const poppins = Poppins({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Markilang | The Gateway to a World of Collectibles",
  description: "The gateway to a world of collectibles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
