"use client";

export const FinishButton = () => {
  const handlefinish = () => {
    console.log("finish");
  };
  return (
    <button onClick={handlefinish} className="btn-base-300 btn btn-active p-3">
      Finish The Project
    </button>
  );
};
