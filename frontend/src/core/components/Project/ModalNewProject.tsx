"use client";
import FormNewProject from "./FormNewProject";
import { useContext, useState } from "react";
import { ProjectFormInterface } from "@/core/types";
import { ProjectContext } from "@/core/context/projectToEditContext";
import { createProject, updateProject } from "@/core/api";
import { toast } from "sonner";

export default function ModalNewProject() {
  const { projectToEdit, setProjectToEdit } = useContext(ProjectContext);

  const [isClosed, setIsClosed] = useState(false);

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

  return (
    <div>
      <dialog id="my_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold capitalize text-center">
            {Object.keys(projectToEdit).length > 0
              ? "Edit Project"
              : "Create new project"}
          </h3>
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
