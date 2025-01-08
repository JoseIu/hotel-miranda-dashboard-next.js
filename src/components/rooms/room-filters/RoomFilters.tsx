'use client';
import { PlusIcon } from '@primer/octicons-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import './roomFilters.scss';

export const RoomFilters = () => {
  const route = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const currentFilter = searchParams.get('filter') || '';
  const [filterStatus, setFilter] = useState<string>(currentFilter);

  const generatePageUrl = (filter: string) => {
    const params = new URLSearchParams(searchParams);

    if (filter) params.set('filter', filter);
    else params.delete('filter');

    return `${pathName}?${params.toString()}`;
  };

  const onFilterChange = (filter: string) => {
    setFilter(filter);
    route.replace(generatePageUrl(filter));
  };
  return (
    <div className="room-filters">
      <div className="room-filters__buttons">
        <button
          className={`room-filters__button ${filterStatus === '' && 'room-filter'}`}
          onClick={() => onFilterChange('')}
        >
          All rooms
        </button>
        <button
          className={`room-filters__button ${filterStatus === 'status' && 'room-filter'}`}
          onClick={() => onFilterChange('status')}
        >
          Status
        </button>
        <button
          className={`room-filters__button ${filterStatus === 'price' && 'room-filter'}`}
          onClick={() => onFilterChange('price')}
        >
          Price
        </button>
      </div>

      <Link className="room-filters__add" href={'/rooms/new'}>
        New room
        <PlusIcon className="room-filters__icon" size={20} />
      </Link>
    </div>
  );
};
