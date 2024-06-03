import { ProjectInterface } from "../types";
import { truncateString } from "../utils";

export const Project = ({ project, index }: { project: ProjectInterface, index:number }) => {

  const handleDetails = () => {
    console.log("Details");
  }

  const handleEdit = () => {
    console.log("Edit");
  }

  const handleDelete = () => {
    console.log("Delete");
  }

  return (
    <tr key={project.id}>
      <th>{index + 1}</th>
      <td>{project.Name}</td>
      <td>{truncateString(project.Description, 20)}</td>
      <td>{project.CreationDate}</td>
      <td>{project.TerminationDate}</td>
      <td>
        <details className="dropdown">
          <summary className="btn m-1 btn-xs">Actions</summary>
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
