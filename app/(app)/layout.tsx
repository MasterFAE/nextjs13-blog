import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ToastProvider from "@/shared/providers/ToastProvider";

import preloaderActions from "@/redux/preloader/actions";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "To-Do App",
  description: "You can create your own to-do list and manage it easily.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await preloaderActions.getUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
