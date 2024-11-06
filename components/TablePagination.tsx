import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

interface PaginationParams {
    currentPage: number;
    totalPages: number;
    handlePageChange: (newPage: number) => void;
}

export default function TablePagination({currentPage, totalPages, handlePageChange}: PaginationParams) {
  return (
    <div className="flex justify-end py-4 pl-4 items-center">
      <button
        type="button"
        className={
          "font-medium rounded-3xl text-sm px-2.5 py-2.5 text-center bg-red-700 text-white " +
          (currentPage <= 1 ? "opacity-40" : "transition ease-in-out duration-150 hover:bg-red-900")
        }
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <FaAngleLeft />
      </button>
      <span className="mx-3">
        Page {currentPage} of {totalPages}
      </span>
      <button
        type="button"
        className={
          "font-medium rounded-3xl text-sm px-2.5 py-2.5 text-center bg-red-700 text-white " +
          (currentPage >= totalPages ? "opacity-40" : "transition ease-in-out duration-150 hover:bg-red-900")
        }
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <FaAngleRight />
      </button>
    </div>
  );
}
