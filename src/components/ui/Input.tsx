import React from 'react';
import { Field, FieldProps } from 'formik';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  touched?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, name, error, touched, disabled, ...props }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <input
            {...field}
            {...props}
            disabled={disabled}
            className={clsx(
              'block w-full px-3 py-2 rounded-md shadow-sm transition-colors duration-200',
              'border focus:outline-none focus:ring-2 focus:ring-offset-2',
              disabled
                ? 'bg-gray-50 border-gray-200'
                : 'border-gray-300 focus:border-[#E67E03] focus:ring-[#E67E03]/20',
              error && touched ? 'border-red-500' : '',
              'placeholder-gray-400'
            )}
          />
        )}
      </Field>
      {error && touched && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};