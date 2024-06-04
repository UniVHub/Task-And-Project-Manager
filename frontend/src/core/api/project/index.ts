import { ProjectInterface } from "@/core/types";

const baseUrlProject = "https://retoolapi.dev/wbgTjE";


export const getProjects = async () => {
  const response = await fetch(`${baseUrlProject}/data`);
  return response.json();
};

export const getProject = async (id: string) => {
  const response = await fetch(`${baseUrlProject}/data/${id}`);
  return response.json();
}

export const createProject = async (project: ProjectInterface) => {
  const response = await fetch(`${baseUrlProject}/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
  return response.json();
}

export const updateProject = async (project: ProjectInterface) => {
  const response = await fetch(`${baseUrlProject}/data/${project.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
  return response.json();
}

export const deleteProject = async (id: string) => {
  const response = await fetch(`${baseUrlProject}/data/${id}`, {
    method: "DELETE",
  });
  return response.json();
}