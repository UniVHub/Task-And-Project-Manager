import { ProjectInterface } from "@/core/types";
import { formatDate, truncateString } from "@/core/utils";

/**
 * Represents the props for the Project component.
 */
interface ProjectProps {
  project: ProjectInterface;
  setProjectToEdit: (project: ProjectInterface) => void;
  handleOpenModal: () => void;
}

export const Project: React.FC<ProjectProps> = ({
  project,
  setProjectToEdit,
  handleOpenModal,
}) => {

  const handleDetails = () => {
    console.log("Details");
  };

  const handleEdit = () => {
    setProjectToEdit(project);
    handleOpenModal();
  };

  const handleDelete = () => {
    console.log("Delete");
  };

  return (
    <tr>
      <td>{truncateString(project.name, 38)}</td>
      <td>{truncateString(project.description, 20)}</td>
      <td>{formatDate(project.creationDate)}</td>
      <td>
        {project.terminationDate
          ? formatDate(project.terminationDate)
          : "The project is still active"}
      </td>
      <td>
        <details className="dropdown">
          <summary className="btn btn-xs m-1">Actions</summary>
          <ul className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
            <li>
              <a onClick={handleDetails}>Details</a>
            </li>
            <li>
              <a onClick={handleEdit}>Edit</a>
            </li>
            <li>
              <a onClick={handleDelete}>Delete</a>
            </li>
          </ul>
        </details>
      </td>
    </tr>
  );
};
