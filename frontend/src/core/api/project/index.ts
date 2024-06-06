"use server";

import { ProjectFormInterface } from "@/core/types";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const ProjectFormSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  creationDate: z.string(),
  terminationDate: z.string().nullable(),
});

const CreateProjectSchema = ProjectFormSchema.omit({ id: true });

/**
 * The base URL for the project API.
 */
const baseUrlProject = "https://retoolapi.dev/wbgTjE";

/**
 * Retrieves a list of projects from the server.
 * @returns A Promise that resolves to the JSON response containing the projects.
 */
export const getProjects = async () => {
  try {
    const response = await fetch(`${baseUrlProject}/data`);
    return response.json();
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
    const response = await fetch(`${baseUrlProject}/data/${id}`);
    const data = await response.json();
    console.log(data);
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
    const response = await fetch(`${baseUrlProject}/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validProject),
    });
    revalidatePath("/");
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
    const response = await fetch(`${baseUrlProject}/data/${project.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validProject),
    });
    revalidatePath("/");
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
    const response = await fetch(`${baseUrlProject}/data/${id}`, {
      method: "DELETE",
    });
    revalidatePath("/");
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting project");
  }
};

/**
 * Retrieves filtered projects based on the provided query.
 * @param query - The search query to filter projects by name.
 * @returns A Promise that resolves to the JSON response containing the filtered projects.
 */
export const getFilteredProjects = async (query: string) => {
  const response = await fetch(`${baseUrlProject}/data?name=${query}`);
  return response.json();
};

const ITEMS_PER_PAGE = 8;

/**
 * Retrieves a paginated list of projects from the server.
 *
 * @param page - The page number to retrieve.
 * @returns A Promise that resolves to the JSON response containing the paginated projects.
 */
export const getPaginatedProjects = async (page: number) => {
  const response = await fetch(`${baseUrlProject}/data?_page=${page}&_limit=${ITEMS_PER_PAGE}`);
  return response.json();
};

/**
 * Retrieves the total number of pages for filtered projects.
 * @returns The total number of pages.
 * @throws An error if there is an issue fetching the project pages.
 */
export const getFilteredProjectsPages = async () => {
  try {
    const projects = await getProjects();
    const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching project pages");
  }
};
