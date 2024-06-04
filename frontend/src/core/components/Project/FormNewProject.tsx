"use client";
import React, { useEffect, useId, useState } from "react";
import { toast } from "sonner";
import { createProject } from "../../api";
import { useProjectContext } from "@/core/context/projectToEditContext";
import { updateProject } from "../../api";

export const FormNewProject = () => {
  const { projectToEdit, setProjectToEdit } = useProjectContext();

  const [project, setProject] = useState({
    name: projectToEdit ? projectToEdit.name : "",
    description: projectToEdit ? projectToEdit.description : "",
  });

  useEffect(() => {
    console.log(projectToEdit)
    if (projectToEdit) {
      setProject({
        name: projectToEdit.name,
        description: projectToEdit.description,
      });
    } else {
      setProject({ name: "", description: "" });
    }
  },[projectToEdit])

  const name = useId();
  const description = useId();

  const closeModal = () => {
    const modal = document.getElementById("my_modal") as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!project.name || !project.description) {
      toast.error("Please fill all fields");
      return;
    }

    if (!projectToEdit) {
      const newProject = {
        ...project,
        creationDate: new Date().toISOString(),
        terminationDate: null,
      };

      createProject(newProject).then(() => {
        toast.success("Project created successfully");
      });
    } else {
      const newProject = {
        ...project,
        id: projectToEdit.id,
        creationDate: projectToEdit.creationDate,
        terminationDate: projectToEdit.terminationDate,
      };
      updateProject(newProject).then(() => {
        toast.success("Project updated successfully");
      });

      setProjectToEdit(null);
    }
    
    closeModal();
    setProject({ name: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <label htmlFor={name} className="block font-bold text-gray-300">
          Name
        </label>
        <input
          type="text"
          id={name}
          placeholder="Enter project's name"
          className="input input-bordered mt-2 w-full"
          value={project.name}
          onChange={(e) => setProject({ ...project, name: e.target.value })}
        />
      </div>
      <div className="mb-5">
        <label htmlFor={description} className="block font-bold text-gray-300">
          Description
        </label>
        <textarea
          id={description}
          className="textarea textarea-bordered mt-2 w-full"
          placeholder="Enter project's description"
          value={project.description}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
        />
      </div>
      <input
        type="submit"
        className="transtion-all w-full cursor-pointer bg-indigo-600 p-3 font-bold uppercase text-white hover:bg-indigo-700"
        value={"Create Project"}
      />
    </form>
  );
};
