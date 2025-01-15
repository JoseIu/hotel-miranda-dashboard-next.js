'use client';
import { ChevronLeftIcon, ChevronRightIcon } from '@primer/octicons-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

type Props = {
  totalPages: number;
};

export const Pagination = ({ totalPages }: Props) => {
  const pathName = usePathname();
  const serachParams = useSearchParams();
  const currentPage = Number(serachParams.get('page')) ?? 1;

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(serachParams);
    if (pageNumber === '...') {
      return `${pathName}?${params.toString()}`;
    }

    if (+pageNumber === 0) {
      return `${pathName}`;
    }
    if (+pageNumber > totalPages) {
      return `${pathName}?${params.toString()}`;
    }

    params.set('page', pageNumber.toString());
    return `${pathName}?${params.toString()}`;
  };
  return (
    <div>
      <ul>
        <li>
          <Link href={createPageUrl(currentPage - 1)}>
            <ChevronLeftIcon size={30} />
          </Link>
        </li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>
          <Link href={createPageUrl(currentPage + 1)}>
            <ChevronRightIcon size={30} />
          </Link>
        </li>
      </ul>
    </div>
  );
};
