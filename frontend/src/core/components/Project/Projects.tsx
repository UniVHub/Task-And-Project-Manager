import Project from "./Project";
import { ProjectInterface } from "@/core/types";
import { getFilteredProjects } from "@/core/api";

export default async function Projects({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const projects = await getFilteredProjects(query, currentPage);

  if (Object.keys(projects).length === 0) {
    console.log(`\n projects: ${projects}`);
    return null;
  }

  return (
    <div className="mt-8 overflow-x-auto overflow-y-hidden">
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
