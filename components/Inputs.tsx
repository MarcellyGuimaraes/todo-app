import React from 'react'

type Props = {
    onChange: (param: any) => void;
    placeholder: string;
    value?: string;
};
function Input({ onChange, placeholder, value = "" }: Props) {
    return (
        <input
            required
            className="mb-3 w-full bg-gray-100 py-2 text-center outline-none"
            onChange={onChange}
            placeholder={placeholder}
            value={value}
        />
    );
}

export default Input;