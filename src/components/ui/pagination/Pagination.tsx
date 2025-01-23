'use client';
import { ChevronLeftIcon, ChevronRightIcon } from '@primer/octicons-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { generatePaginationNumbers } from './generatePaginationNumbers';
import './pagination.scss';

type Props = {
  totalPages: number;
};

export const Pagination = ({ totalPages }: Props) => {
  const pathName = usePathname();
  const serachParams = useSearchParams();
  const currentPage = Number(serachParams.get('page')) || 1;

  const allPages = generatePaginationNumbers({ currentPage, totalPages });

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(serachParams);
    if (pageNumber === '...') {
      return `${pathName}?${params.toString()}`;
    }

    if (+pageNumber <= 0) {
      return `${pathName}`;
    }
    if (+pageNumber > totalPages) {
      return `${pathName}?${params.toString()}`;
    }

    params.set('page', pageNumber.toString());
    return `${pathName}?${params.toString()}`;
  };
  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li>
          <Link href={createPageUrl(currentPage - 1)}>
            <ChevronLeftIcon size={20} />
          </Link>
        </li>

        {allPages.map((page, index) => (
          <li key={page + '-' + index} className="pagination__list-item">
            <Link
              className={`pagination__list-link ${currentPage === page && 'pagination__list-link--active'}`}
              href={createPageUrl(page)}
            >
              {page}
            </Link>
          </li>
        ))}

        <li>
          <Link href={createPageUrl(currentPage + 1)}>
            <ChevronRightIcon size={20} />
          </Link>
        </li>
      </ul>
    </div>
  );
};
