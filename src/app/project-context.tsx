"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ProjectContextType {
  projectId: string | null;
  projectName: string | null; // Add projectName
  setProjectId: (id: string) => void;
  setProjectName: (name: string) => void; // Add setProjectName
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projectName, setProjectName] = useState<string | null>(null); // Initialize projectName state

  return (
    <ProjectContext.Provider value={{ projectId, projectName, setProjectId, setProjectName }}>
      {children}
    </ProjectContext.Provider>
  );
};
