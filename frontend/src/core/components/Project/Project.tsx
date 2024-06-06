import { ProjectInterface } from "@/core/types";
import { formatDate, truncateString } from "@/core/utils";
import clsx from "clsx";
import Link from "next/link";

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
      <td
        className={clsx({
          "text-secondary": !project.terminationDate,
        })}
      >
        {project.terminationDate
          ? formatDate(project.terminationDate)
          : "The project is still active"}
      </td>
      <td>
        <div className="dropdown dropdown-left">
          <div tabIndex={0} role="button" className="btn btn-xs m-1">
            Actions
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] w-52 rounded-box bg-base-300 p-2 shadow"
          >
            <li>
              <Link
              // href={`/projects/${project.id}`}
              href={`/project/`}
              >
                <p>Details</p>
              </Link>
            </li>
            <li>
              <button onClick={handleEdit}>Edit</button>
            </li>
            <li>
              <button onClick={handleDelete}>Delete</button>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};
