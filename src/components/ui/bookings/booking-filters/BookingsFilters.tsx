'use client';
import { InputSearchBar } from '@/components/ui/search-bar/InputSearchBar';
import { SelectFilter } from '@/components/ui/select-filter/SelectFilter';
import { sortBookings } from '@/constants/sortBookings';
import { BookingStatus } from '@/interfaces';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import './bookingsFilters.scss';
export const BookingsFilters = () => {
  const route = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search') || '';
  const currestStatus = searchParams.get('status') || '';
  const currentSort = searchParams.get('sort') || sortBookings[1].value;
  const [filterStatus, setFilterStatus] = useState<BookingStatus | ''>(currestStatus as BookingStatus);

  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  const generatePageUrl = (search: string, status: BookingStatus | '', sort: string) => {
    const params = new URLSearchParams(searchParams);
    if (search) params.set('search', search);
    else params.delete('search');
    if (status) params.set('status', status);
    else params.delete('status');
    if (sort) params.set('sort', sort);
    else params.delete('sort');

    return `${pathName}?${params.toString()}`;
  };
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      route.replace(generatePageUrl(inputValue, filterStatus, currentSort));
    }, 300);
  };
  const onFilterChange = (status: BookingStatus | '') => {
    setFilterStatus(status);
    route.replace(generatePageUrl(currentSearch, status, currentSort));
  };
  const onSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;

    console.log({ sort });
    route.replace(generatePageUrl(currentSearch, filterStatus, sort));
  };

  return (
    <div className="bookings-filters">
      <div className="bookings-filters__types">
        <button
          className={`bookings-filters__type ${filterStatus === '' && 'bookings-filters__type--active'}`}
          onClick={() => onFilterChange('')}
        >
          All bookings
        </button>
        <button
          className={`bookings-filters__type ${filterStatus === 'CHECK_IN' && 'bookings-filters__type--active'}`}
          onClick={() => onFilterChange('CHECK_IN')}
        >
          Checking in{' '}
        </button>
        <button
          className={`bookings-filters__type ${filterStatus === 'CHECK_OUT' && 'bookings-filters__type--active'}`}
          onClick={() => onFilterChange('CHECK_OUT')}
        >
          Checking out
        </button>
        <button
          className={`bookings-filters__type ${filterStatus === 'In_PROGRESS' && 'bookings-filters__type--active'}`}
          onClick={() => onFilterChange('In_PROGRESS')}
        >
          In progress
        </button>
      </div>

      <InputSearchBar
        label="Search Bookings"
        placeholder="search a quest.."
        id="search-booking"
        defaultValue={currentSearch}
        onChange={onSearch}
      />

      <SelectFilter
        value={currentSort}
        // defaultValue={sortBookings[1].value}
        label="Sort by"
        options={sortBookings}
        onChange={onSortChange}
      />
    </div>
  );
};
