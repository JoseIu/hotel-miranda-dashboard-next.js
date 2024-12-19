import { ChevronDownIcon } from '@primer/octicons-react';
import { FieldError } from 'react-hook-form';
import './selectForm.scss';
type Props = React.ComponentProps<'select'> & {
  label: string;
  options: OptionsProps[];
  error: FieldError | undefined;
  placeHolder?: string;
};
interface OptionsProps {
  label: string;
  value: string;
}

export const SelecForm = ({ label, options, error, placeHolder, ...props }: Props) => {
  const hasError = error && 'error';
  const hasErrorLabel = error && 'error-label';
  return (
    <div className="select-form">
      <label className={`select-form__label ${hasErrorLabel}`} htmlFor={props.id}>
        {label}*
      </label>

      <select className={`select-form__select ${hasError}`} {...props}>
        {placeHolder && <option value="">{placeHolder}</option>}
        {options.map((option, index) => (
          <option key={option.value + index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="input-form__error">{error.message}</span>}

      <ChevronDownIcon className="select-form__icon" size={16} />
    </div>
  );
};
