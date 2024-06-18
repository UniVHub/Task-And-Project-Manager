import { getProject } from "@/core/api";
import Search from "@/core/components/Project/Search";
import AddTaskButton from "@/core/components/Task/AddTaskButton";
import ModalNewTask from "@/core/components/Task/ModalNewTask";
import ProjectInformation from "@/core/components/Task/ProjectInformation";
import TableTasks from "@/core/components/Task/Table";
import { TableSkeleton } from "@/core/components/skeletons";
import { ProjectInterface } from "@/core/types";
import { formatDate } from "@/core/utils";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    query?: string;
  };
}) {
  const id = params.id;
  const query = searchParams?.query || "";

  const project = await getProject(id);

  if (Object.keys(project).length === 0) {
    return notFound();
  }

  console.log(project)

  return (
    <>
      <div className="mt-14">
        <ProjectInformation project={project as ProjectInterface} />
      </div>
      <div className="mt-8">
        <div className="mb-6 mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search invoices..." />
          <AddTaskButton />
        </div>
        <Suspense key={query} fallback={<TableSkeleton />}>
          <TableTasks query={query} projectId={project.id} />
        </Suspense>
      </div>

      <ModalNewTask projectId={project.id} />
    </>
  );
}
