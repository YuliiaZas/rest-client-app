import { useState } from 'react';

export const InputMock = {
  Input: ({
    id,
    placeholder,
    defaultValue = '',
    onValueChange,
  }: {
    id: string;
    placeholder: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
  }) => {
    const [inputValue, setInputValue] = useState(defaultValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onValueChange?.(e.target.value);
    };

    return (
      <input
        id={id}
        name={id}
        placeholder={`${placeholder}`}
        defaultValue={inputValue}
        onChange={handleChange}
      />
    );
  },
};

export const InputWithVariablesMock = {
  InputWithVariables: ({
    placeholder,
    value = '',
    onValueChange,
  }: {
    placeholder: string;
    value?: string;
    onValueChange?: (value: string) => void;
  }) => {
    const [inputValue, setInputValue] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onValueChange?.(e.target.value);
    };

    return (
      <input
        placeholder={`${placeholder}`}
        value={inputValue}
        onChange={handleChange}
      />
    );
  },
};
