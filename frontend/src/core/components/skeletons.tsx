// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function TableSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-base-300 p-2 shadow-sm`}
    >
      <div className="flex justify-around p-4">
        <div className="ml-2 h-6 w-24 rounded-md bg-base-100 text-sm font-medium" />
        <div className="ml-2 h-6 w-24 rounded-md bg-base-100 text-sm font-medium" />
        <div className="ml-2 h-6 w-24 rounded-md bg-base-100 text-sm font-medium" />
        <div className="ml-2 h-6 w-24 rounded-md bg-base-100 text-sm font-medium" />
        <div className="ml-2 h-6 w-24 rounded-md bg-base-100 text-sm font-medium" />
      </div>
      <div className="mt-4 flex items-center justify-center truncate rounded-xl bg-base-100 px-4 py-8">
        <div className="h-14 w-full rounded-md bg-base-300" />
      </div>
      <div className="mt-4 flex items-center justify-center truncate rounded-xl bg-base-100 px-4 py-8">
        <div className="h-14 w-full rounded-md bg-base-300" />
      </div>
      <div className="mt-4 flex items-center justify-center truncate rounded-xl bg-base-100 px-4 py-8">
        <div className="h-14 w-full rounded-md bg-base-300" />
      </div>
    </div>
  );
}