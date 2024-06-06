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
    <div className="overflow-x-auto overflow-y-hidden">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Creation Date</th>
            <th>Termination Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project: ProjectInterface) => (
            <Project key={project.id} project={project} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
