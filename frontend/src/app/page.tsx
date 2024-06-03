"use client";
import { ProjectInterface } from "@/core/types";
import { AddIcon } from "../core/components/icons";
import { useEffect, useState } from "react";
import { getProjects } from "@/core/api";
import { Projects } from "@/core/components/Projects";

export default function Home() {
  const [projects, setProjects] = useState<ProjectInterface[]>([]);

  useEffect(() => {
    const getProjectsData = async () => {
      const data = await getProjects();
      setProjects(data);
    };
    getProjectsData();
  }, []);

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  return (
    <main>
      <div className="mr-10 mt-16 flex justify-end md:mr-24">
        <button className="btn">
          Add Project
          <AddIcon />
        </button>
      </div>
      <Projects projects={projects} />
    </main>
  );
}
