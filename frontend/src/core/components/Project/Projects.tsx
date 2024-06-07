import Project from "./Project";
import { ProjectInterface } from "@/core/types";
import { getPaginatedProjects, getProjects } from "@/core/api";

export default async function Projects({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const projects = await getPaginatedProjects(currentPage);
  return (
    <div className="overflow-x-auto overflow-y-hidden mt-8">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project: ProjectInterface, index: number) => (
            <Project
              key={project.id}
              project={project}
              index={index}
              numberOfProjects={projects.length}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
