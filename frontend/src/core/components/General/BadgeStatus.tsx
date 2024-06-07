interface BadgeStatusProps {
  type: "finished" | "progress";
}

export default function BadgeStatus({ type }: BadgeStatusProps) {
  return (
    <>
      {type == "finished" ? (
        <div className="badge badge-accent badge-md text-info-content">
          Finished
        </div>
      ) : (
        <div className="badge badge-md bg-blue-300 text-primary-content">
          In Progress
        </div>
      )}
    </>
  );
}
