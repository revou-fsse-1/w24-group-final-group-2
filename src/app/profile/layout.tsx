"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between">
      <Header />
      <div className="w-full max-w-7xl flex grow">{children}</div>

      <MobileNav />
      <Footer />
    </div>
  );
}
