import { ChevronDownIcon } from '@primer/octicons-react';
import './selectFilter.scss';
type Props = React.ComponentProps<'select'> & {
  label: string;
  options: OptionsProps[];
};
interface OptionsProps {
  label: string;
  value: string;
}

export const SelectFilter = ({ label, options, ...props }: Props) => {
  return (
    <div className="select-filter">
      <label className="select-filter__label" htmlFor={props.id}>
        {label}
      </label>

      <select className="select-filter__select" {...props}>
        {options.map((option, index) => (
          <option key={option.value + index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDownIcon className="select-filter__icon" size={16} />
    </div>
  );
};
