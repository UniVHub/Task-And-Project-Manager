import AddButton from "@/core/components/Project/AddButton";
import Search from "@/core/components/Project/Search";
import ModalNewProject from "@/core/components/Project/ModalNewProject";
import { Suspense } from "react";
import Projects from "@/core/components/Project/Projects";
import { TableSkeleton } from "@/core/components/skeletons";
import { getFilteredProjectsPages } from "@/core/api";
import Pagination from "@/core/components/Project/Pagination";
import Breadcrumbs from "@/core/components/Project/Breadcrumbds";

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
      <div className="mb-6 mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <AddButton />
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
