"use client";
import FormNewProject from "./FormNewProject";
import { useContext, useEffect, useState } from "react";
import { ProjectFormInterface, ProjectInterface } from "@/core/types";
import { ProjectContext } from "@/core/context/projectToEditContext";
import { createProject, updateProject } from "@/core/api";
import { toast } from "sonner";
import BadgeDate from "../General/BadgeDate";
import BadgeDateSmall from "../General/BadgeDateSmall";
import { getTasksByProjectId } from "@/core/api";

export default function ModalNewProject() {
  const { projectToEdit, setProjectToEdit } = useContext(ProjectContext);

  const [isClosed, setIsClosed] = useState<boolean>(false);

  const [numTasks, setNumTasks] = useState<number>(0);

  const handleCloseModal = () => {
    setProjectToEdit({});
    const modal = document.getElementById("my_modal") as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  const handleClose = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleCloseModal();
    setIsClosed(true);
  };

  const saveProject = (project: ProjectFormInterface) => {
    if (project.id) {
      updateProject(project).then(() => {
        toast.success("Project updated successfully");
      });
    } else {
      const newProject = {
        ...project,
        creationDate: new Date().toISOString(),
        terminationDate: null,
      };
      createProject(newProject).then(() => {
        toast.success("Project created successfully");
      });
    }
    handleCloseModal();
  };

  useEffect(() => {
    const setNumberTasks = async () => {
      if (Object.keys(projectToEdit).length > 0) {
        const listTasks = await getTasksByProjectId(
          (projectToEdit as ProjectInterface).id,
        );
        setNumTasks(listTasks.length);
      }
    };
    setNumberTasks();
  }, [projectToEdit]);

  return (
    <div>
      <dialog id="my_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <span className="badge indicator-item badge-primary indicator-start indicator-top">
            Tasks: {numTasks}
          </span>
          <h3 className="text-center text-lg font-bold capitalize">
            {Object.keys(projectToEdit).length > 0
              ? "Edit Project"
              : "Create new project"}
          </h3>
          {Object.keys(projectToEdit).length > 0 && (
            <div className="mt-2 flex justify-around">
              {"creationDate" in projectToEdit && (
                <BadgeDateSmall
                  type="creation"
                  date={projectToEdit.creationDate}
                />
              )}
              {"terminationDate" in projectToEdit &&
                projectToEdit.terminationDate && (
                  <BadgeDateSmall
                    type="termination"
                    date={projectToEdit.terminationDate}
                  />
                )}
            </div>
          )}
          <div className="py-4">
            <FormNewProject
              saveProject={saveProject}
              isClosed={isClosed}
              setIsClosed={setIsClosed}
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleClose}
              className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            >
              ✕
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
