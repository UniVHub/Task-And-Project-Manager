import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Link href="/" className="fixed right-0 top-0 m-4">
        <ArrowLeftCircleIcon className="w-12" />
      </Link>
      {children}
    </div>
  );
}
