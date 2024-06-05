"use client";
import React, { useEffect, useId, useState } from "react";
import { toast } from "sonner";
import { ProjectInterface, ProjectFormInterface } from "@/core/types";

interface FormNewProjectProps {
  projectToEdit: ProjectInterface | {};
  saveProject: (project: ProjectFormInterface) => void;
  isClosed: boolean;
  setIsClosed: (isClosed: boolean) => void;
}

export const FormNewProject: React.FC<FormNewProjectProps> = ({
  projectToEdit,
  saveProject,
  isClosed,
  setIsClosed,
}) => {
  const [dataForm, setDataForm] = useState({
    name: "",
    description: "",
  });

  const name = useId();
  const description = useId();

  const clearDataForm = () => {
    setDataForm({
      name: "",
      description: "",
    });
  };

  useEffect(() => {
    if (Object.keys(projectToEdit).length > 0) {
      setDataForm((prevState) => ({ ...prevState, ...projectToEdit }));
    }
  }, [projectToEdit]);

  useEffect(() => {
    if (isClosed) {
      clearDataForm();
    }
    setIsClosed(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isClosed])

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (dataForm.name.trim() === "" || dataForm.description.trim() === "") {
      toast.error("Please fill all fields");
      return;
    }
    saveProject(dataForm);
    clearDataForm();
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
          value={dataForm.name}
          onChange={(e) => setDataForm({ ...dataForm, name: e.target.value })}
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
          value={dataForm.description}
          onChange={(e) =>
            setDataForm({ ...dataForm, description: e.target.value })
          }
        />
      </div>
      <input
        type="submit"
        className="transtion-all w-full cursor-pointer bg-indigo-600 p-3 font-bold uppercase text-white hover:bg-indigo-700"
        value={
          (Object.keys(projectToEdit).length>0) ? "Edit Project" : "Create Project"
        }
      />
    </form>
  );
};
