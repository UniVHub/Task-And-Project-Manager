"use client";
import React, { createContext, useState } from "react";
import { TaskInterface } from "@/core/types";

/**
 * Represents the props for the TaskContext component.
 */
interface TaskContextProps {
  taskToEdit: TaskInterface | {};
  setTaskToEdit: React.Dispatch<React.SetStateAction<TaskInterface | {}>>;
}

/**
 * Context for managing the task to edit.
 */
export const TaskContext = createContext<TaskContextProps>({
  taskToEdit: {},
  setTaskToEdit: () => {},
});

/**
 * Provides a context for managing the task to edit.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {JSX.Element} The rendered component.
 */
export const TaskProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [taskToEdit, setTaskToEdit] = useState<TaskInterface | {}>({});

  return (
    <TaskContext.Provider value={{ taskToEdit, setTaskToEdit }}>
      {children}
    </TaskContext.Provider>
  );
};
