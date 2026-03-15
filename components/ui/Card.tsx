import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  blur?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function Card({ children, className = '', hover = true, blur = true, onClick, style }: CardProps) {
  const hoverStyles = hover
    ? "hover:translate-y-[-3px] hover:shadow-[var(--shadow-lg)] hover:z-10 cursor-pointer"
    : "";

  const blurClasses = blur
    ? "bg-[var(--glass-bg)] backdrop-blur-[20px] saturate-[180%] [-webkit-backdrop-filter:blur(20px)_saturate(180%)]"
    : "bg-[var(--bg-color)]/90";

  const baseClasses = `
    ${blurClasses}
    rounded-[var(--radius-2xl)]
    shadow-[var(--shadow-md)]
    border
    border-[var(--glass-border)]
    p-4 md:p-6
    relative
    transition-all duration-[0.35s] [transition-timing-function:cubic-bezier(0.22,0.68,0,1)]
    ${hoverStyles}
    ${className}
  `;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClasses} text-left w-full`}
        style={style}
      >
        {children}
      </button>
    );
  }

  return (
    <div className={baseClasses} style={style}>
      {children}
    </div>
  );
}
