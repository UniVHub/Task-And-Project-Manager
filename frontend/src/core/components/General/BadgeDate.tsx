import { formatDate } from "@/core/utils";

interface BadgeDateProps {
  type: "creation" | "termination";
  date: string;
}

export default function BadgeDate({ type, date }: BadgeDateProps) {
  return (
    <>
      {type == "termination" ? (
        <div className="badge badge-accent badge-lg text-info-content">
          <span className="font-bold">Termination Date:</span>
          {formatDate(date)}
        </div>
      ) : (
        <div className="badge badge-lg flex gap-2 bg-blue-300 text-primary-content">
          <span className="font-bold">Creation Date:</span>
          {formatDate(date)}
        </div>
      )}
    </>
  );
}
