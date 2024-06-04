import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../core/components/Header/Header";
import { Toaster} from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Manager",
  description: "Application to manage projects and tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dracula">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col px-5 py-10">
          <Toaster/>
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
