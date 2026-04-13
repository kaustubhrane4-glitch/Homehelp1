import { ReactNode } from "react";
import { motion } from "motion/react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  fullWidth = true,
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-bold transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-linear-to-br from-green-600 to-emerald-600 text-white shadow-md hover:shadow-lg active:scale-95",
    outline: "border-2 border-green-600 text-green-600 hover:bg-green-50 active:scale-95",
    danger: "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 active:scale-95",
    ghost: "bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-6 py-4 text-base",
  };

  const widthClass = fullWidth ? "w-full" : "w-auto";

  return (
    <motion.button
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
    >
      {children}
    </motion.button>
  );
}
