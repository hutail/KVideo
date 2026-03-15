import React, { memo } from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const BadgeComponent = memo(function Badge({
  children,
  variant = 'primary',
  className = '',
  icon,
  iconPosition = 'left'
}: BadgeProps) {
  const variants = {
    primary: `
      bg-[var(--accent-color)]
      text-white
      shadow-[0_1px_4px_color-mix(in_srgb,var(--accent-color)_30%,transparent)]
    `,
    secondary: `
      bg-[var(--glass-bg)]
      backdrop-blur-[8px]
      [-webkit-backdrop-filter:blur(8px)]
      border border-[var(--glass-border)]
      text-[var(--text-color)]
    `,
  };

  const iconElement = icon && (
    <span
      className={`inline-flex items-center justify-center ${iconPosition === 'left' ? 'mr-1' : 'ml-1'}`}
      style={{ width: '0.875em', height: '0.875em' }}
    >
      {icon}
    </span>
  );

  return (
    <span
      className={`
        inline-flex items-center justify-center
        px-2 py-0.5
        rounded-[var(--radius-full)]
        text-[10px] font-bold tracking-[0.02em]
        leading-tight whitespace-nowrap
        ${variants[variant]}
        ${className}
      `}
    >
      {icon && iconPosition === 'left' && iconElement}
      {children}
      {icon && iconPosition === 'right' && iconElement}
    </span>
  );
});

export const Badge = BadgeComponent;
