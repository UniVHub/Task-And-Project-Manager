import React from "react";
import { ProjectInterface } from "@/core/types";
import { formatDate } from "@/core/utils";
import { FinishButton } from "../Project/FinishButton";

interface ProjectInformationProps {
  project: ProjectInterface;
}

export default function ProjectInformation({
  project,
}: ProjectInformationProps) {
  return (
    <>
      <h2 className="text-center text-2xl">
        Project: <span className="text-accent">{project.name}</span>
      </h2>
      <div className="mt-4 flex items-center justify-around">
        <p>
          <span className="font-bold">Creation Date: </span>
          {formatDate(project.creationDate)}
        </p>
        <p>
          {project.terminationDate ? (
            <p>
              <span className="font-bold">Termination Date: </span>
              {formatDate(project.terminationDate)}
            </p>
          ) : (
            <FinishButton />
          )}
        </p>
      </div>
    </>
  );
}
