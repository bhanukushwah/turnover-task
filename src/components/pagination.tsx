import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(1, currentPage - 5); // Start from currentPage - 5
        const endPage = Math.min(totalPages, startPage + 9); // End at startPage + 9 or totalPages

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li key={i} className={i === currentPage ? 'active' : 'text-gray-400'}>
                    <button onClick={() => onPageChange(i)} aria-current={currentPage === i ? 'page' : undefined}>{i}</button>
                </li>
            );
        }

        if (totalPages > 10) {
            // Display ellipsis if totalPages is greater than 10
            if (startPage > 1) {
                pageNumbers.unshift(
                    <li key="left-ellipsis">
                        <span>...</span>
                    </li>
                );
            }
            if (endPage < totalPages) {
                pageNumbers.push(
                    <li key="right-ellipsis">
                        <span>...</span>
                    </li>
                );
            }
        }

        return pageNumbers;
    };

    return (
        <nav className='py-4'>
            <ul className="flex gap-4">
                <li>
                    <button
                        className='text-gray-400'
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(1)}
                        aria-label="First Page"
                    >
                        {'<<'}
                    </button>
                </li>
                <li>
                    <button
                        className='text-gray-400'
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                        aria-label="Previous Page"
                    >
                        {'<'}
                    </button>
                </li>
                {renderPageNumbers()}
                <li>
                    <button
                        className='text-gray-400'
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                        aria-label="Next Page"
                    >
                        {'>'}
                    </button>
                </li>
                <li>
                    <button
                        className='text-gray-400'
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange(totalPages)}
                        aria-label="Last Page"
                    >
                        {'>>'}
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
