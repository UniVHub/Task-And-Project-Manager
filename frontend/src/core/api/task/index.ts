"use server";

import { TaskFormInterface } from "@/core/types";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const TaskFormSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  creationDate: z.string(),
  terminationDate: z.string().nullable(),
  projectId: z.number(),
});

const CreateTaskSchema = TaskFormSchema.omit({ id: true });

/**
 * The base URL for the task API.
 */
const baseUrlProject = "https://retoolapi.dev/Y0adP6";

/**
 * Retrieves a list of tasks from the server.
 * @returns A Promise that resolves to the JSON response containing the tasks.
 */
export const getTasks = async () => {
  try {
    const response = await fetch(`${baseUrlProject}/task`);
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching tasks");
  }
};

/**
 * Retrieves a task by its ID.
 * @param id - The ID of the task to retrieve.
 * @returns A Promise that resolves to the task data.
 */
export const getTask = async (id: string) => {
  try {
    const response = await fetch(`${baseUrlProject}/task/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching task");
  }
};

/**
 * Creates a new task.
 * @param task - The task object to be created.
 * @returns A Promise that resolves to the response data as JSON.
 */
export const createTask = async (task: TaskFormInterface) => {
  const validTask = CreateTaskSchema.parse(task);

  try {
    const response = await fetch(`${baseUrlProject}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validTask),
    });
    revalidatePath("/");
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error creating task");
  }
};

/**
 * Updates a task in the backend server.
 * @param task - The task object to be updated.
 * @returns A Promise that resolves to the updated task data.
 */
export const updateTask = async (task: TaskFormInterface) => {
  const validTask = TaskFormSchema.parse(task);

  try {
    const response = await fetch(`${baseUrlProject}/task/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validTask),
    });
    revalidatePath("/");
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error updating task");
  }
};

/**
 * Deletes a task by its ID.
 * @param id - The ID of the task to delete.
 * @returns A Promise that resolves to the JSON response from the server.
 */
export const deleteTask = async (id: string) => {
  try {
    const response = await fetch(`${baseUrlProject}/task/${id}`, {
      method: "DELETE",
    });
    revalidatePath("/");
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting task");
  }
};

/**
 * Retrieves filtered tasks based on the provided query.
 * @param query - The search query to filter tasks by name.
 * @returns A Promise that resolves to the JSON response containing the filtered tasks.
 */
export const getTasksByName = async (query: string) => {
  const response = await fetch(`${baseUrlProject}/task?name=${query}`);
  return response.json();
};


export const getTasksByProjectId = async (projectId: number) => {
  try {
    const response = await fetch(
      `${baseUrlProject}/task?projectId=${projectId}`,
    );
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching tasks");
  }
};