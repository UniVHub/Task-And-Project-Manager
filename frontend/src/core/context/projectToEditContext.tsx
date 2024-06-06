"use client";
import React, { createContext, useState } from "react";
import { ProjectInterface } from "@/core/types";

/**
 * Represents the props for the ProjectContext component.
 */
interface ProjectContextProps {
  projectToEdit: ProjectInterface | {};
  setProjectToEdit: React.Dispatch<React.SetStateAction<ProjectInterface | {}>>;
}

/**
 * Context for managing the project to edit.
 */
export const ProjectContext = createContext<ProjectContextProps>({
  projectToEdit: {},
  setProjectToEdit: () => {},
});

/**
 * Provides a context for managing the project to edit.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {JSX.Element} The rendered component.
 */
export const ProjectProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [projectToEdit, setProjectToEdit] = useState<ProjectInterface | {}>({});

  return (
    <ProjectContext.Provider value={{ projectToEdit, setProjectToEdit }}>
      {children}
    </ProjectContext.Provider>
  );
};
