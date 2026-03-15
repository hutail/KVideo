import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[var(--text-color)] mb-2 tracking-[-0.01em]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 md:px-5 md:py-3.5
            text-base
            bg-[var(--glass-bg)]
            backdrop-blur-[12px] saturate-[160%]
            [-webkit-backdrop-filter:blur(12px)_saturate(160%)]
            border border-[var(--glass-border)]
            rounded-[var(--radius-2xl)]
            text-[var(--text-color)]
            placeholder:text-[var(--text-color-secondary)]/60
            focus:outline-none
            focus:border-[var(--accent-color)]
            focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent-color)_18%,transparent),var(--shadow-md)]
            transition-all duration-[0.35s]
            [transition-timing-function:cubic-bezier(0.22,0.68,0,1)]
            touch-manipulation
            ${error ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-400 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
