"use client";

import { FolderPlusIcon } from "@heroicons/react/24/outline";

/**
 * Renders a button component for adding a project.
 * @returns The rendered AddButton component.
 */
export default function AddTaskButton() {
  const handleOpenModal = () => {
    const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };
  return (
    <button
      className="btn bg-indigo-600 hover:bg-indigo-700"
      onClick={handleOpenModal}
    >
      Add Task
      <FolderPlusIcon className="h-5" />
    </button>
  );
}
