import { useState } from 'react';

export default function useLoadMore(page, totalPages) {
    const [currentPage, setCurrentPage] = useState(1)

    const loadMore = () => {
        if (page < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    return { currentPage, loadMore }
}
