"use client"
import { useContext, useState } from "react";
import { FormNewProject } from "./FormNewProject";
import { ProjectFormInterface, ProjectInterface } from "@/core/types";
import { ProjectContext } from "@/core/context/projectToEditContext";

/**
 * Props for the ModalNewProject component.
 */
interface ModalNewProjectProps {
  handleCloseModal: () => void;
  saveProject: (project: ProjectFormInterface) => void;
}

export const ModalNewProject: React.FC<ModalNewProjectProps> = ({
  handleCloseModal,
  saveProject,
}) => {
  const [isClosed, setIsClosed] = useState(false);

  const { projectToEdit } = useContext(ProjectContext);


  const handleClose = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleCloseModal();
    setIsClosed(true);
  };

  return (
    <div>
      <dialog id="my_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold capitalize">
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
};
