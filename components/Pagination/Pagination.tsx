import { usePagination } from '../../hooks/'
import React from 'react'

interface IPagination {
  numberOfPage: number
}

export const Pagination = ({ numberOfPage }: IPagination) => {
  const { activePage, handlePageClick } = usePagination()

  function handleNextPage() {
    if (parseInt(activePage) >= numberOfPage) return
    handlePageClick(parseInt(activePage) + 1)
  }

  function handlePreviousPage() {
    if (parseInt(activePage) <= 1) return
    handlePageClick(parseInt(activePage) - 1)
  }

  return (
    <div className="flex items-center justify-center gap-4 py-4">
      {/* Previous Button */}
      <button
        className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 
        transition-all duration-200 hover:bg-gray-100 hover:scale-105 active:bg-gray-200 disabled:opacity-50 cursor-pointer"
        onClick={handlePreviousPage}
        disabled={parseInt(activePage) <= 1}
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex gap-2">
        {Array.from({ length: numberOfPage }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 
            ${
              parseInt(activePage) === page
                ? 'bg-sky-400 text-white hover:bg-sky-500'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 hover:scale-105'
            }
            `}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 
        transition-all duration-200 hover:bg-gray-100 hover:scale-105 active:bg-gray-200 disabled:opacity-50 cursor-pointer"
        onClick={handleNextPage}
        disabled={parseInt(activePage) >= numberOfPage}
      >
        Next
      </button>
    </div>
  )
}
