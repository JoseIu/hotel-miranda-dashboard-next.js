'use client';

import { authenticate } from '@/app/actions/auth/login';
import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import './loginForm.scss';

export const LoginForm = () => {
  const [errorMessage, formAction] = useActionState(authenticate, undefined);
  const [formData, setFormData] = useState({ email: 'joselu@goole.com', password: '123456' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form action={formAction} className="login-form">
      <input type="hidden" name="csrfToken" />
      <div className="login-form__group">
        <label className="login-form__label" htmlFor="email">
          Email
        </label>
        <input
          className="login-form__input"
          name="email"
          value={formData.email}
          onChange={handleChange}
          id="email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="login-form__group">
        <label className="login-form__label" htmlFor="password">
          Password
        </label>
        <input
          className="login-form__input"
          name="password"
          value={formData.password}
          onChange={handleChange}
          id="password"
          type="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <AuthButton />
      {errorMessage && (
        <>
          <p className="text-sm text-red-500">{errorMessage}</p>
        </>
      )}
    </form>
  );
};

export const AuthButton = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="auth-btn" disabled={pending} aria-disabled={pending}>
      {pending ? 'Loading...' : 'Sign In'}
    </button>
  );
};
