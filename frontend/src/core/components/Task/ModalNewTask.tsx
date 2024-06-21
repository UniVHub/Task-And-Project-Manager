"use client";
import { createTask, updateTask } from "@/core/api";
import { TaskContext } from "@/core/context/taskToEditContext";
import { TaskFormInterface } from "@/core/types";
import { useContext, useState } from "react";
import { toast } from "sonner";
import FormNewTask from "./FormNewTask";

interface ModalNewTaskProps {
  projectId: string;
}

export default function ModalNewTask({ projectId }: ModalNewTaskProps) {
  const { taskToEdit, setTaskToEdit } = useContext(TaskContext);

  const [isClosed, setIsClosed] = useState(false);

  const handleCloseModal = () => {
    setTaskToEdit({});
    const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  const handleClose = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleCloseModal();
    setIsClosed(true);
  };

  const saveTask = (task: TaskFormInterface) => {
    if (task.id) {
      const newTask = {
        ...task,
        projectId: Number(projectId),
      };
      updateTask(newTask).then(() => {
        toast.success("Task updated successfully");
      });
    } else {
      const newTask = {
        ...task,
        creation_date: new Date().toISOString(),
        termination_date: null,
        projectId: Number(projectId),
      };
      createTask(newTask).then(() => {
        toast.success("Task created successfully");
      });
    }
    handleCloseModal();
  };

  return (
    <div>
      <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-center text-lg font-bold capitalize">
            {Object.keys(taskToEdit).length > 0
              ? "Edit Task"
              : "Create New Task"}
          </h3>
          <div className="py-4">
            <FormNewTask
              saveTask={saveTask}
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
