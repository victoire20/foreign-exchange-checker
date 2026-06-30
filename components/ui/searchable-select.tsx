"use client";

import {useMemo, useState} from "react";

export interface SelectOption {
    value: string;
    label: string;
    [key: string]: any;
}

type SearchSelectProps<T extends SelectOption> = {
    options: T[];
    value?: string;
    placeholder?: string;
    searchPlaceholder?: string;
    onChange: (value: T) => void;
    renderOption?: (option: T) => React.ReactNode;
}

export default function SearchableSelect<T extends SelectOption>({
    options,
    value,
    placeholder = "Search...",
    searchPlaceholder = "Search...",
    onChange,
    renderOption
}: SearchSelectProps<T>) {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState("")

    const filteredOptions = useMemo(() => {
        return options.filter(option =>
            option.label
                .toLowerCase()
                .includes(query.toLowerCase())
        )
    }, [options, query])

    const selectedOption = options.find(
        option => option.value === value
    )

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full border p-3 rounded-lg"
            >
                {selectedOption?.label || placeholder}
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 w-full bg-black border rounded-lg p-2">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={placeholder}
                        className="w-full p-2 mb-2"
                    />

                    <div className="max-h-64 overflow-y-auto">
                        {filteredOptions.map(option => (
                            <button
                                key={option.value}
                                className="w-full text-left p-2"
                                onClick={() => {
                                    onChange(option)
                                    setIsOpen(false)
                                }}
                            >
                                {renderOption ? renderOption(option) : option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}