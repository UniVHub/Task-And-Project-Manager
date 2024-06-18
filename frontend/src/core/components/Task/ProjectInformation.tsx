import React from "react";
import { ProjectInterface } from "@/core/types";
import { formatDate } from "@/core/utils";
import { FinishProjectButton } from "../Project/FinishProjectButton";
import BadgeDate from "../General/BadgeDate";

interface ProjectInformationProps {
  project: ProjectInterface;
}

export default function ProjectInformation({
  project,
}: ProjectInformationProps) {
  return (
    <>
      <h2 className="text-center text-2xl">
        Project Name: <span className="text-accent">{project.name}</span>
      </h2>
      <p className="mt-4 text-center">{project.description}</p>
      <div className="mt-4 flex items-center justify-center gap-2">
        <BadgeDate type="creation" date={project.creation_date} />
        <div>
          {project.termination_date ? (
            <BadgeDate type="termination" date={project.termination_date} />
          ) : (
            <FinishProjectButton project={project} />
          )}
        </div>
      </div>
    </>
  );
}
