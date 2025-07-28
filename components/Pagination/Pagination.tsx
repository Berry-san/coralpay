import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { DOTS, usePagination } from "./usePagination";

interface PaginationProps {
  onPageChange: (pageNumber: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const isFirstPage = currentPage === 1;
  const isLastPage =
    paginationRange[paginationRange.length - 1] === currentPage;

  return (
    <div className="flex items-center mt-5">
      <button
        // className={isFirstPage ? "" : ""}
        className="text-black px-4"
        onClick={onPrevious}
        disabled={isFirstPage}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {paginationRange.map((pageNumber: any) => {
        if (pageNumber === DOTS) {
          return (
            <span key={pageNumber as string} className="px-3 py-1">
              ...
            </span>
          );
        }

        return (
          <button
            key={pageNumber as number}
            className={` ${
              pageNumber === currentPage
                ? "bg-[#00328B] text-white"
                : "bg-secondary text-black"
            } rounded-lg text-base px-4 py-2 me-3 font-bold `}
            onClick={() => onPageChange(pageNumber as number)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        // className={isLastPage ? "" : ""}
        className="text-black px-4"
        onClick={onNext}
        disabled={isLastPage}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Pagination;
