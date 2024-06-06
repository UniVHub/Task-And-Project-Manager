"use client";
import React, { createContext, useState } from "react";
import { ProjectInterface } from "@/core/types";

interface ProjectContextProps {
  projectToEdit: ProjectInterface | {};
  setProjectToEdit: React.Dispatch<React.SetStateAction<ProjectInterface | {}>>;
}

export const ProjectContext = createContext<ProjectContextProps>({
  projectToEdit: {},
  setProjectToEdit: () => {},
});

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
