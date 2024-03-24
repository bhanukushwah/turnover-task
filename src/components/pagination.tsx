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
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li key={i} className={i === currentPage ? 'active' : 'text-gray-400'}>
                    <button onClick={() => onPageChange(i)}>{i}</button>
                </li>
            );
        }
        return pageNumbers;
    };

    return (
        <div className='py-4'>
            <ul className="flex gap-4">
                <li>
                    <button
                        className='text-gray-400'
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(1)}
                    >
                        {'<<'}
                    </button>
                </li>
                <li>
                    <button
                        className='text-gray-400'
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
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
                    >
                        {'>'}
                    </button>
                </li>
                <li>
                    <button
                        className='text-gray-400'
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange(totalPages)}
                    >
                        {'>>'}
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
