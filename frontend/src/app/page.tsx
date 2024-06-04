"use client";
import { ProjectInterface } from "@/core/types";
import { AddIcon } from "../core/components/icons";
import { useEffect, useState } from "react";
import { getProjects } from "@/core/api";
import { Projects } from "@/core/components/Project/Projects";
import { ModalNewProject } from "@/core/components/Project/ModalNewProject";
import { ProjectProvider } from "@/core/context/projectToEditContext";

export default function Home() {
  const [projects, setProjects] = useState<ProjectInterface[]>([]);

  useEffect(() => {
    const getProjectsData = async () => {
      const data = await getProjects();
      setProjects(data);
    };
    getProjectsData();
  }, []);

  const handleOpenModal = () => {
    const modal = document.getElementById("my_modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div>
      <div className="mt-16 flex justify-end">
        <button className="btn" onClick={handleOpenModal}>
          Add Project
          <AddIcon />
        </button>
      </div>
      <ProjectProvider>
        <Projects projects={projects} />
        <ModalNewProject />
      </ProjectProvider>
    </div>
  );
}
