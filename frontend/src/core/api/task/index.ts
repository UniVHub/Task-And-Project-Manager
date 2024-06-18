"use server";

import { TaskFormInterface } from "@/core/types";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const TaskFormSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  creation_date: z.string(),
  termination_date: z.string().nullable(),
  projectId: z.number(),
});

const CreateTaskSchema = TaskFormSchema.omit({ id: true });

const BASEURLTASKS = process.env.NEXT_PUBLIC_TASKS_URL;

/**
 * Retrieves tasks by project ID from the server.
 * @param projectId - The ID of the project.
 * @returns A Promise that resolves to the fetched tasks.
 * @throws An error if there was an issue fetching the tasks.
 */
export const getTasksByProjectId = async (projectId: number) => {
  try {
    const response = await fetch(`${BASEURLTASKS}/by_project/${projectId}`);
    if (!response.ok) throw new Error("Error fetching tasks");
    if (response.status === 404) return [];
    return response.status !== 204 ? await response.json() : [];
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
    const response = await fetch(`${BASEURLTASKS}/${id}`);
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
    const response = await fetch(`${BASEURLTASKS}/${task.projectId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validTask),
    });
    revalidatePath(`/project/${task.projectId}`);
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
    const response = await fetch(`${BASEURLTASKS}/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validTask),
    });
    revalidatePath(`/project/${task.projectId}`);
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
    const response = await fetch(`${BASEURLTASKS}/${id}`, {
      method: "DELETE",
    });
    revalidatePath(`/project/${id}`);
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting task");
  }
};

export const deleteAllTasks = async (projectId: number) => {
  try {
    const response = await fetch(`${BASEURLTASKS}/`, {
      method: "DELETE",
    });
    revalidatePath(`/project/${projectId}`);
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting tasks");
  }
};

/**
 * Retrieves filtered tasks based on the provided query.
 * @param query - The search query to filter tasks by name.
 * @returns A Promise that resolves to the JSON response containing the filtered tasks.
 */
export const getTasksByName = async (query: string, projectId: number) => {
  try {
    const url =
      query === ""
        ? `${BASEURLTASKS}/search/${projectId}/""`
        : `${BASEURLTASKS}/search/${projectId}/${query}`;

    const response = await fetch(url);

    return response.json();

  } catch (error) {
    console.error(error);
    throw new Error("Error fetching tasks by name");
  }
};
