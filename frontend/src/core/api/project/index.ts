"use server";

import { ProjectFormInterface } from "@/core/types";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const ProjectFormSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  creation_date: z.string(),
  termination_date: z.string().nullable(),
});

const CreateProjectSchema = ProjectFormSchema.omit({ id: true });

const BASEURLPROJECT = process.env.NEXT_PUBLIC_PROJECTS_URL;

/**
 * Retrieves a list of projects from the server.
 * @returns A Promise that resolves to the JSON response containing the projects.
 */
export const getProjects = async () => {
  try {
    const response = await fetch(`${BASEURLPROJECT}`);
    if (!response.ok) throw new Error("Error fetching projects");
    revalidatePath(`/logs`);
    return response.status !== 204 ? await response.json() : null;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching projects");
  }
};

/**
 * Retrieves a project by its ID.
 * @param id - The ID of the project to retrieve.
 * @returns A Promise that resolves to the project data.
 */
export const getProject = async (id: string) => {
  try {
    const response = await fetch(`${BASEURLPROJECT}/${id}`);
    const data = await response.json();
    revalidatePath(`/logs`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching project");
  }
};

/**
 * Creates a new project.
 * @param project - The project object to be created.
 * @returns A Promise that resolves to the response data as JSON.
 */
export const createProject = async (project: ProjectFormInterface) => {
  const validProject = CreateProjectSchema.parse(project);

  try {
    const response = await fetch(`${BASEURLPROJECT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validProject),
    });
    revalidatePath("/");
    revalidatePath(`/logs`);
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error creating project");
  }
};

/**
 * Updates a project in the backend server.
 * @param project - The project object to be updated.
 * @returns A Promise that resolves to the updated project data.
 */
export const updateProject = async (project: ProjectFormInterface) => {
  const validProject = ProjectFormSchema.parse(project);

  try {
    const response = await fetch(`${BASEURLPROJECT}/${project.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validProject),
    });
    revalidatePath("/");
    revalidatePath(`/logs`);
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error updating project");
  }
};

/**
 * Deletes a project by its ID.
 * @param id - The ID of the project to delete.
 * @returns A Promise that resolves to the JSON response from the server.
 */
export const deleteProject = async (id: string) => {
  try {
    const response = await fetch(`${BASEURLPROJECT}/${id}`, {
      method: "DELETE",
    });
    revalidatePath("/");
    revalidatePath(`/logs`);
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting project");
  }
};

/**
 * Deletes all projects.
 * @returns A promise that resolves to the response JSON.
 * @throws An error if there is an error deleting the project.
 */
export const deleteAllProjects = async () => {
  try {
    const response = await fetch(`${BASEURLPROJECT}`, {
      method: "DELETE",
    });
    revalidatePath("/");
    revalidatePath(`/logs`);
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting project");
  }
};

export const getFilteredProjectsByName = async (name: string) => {
  try {
    const response = await fetch(`${BASEURLPROJECT}/search/${name}`);
    revalidatePath(`/logs`);
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching filtered projects");
  }
};

const ITEMS_PER_PAGE = 6;

/**
 * Fetches filtered projects from the server.
 *
 * @param query - The search query string.
 * @param page - The page number to fetch.
 * @returns A Promise that resolves to the fetched data.
 * @throws An error if there is an issue fetching the projects.
 */
export const getFilteredProjects = async (query: string, page: number) => {
  try {
    const url =
      query === ""
        ? `${BASEURLPROJECT}/search/*/${ITEMS_PER_PAGE}/${page - 1}`
        : `${BASEURLPROJECT}/search/${query}/${ITEMS_PER_PAGE}/${page - 1}`;

    const response = await fetch(url);

    revalidatePath(`/logs`);

    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching filtered projects");
  }
};

/**
 * Retrieves the total number of pages for filtered projects.
 * @returns The total number of pages.
 * @throws An error if there is an issue fetching the project pages.
 */
export const getFilteredProjectsPages = async (query: string) => {
  try {
    const url =
      query === ""
        ? `${BASEURLPROJECT}/pages/*/${ITEMS_PER_PAGE}`
        : `${BASEURLPROJECT}/pages/${query}/${ITEMS_PER_PAGE}`;

    const response = await fetch(url);

    revalidatePath(`/logs`);

    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching project pages");
  }
};
