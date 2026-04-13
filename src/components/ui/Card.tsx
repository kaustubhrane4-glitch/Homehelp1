import { ReactNode } from "react";
import { motion } from "motion/react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  key?: any;
}

export function Card({ children, className = "", onClick }: CardProps) {
  return (
    <motion.div
      whileHover={onClick ? { y: -4 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`bg-white rounded-3xl border border-gray-100 shadow-xs p-5 ${
        onClick ? "cursor-pointer hover:shadow-lg transition-all" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
