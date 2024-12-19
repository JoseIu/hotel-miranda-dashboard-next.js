import { FieldError } from 'react-hook-form';
type Props = React.ComponentProps<'input'> & {
  label: string;
  error: FieldError | undefined;
  ref: React.Ref<HTMLInputElement>;
};

export const DatePicker = ({ label, error, ref, ...inputProps }: Props) => {
  const hasError = error && 'error';
  const hasErrorLabel = error && 'error-label';
  return (
    <div className="input-form">
      <label className={`input-form__label ${hasErrorLabel}`} htmlFor={inputProps.id}>
        {label}*
      </label>
      <div className={`input-form__container ${hasError}`}>
        <input
          className="input-form__input"
          ref={ref}
          type="date"
          {...inputProps}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>
      {error && <span className="input-form__error">{error.message}</span>}
    </div>
  );
};
