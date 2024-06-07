import "./globals.css";
import Header from "../core/components/Header/Header";
import { Metadata } from "next";
import { Toaster } from "sonner";
import { inter } from "@/core/fonts";
import { ProjectProvider } from "@/core/context/projectToEditContext";
import { TaskProvider } from "@/core/context/taskToEditContext";

export const metadata: Metadata = {
  title: "Project Manager",
  description: "Application to manage projects and tasks",
};

/**
 * Root layout component for the application.
 *
 * @param children - The child components to render within the layout.
 * @returns The rendered layout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dracula">
      <body className={`${inter.className} antialiased`}>
        <div className="flex min-h-screen flex-col overflow-y-auto px-5 py-10">
          <Toaster />
          <Header />
          <ProjectProvider>
            <TaskProvider>{children}</TaskProvider>
          </ProjectProvider>
        </div>
      </body>
    </html>
  );
}
