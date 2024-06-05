import { FormNewProject } from "./FormNewProject";
import { ProjectFormInterface, ProjectInterface } from "@/core/types";

/**
 * Props for the ModalNewProject component.
 */
interface ModalNewProjectProps {
  projectToEdit: ProjectInterface | {};
  handleCloseModal: () => void;
  saveProject: (project: ProjectFormInterface) => void;
}

export const ModalNewProject: React.FC<ModalNewProjectProps> = ({
  projectToEdit,
  handleCloseModal,
  saveProject,
}) => {
  const handleClose = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleCloseModal();
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
              projectToEdit={projectToEdit}
              saveProject={saveProject}
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
