import { useEffect, useState } from "react";

type InputType = {
  label: string;
  value: string;
  placeholder?: string;
};

const Input = ({ label, value, placeholder }: InputType) => {
  const labelLowerCase = label.toLowerCase();
  const [inputValue, setInputValue] = useState<string>(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div title={labelLowerCase} className="my-4 w-full">
      <label
        htmlFor={labelLowerCase}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}:
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type="text"
          name={labelLowerCase}
          id={labelLowerCase}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={placeholder ?? label}
        />
      </div>
    </div>
  );
};

export default Input;
