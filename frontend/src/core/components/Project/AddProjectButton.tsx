"use client";

import { FolderPlusIcon } from "@heroicons/react/24/outline";

/**
 * Renders a button component for adding a project.
 * @returns The rendered AddButton component.
 */
export default function AddProjectButton() {
  const handleOpenModal = () => {
    const modal = document.getElementById("my_modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };
  return (
    <button
      className="btn btn-secondary"
      onClick={handleOpenModal}
    >
      Add Project
      <FolderPlusIcon className="h-5" />
    </button>
  );
}
