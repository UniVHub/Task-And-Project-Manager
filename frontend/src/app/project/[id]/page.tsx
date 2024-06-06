import { getProject } from "@/core/api";
import { ProjectInterface } from "@/core/types";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const project: ProjectInterface = await getProject(id);

  if (Object.keys(project).length === 0) {
    return notFound();
  }

  return (
    <div>
      <h1>Project</h1>
      <span>{id}</span>
      <span>{project.name}</span>
    </div>
  );
}
