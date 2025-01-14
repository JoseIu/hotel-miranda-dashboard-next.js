'use client';
import { InputSearchBar } from '@/components/ui/search-bar/InputSearchBar';
import { PlusIcon } from '@primer/octicons-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import './usersFilter.scss';
export const UsersFilter = () => {
  const route = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search') || '';
  const currestStatus = searchParams.get('status') || '';

  const [filterStatus, setFilterStatus] = useState<string>(currestStatus);

  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  const generatePageUrl = (search: string, status: string) => {
    const params = new URLSearchParams(searchParams);
    if (search) params.set('search', search);
    else params.delete('search');
    if (status) params.set('status', status);
    else params.delete('status');

    return `${pathName}?${params.toString()}`;
  };
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      route.replace(generatePageUrl(inputValue, filterStatus));
    }, 300);
  };
  const onFilterChange = (status: string) => {
    setFilterStatus(status);
    route.replace(generatePageUrl(currentSearch, status));
  };

  return (
    <div className="users-filters">
      <div className="users-filters__types">
        <button
          className={`users-filters__type ${filterStatus === '' && 'users-filters__type--active'}`}
          onClick={() => onFilterChange('')}
        >
          All users
        </button>
        <button
          className={`users-filters__type ${filterStatus === 'active' && 'users-filters__type--active'}`}
          onClick={() => onFilterChange('active')}
        >
          Active
        </button>
        <button
          className={`users-filters__type ${filterStatus === 'inactive' && 'users-filters__type--active'}`}
          onClick={() => onFilterChange('inactive')}
        >
          Inactive
        </button>
      </div>

      <InputSearchBar
        label="Search Bookings"
        placeholder="search a quest.."
        id="search-booking"
        defaultValue={currentSearch}
        onChange={onSearch}
      />

      <Link className="user-add" href="/users/new">
        Add user <PlusIcon className="user-add__icon" size={20} />
      </Link>
    </div>
  );
};
