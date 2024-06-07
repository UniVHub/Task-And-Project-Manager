import AddProjectButton from "@/core/components/Project/AddProjectButton";
import Search from "@/core/components/Project/Search";
import ModalNewProject from "@/core/components/Project/ModalNewProject";
import { Suspense } from "react";
import Projects from "@/core/components/Project/Projects";
import { TableSkeleton } from "@/core/components/skeletons";
import { getFilteredProjectsPages } from "@/core/api";
import Pagination from "@/core/components/Project/Pagination";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getFilteredProjectsPages();

  return (
    <>
      <div className="flex items-center justify-between gap-2 mt-12">
        <Search placeholder="Search projects..." />
        <AddProjectButton />
      </div>

      <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
        <Projects query={query} currentPage={currentPage} />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>

      <ModalNewProject />
    </>
  );
}
