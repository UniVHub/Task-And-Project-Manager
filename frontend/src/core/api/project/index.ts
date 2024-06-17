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
// const BASEURLPROJECT= "https://retoolapi.dev/wbgTjE";
const BASEURLPROJECT = process.env.NEXT_PUBLIC_PROJECTS_URL;


/**
 * Retrieves a list of projects from the server.
 * @returns A Promise that resolves to the JSON response containing the projects.
 */
export const getProjects = async () => {
  try {
    const response = await fetch(`${BASEURLPROJECT}`);
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
    const response = await fetch(`${BASEURLPROJECT}/${id}`);
    const data = await response.json();
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
    return response.json();
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
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting project");
  }
}

/**
 * Retrieves filtered projects based on the provided query.
 * @param query - The search query to filter projects by name.
 * @returns A Promise that resolves to the JSON response containing the filtered projects.
 */
export const getFilteredProjectsByName = async (query: string) => {
  const response = await fetch(`${BASEURLPROJECT}/search/${query}`);
  return response.json();
};

/**
 * Retrieves a paginated list of projects from the server.
 *
 * @param page - The page number to retrieve.
 * @returns A Promise that resolves to the JSON response containing the paginated projects.
 */
export const getPaginatedProjects = async (page: number) => {
  const response = await fetch(`${BASEURLPROJECT}/get_page/${page}`);
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
    const totalPages = Math.ceil(projects.length / 1);
    return totalPages;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching project pages");
  }
};
