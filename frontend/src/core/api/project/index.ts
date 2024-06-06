import { ProjectFormInterface, ProjectInterface } from "@/core/types";
import { unstable_noStore as noStore } from "next/cache";
/**
 * The base URL for the project API.
 */
const baseUrlProject = "https://retoolapi.dev/wbgTjE";

/**
 * Retrieves a list of projects from the server.
 * @returns A Promise that resolves to the JSON response containing the projects.
 */
export const getProjects = async () => {
  noStore();
  const response = await fetch(`${baseUrlProject}/data`);
  return response.json();
};

/**
 * Retrieves a project by its ID.
 * @param id - The ID of the project to retrieve.
 * @returns A Promise that resolves to the project data.
 */
export const getProject = async (id: string) => {
  noStore();
  const response = await fetch(`${baseUrlProject}/data/${id}`);
  return response.json();
};

/**
 * Creates a new project.
 * @param project - The project object to be created.
 * @returns A Promise that resolves to the response data as JSON.
 */
export const createProject = async (project: ProjectFormInterface) => {
  noStore();
  const response = await fetch(`${baseUrlProject}/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
  return response.json();
};

/**
 * Updates a project in the backend server.
 * @param project - The project object to be updated.
 * @returns A Promise that resolves to the updated project data.
 */
export const updateProject = async (project: ProjectFormInterface) => {
  noStore();
  const response = await fetch(`${baseUrlProject}/data/${project.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
  return response.json();
};

/**
 * Deletes a project by its ID.
 * @param id - The ID of the project to delete.
 * @returns A Promise that resolves to the JSON response from the server.
 */
export const deleteProject = async (id: string) => {
  noStore();
  const response = await fetch(`${baseUrlProject}/data/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
