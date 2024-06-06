import { ProjectInterface } from "@/core/types";
import { Project } from "./Project";
import { useContext } from "react";
import { ProjectContext } from "@/core/context/projectToEditContext";

/**
 * Props for the Projects component.
 */
interface ProjectsProps {
  projects: ProjectInterface[];
  handleOpenModal: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  projects,
  handleOpenModal,
}) => {
  const { setProjectToEdit } = useContext(ProjectContext);

  return (
    <div className="mt-6 overflow-x-auto overflow-y-hidden">
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
          {projects.map((project, index) => (
            <Project
              key={project.id}
              project={project}
              setProjectToEdit={setProjectToEdit}
              handleOpenModal={handleOpenModal}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
