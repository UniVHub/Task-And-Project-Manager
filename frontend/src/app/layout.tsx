import "./globals.css";
import Header from "../core/components/Header/Header";
import { Metadata } from "next";
import { Toaster } from "sonner";
import { openSans } from "@/core/fonts";
import { ProjectProvider } from "@/core/context/projectToEditContext";
import { TaskProvider } from "@/core/context/taskToEditContext";
import GoButton from "@/core/components/General/GoButton";

export const metadata: Metadata = {
  title: "Projects Manager",
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
      <body
        className={`${openSans.className} min-h-screen overflow-y-auto bg-base-100 px-5 py-10 text-base-content antialiased`}
      >
        <Toaster position="bottom-left" />
        <Header />
        <ProjectProvider>
          <TaskProvider>{children}</TaskProvider>
        </ProjectProvider>
        <GoButton />
      </body>
    </html>
  );
}
