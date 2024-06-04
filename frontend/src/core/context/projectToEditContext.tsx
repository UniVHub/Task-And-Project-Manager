import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ProjectInterface } from '../types';

interface ProjectContextType {
  projectToEdit: ProjectInterface | null;
  setProjectToEdit: React.Dispatch<React.SetStateAction<ProjectInterface | null>>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projectToEdit, setProjectToEdit] = useState<ProjectInterface | null>(null);

  return (
    <ProjectContext.Provider value={{ projectToEdit, setProjectToEdit }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};
