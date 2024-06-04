import { useProjectContext } from "@/core/context/projectToEditContext";
import { FormNewProject } from "./FormNewProject";

export const ModalNewProject = () => {
  const { projectToEdit, setProjectToEdit } = useProjectContext();

  const handleCloseModal = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const modal = document.getElementById("my_modal") as HTMLDialogElement;
    if (modal) {
      modal.close();
      setProjectToEdit(null);
    }
  };

  return (
    <div>
      <dialog id="my_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold capitalize">
            {projectToEdit ? "Edit Project" : "Create new project"}
          </h3>
          <div className="py-4">
            <FormNewProject />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleCloseModal}
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
