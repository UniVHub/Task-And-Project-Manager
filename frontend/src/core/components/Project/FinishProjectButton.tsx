"use client";

import { updateProject } from "@/core/api";
import { ProjectInterface } from "@/core/types";
import { toast } from "sonner";

interface FinishButtonProps {
  project: ProjectInterface;
}

export const FinishProjectButton = ({ project }: FinishButtonProps) => {
  const handlefinish = () => {
    const updatedProject = {
      ...project,
      terminationDate: new Date().toISOString(),
    };
    updateProject(updatedProject).then(() => {
      toast.success("Project finished successfully");
    });
  };
  return (
    <button onClick={handlefinish} className="btn btn-accent btn-xs">
      Finish The Project
    </button>
  );
};
