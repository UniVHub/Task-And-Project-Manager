import { ProjectInterface } from "@/core/types";
import { truncateString } from "../../utils";
import { Project } from "./Project";
import { useState } from "react";

interface ProjectsProps {
  projects: ProjectInterface[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Description</th>
            <th>Creation Date</th>
            <th>Termination Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <Project project={project} index={index} key={project.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
