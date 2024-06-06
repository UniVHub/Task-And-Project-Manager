"use client";
import { useContext, useEffect, useState } from "react";
import { ProjectFormInterface, ProjectInterface } from "@/core/types";
import { AddIcon } from "@/core/components/icons";
import { createProject, getProjects, updateProject } from "@/core/api";
import { Projects } from "@/core/components/Project/Projects";
import { ModalNewProject } from "@/core/components/Project/ModalNewProject";
import { toast } from "sonner";
import { ProjectContext } from "@/core/context/projectToEditContext";

export default function Home() {
  const [projects, setProjects] = useState<ProjectInterface[]>([]);

  const { setProjectToEdit } = useContext(ProjectContext);

  const handleOpenModal = () => {
    const modal = document.getElementById("my_modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const handleCloseModal = () => {
    setProjectToEdit({});
    const modal = document.getElementById("my_modal") as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  const saveProject = (project: ProjectFormInterface) => {
    if (project.id) {
      updateProject(project).then(() => {
        toast.success("Project updated successfully");
      });
    } else {
      const newProject = {
        ...project,
        creationDate: new Date().toISOString(),
        terminationDate: null,
      };
      createProject(newProject).then(() => {
        toast.success("Project created successfully");
      });
    }
    handleCloseModal();
  };

  useEffect(() => {
    const getProjectsData = async () => {
      const data = await getProjects();
      setProjects(data);
    };
    getProjectsData();
  }, []);

  return (
    <div>
      <div className="mt-12 flex justify-end">
        <button className="btn" onClick={handleOpenModal}>
          Add Project
          <AddIcon />
        </button>
      </div>
      <Projects projects={projects} handleOpenModal={handleOpenModal} />
      <ModalNewProject
        handleCloseModal={handleCloseModal}
        saveProject={saveProject}
      />
    </div>
  );
}
