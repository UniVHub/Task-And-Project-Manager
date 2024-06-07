"use client";
import { ProjectInterface } from "@/core/types";
import { formatDate, truncateString } from "@/core/utils";
import clsx from "clsx";
import Link from "next/link";
import { toast } from "sonner";
import { deleteProject, updateProject } from "@/core/api";
import { useContext } from "react";
import { ProjectContext } from "@/core/context/projectToEditContext";
import BadgeStatus from "../General/BadgeStatus";

/**
 * Represents the props for the Project component.
 */
interface ProjectProps {
  project: ProjectInterface;
  index: number;
  numberOfProjects: number;
}

export default function Project({
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

  const finishProject = () => {
    const updatedProject = {
      ...project,
      terminationDate: new Date().toISOString(),
    };
    updateProject(updatedProject).then(() => {
      toast.success("Project finished successfully");
    });
    (document.activeElement as HTMLElement)?.blur();
  };

  return (
    <tr>
      <td className="max-w-44">{truncateString(project.name, 60)}</td>
      <td>
        {
          <BadgeStatus
            type={project.terminationDate ? "finished" : "progress"}
          />
        }
      </td>
      <td>
        <div
          className={clsx("dropdown", {
            "dropdown-left dropdown-bottom": index === 0,
            "dropdown-left dropdown-top": index === numberOfProjects - 1,
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
              <Link href={`/project/${project.id}`}>
                <p>Details</p>
              </Link>
            </li>
            <li>
              <button onClick={handleEdit}>Edit</button>
            </li>
            <li>
              <button onClick={handleDelete}>Delete</button>
            </li>
            {project.terminationDate ? null : (
              <li>
                <button className="text-error" onClick={finishProject}>
                  Finish Project
                </button>
              </li>
            )}
          </ul>
        </div>
      </td>
    </tr>
  );
}
