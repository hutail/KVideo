'use client';

import React, { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}, ref) => {
  const baseStyles = `
    inline-flex items-center justify-center
    font-semibold
    rounded-[var(--radius-2xl)]
    transition-all duration-200
    disabled:opacity-40 disabled:cursor-not-allowed
    disabled:transform-none disabled:shadow-none
    min-h-[44px] touch-manipulation cursor-pointer
    select-none
  `;

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 md:px-5 md:py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 md:px-8 md:py-3.5 text-base gap-2.5',
  };

  const variants = {
    primary: `
      bg-[var(--accent-color)]
      text-white
      border-none
      shadow-[0_2px_8px_color-mix(in_srgb,var(--accent-color)_30%,transparent)]
      hover:bg-[var(--accent-hover,var(--accent-color))]
      hover:translate-y-[-1px]
      hover:shadow-[0_4px_16px_color-mix(in_srgb,var(--accent-color)_40%,transparent)]
      active:translate-y-0 active:scale-[0.97]
    `,
    secondary: `
      bg-[var(--glass-bg)]
      backdrop-blur-[20px] saturate-[180%]
      [-webkit-backdrop-filter:blur(20px)_saturate(180%)]
      border border-[var(--glass-border)]
      text-[var(--text-color)]
      shadow-[var(--shadow-sm)]
      hover:shadow-[var(--shadow-md)]
      hover:border-[color-mix(in_srgb,var(--accent-color)_20%,var(--glass-border))]
      active:scale-[0.97]
    `,
    ghost: `
      bg-transparent
      text-[var(--text-color)]
      hover:bg-[color-mix(in_srgb,var(--text-color)_8%,transparent)]
      active:scale-[0.97]
    `,
  };

  return (
    <button
      ref={ref}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
