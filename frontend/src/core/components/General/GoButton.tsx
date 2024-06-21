"use client"

import Link from "next/link";
import { FcQuestions } from "react-icons/fc";
import { FcRatings } from "react-icons/fc";
import { usePathname } from "next/navigation";

const GoButton = () => {
  const pathname = usePathname();
  return pathname === "/logs" ? (
    <Link href="/">
      <span className="fixed bottom-5 right-5 rounded-full bg-sky-200 p-2">
        <FcRatings size={30} />
      </span>
    </Link>
  ) : (
    <Link href="/logs">
      <span className="fixed bottom-5 right-5 rounded-full bg-sky-200 p-2">
        <FcQuestions size={30} />
      </span>
    </Link>
  );
};

export default GoButton;
