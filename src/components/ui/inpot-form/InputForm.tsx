import { AlertIcon } from '@primer/octicons-react';
import React from 'react';
import { FieldError } from 'react-hook-form';
import './formInput.scss';

type Props = React.ComponentProps<'input'> & {
  label: string;
  error: FieldError | undefined;
  ref: React.Ref<HTMLInputElement>;
};

export const InputForm = ({ label, error, ref, ...inputProps }: Props) => {
  const hasError = error && 'error';
  const hasErrorLabel = error && 'error-label';

  return (
    <div className="input-form">
      <label className={`input-form__label ${hasErrorLabel}`} htmlFor={inputProps.id}>
        {label}*
      </label>

      <div className={`input-form__container ${hasError}`}>
        <input className="input-form__input" ref={ref} type="text" autoComplete="off" {...inputProps} />
        {error && <AlertIcon className="input-form__icon" />}
      </div>

      {error && <span className="input-form__error">{error.message}</span>}
    </div>
  );
};
