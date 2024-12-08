import React from 'react';
import { useField } from 'formik';
import ReactSelect, { StylesConfig } from 'react-select';
import clsx from 'clsx';

interface Option {
  value: string;
  label: string;
  sublabel?: string;
}

interface SelectProps {
  label: string;
  name: string;
  error?: string;
  touched?: boolean;
  options: Option[];
  disabled?: boolean;
  placeholder?: string;
}

const customStyles: StylesConfig<Option, false> = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#E67E03' : '#D1D5DB',
    boxShadow: state.isFocused ? '0 0 0 1px #E67E03' : provided.boxShadow,
    '&:hover': {
      borderColor: '#E67E03',
    },
    backgroundColor: state.isDisabled ? '#F9FAFB' : '#FFFFFF',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#E67E03' : state.isFocused ? '#FEF3C7' : 'transparent',
    color: state.isSelected ? 'white' : '#111827',
    cursor: 'pointer',
    ':active': {
      backgroundColor: '#E67E03',
      color: 'white',
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? '#6B7280' : '#111827',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#FEF3C7',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#111827',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#111827',
    ':hover': {
      backgroundColor: '#E67E03',
      color: 'white',
    },
  }),
};

const formatOptionLabel = ({ label, sublabel }: Option) => (
  <div>
    <div>{label}</div>
    {sublabel && <div className="text-sm text-gray-500">{sublabel}</div>}
  </div>
);

export const Select: React.FC<SelectProps> = ({
  label,
  name,
  error,
  touched,
  options,
  disabled,
  placeholder = 'Sélectionnez une option',
}) => {
  const [field, , helpers] = useField(name);

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <ReactSelect
        id={name}
        options={options}
        value={options.find(option => option.value === field.value) || null}
        onChange={(option) => helpers.setValue(option ? option.value : '')}
        onBlur={() => helpers.setTouched(true)}
        isDisabled={disabled}
        placeholder={placeholder}
        styles={customStyles}
        formatOptionLabel={formatOptionLabel}
        className={clsx(
          'rounded-md shadow-sm',
          error && touched ? 'border-red-500' : ''
        )}
      />
      {error && touched && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};