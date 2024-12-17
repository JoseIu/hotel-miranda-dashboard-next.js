'use client';

import { SearchIcon } from '@primer/octicons-react';
import './searchBar.scss';

type Props = React.ComponentProps<'input'> & {
  label: string;
};

export const InputSearchBar = ({ label, ...props }: Props) => (
  <div className="search-bar">
    <label htmlFor={props.id} className="search-bar__label">
      {label}
    </label>
    <input type="search" className="search-bar__input" {...props} />

    <SearchIcon className="search-bar__icon" />
  </div>
);
