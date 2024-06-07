import React from "react";
import { TaskInterface } from "@/core/types";
import { getTasksByProjectId } from "@/core/api";
import Task from "./Task";

interface TableTasksProps {
  query: string;
  projectId: number;
}

export default async function TableTasks({
  query,
  projectId,
}: TableTasksProps) {
  const tasks = await getTasksByProjectId(projectId);
  return (
    <>
      <h3 className="text-center text-xl font-bold">List of Tasks</h3>
      <div className="relative mt-6 overflow-x-auto overflow-y-hidden">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task: TaskInterface, index: number) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                numberOfTasks={tasks.length}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
