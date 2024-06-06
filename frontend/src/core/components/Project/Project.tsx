"use client";
import { ProjectInterface } from "@/core/types";
import { formatDate, truncateString } from "@/core/utils";
import clsx from "clsx";
import Link from "next/link";
import { toast } from "sonner";
import { deleteProject } from "@/core/api";
import { useContext } from "react";
import { ProjectContext } from "@/core/context/projectToEditContext";
import { number } from "zod";

/**
 * Represents the props for the Project component.
 */
interface ProjectProps {
  project: ProjectInterface;
  index: number;
  numberOfProjects: number;
}

export default function Projecst({
  project,
  index,
  numberOfProjects,
}: ProjectProps) {
  const { setProjectToEdit } = useContext(ProjectContext);

  const handleOpenModal = () => {
    const modal = document.getElementById("my_modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const handleEdit = () => {
    setProjectToEdit(project);
    handleOpenModal();
  };

  const handleDelete = () => {
    deleteProject(String(project.id)).then(() => {
      toast.success("Project deleted successfully");
    });
    (document.activeElement as HTMLElement)?.blur();
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
        <div
          className={clsx("dropdown", {
            "dropdown-bottom dropdown-left": index === 0,
            "dropdown-top dropdown-left": index === numberOfProjects - 1,
            "dropdown-end dropdown-left":
              index !== 0 && index !== numberOfProjects - 1,
          })}
        >
          <div tabIndex={0} role="button" className="btn btn-xs m-1">
            Actions
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <Link
                // href={`/projects/${project.id}`}
                href={`/project/${project.id}`}
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
}
