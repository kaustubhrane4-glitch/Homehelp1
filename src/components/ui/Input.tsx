import { ReactNode } from "react";

interface InputProps {
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  hint?: string;
  className?: string;
}

export function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  required = false,
  hint,
  className = "",
}: InputProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-[10px] font-bold text-gray-500 mb-1.5 tracking-wider uppercase">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-hidden focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
      />
      {hint && <p className="text-[10px] text-gray-400 mt-1.5">{hint}</p>}
    </div>
  );
}
