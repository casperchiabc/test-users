import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-screen overflow-hidden">
      <AiOutlineLoading3Quarters className="spin text-5xl" />
    </div>
  );
}
