import { formatDate } from "@/core/utils";

interface BadgeDateSmallProps {
  type: "creation" | "termination";
  date: string;
}

export default function BadgeDateSmall({ type, date }: BadgeDateSmallProps) {
  return (
    <>
      {type == "termination" ? (
        <div className="badge badge-accent badge-xs text-info-content">
          <span className="font-bold">TD:</span>
          {formatDate(date)}
        </div>
      ) : (
        <div className="badge badge-secondary badge-xs flex gap-2 text-secondary-content">
          <span className="font-bold">CD:</span>
          {formatDate(date)}
        </div>
      )}
    </>
  );
}
