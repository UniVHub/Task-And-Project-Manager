"use client";
import { deleteTask, updateTask } from "@/core/api";
import { TaskContext } from "@/core/context/taskToEditContext";
import { TaskInterface } from "@/core/types";
import { formatDate, truncateString } from "@/core/utils";
import clsx from "clsx";
import Link from "next/link";
import React, { useContext } from "react";
import { toast } from "sonner";
import BadgeStatus from "../General/BadgeStatus";

interface TaskProps {
  task: TaskInterface;
  index: number;
  projectId: number;
  numberOfTasks: number;
}

export default function Task({ task, index, numberOfTasks, projectId }: TaskProps) {
  const { setTaskToEdit } = useContext(TaskContext);

  const handleOpenModal = () => {
    const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const handleEdit = () => {
    setTaskToEdit(task);
    handleOpenModal();
  };

  const handleDelete = () => {
    deleteTask(String(task.id)).then(() => {
      toast.success("Task deleted successfully");
    });
    (document.activeElement as HTMLElement)?.blur();
  };

  const finishTask = () => {
    const updatedTask = {
      ...task,
      projectId: projectId,
      termination_date: new Date().toISOString(),
    };
    updateTask(updatedTask).then(() => {
      toast.success("Task finished successfully");
    });
    console.log(updatedTask);
    (document.activeElement as HTMLElement)?.blur();
  };

  return (
    <tr>
      <td>{truncateString(task.name, 38)}</td>
      <td>
        {<BadgeStatus type={task.termination_date ? "finished" : "progress"} />}
      </td>
      <td>
        <div
          className={clsx("dropdown", {
            "dropdown-left dropdown-bottom": index === 0,
            "dropdown-left dropdown-top": index === numberOfTasks - 1,
            "dropdown-end dropdown-left":
              index !== 0 && index !== numberOfTasks - 1,
          })}
        >
          <div tabIndex={0} role="button" className="btn btn-xs m-1">
            Actions
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] h-max w-52 rounded-box bg-base-300 p-2 shadow"
            style={{
              position: "fixed",
              top: "80%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
            }}
          >
            {/* <li>
              <Link href={`/task/${task.id}`}>
                <p>Details</p>
              </Link>
            </li> */}
            <li>
              <button onClick={handleEdit}>Edit</button>
            </li>
            <li>
              <button onClick={handleDelete}>Delete</button>
            </li>
            {task.termination_date ? null : (
              <li>
                <button className="text-error" onClick={finishTask}>
                  Finish Task
                </button>
              </li>
            )}
          </ul>
        </div>
      </td>
    </tr>
  );
}
