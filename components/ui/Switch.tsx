'use client';

import React from 'react';

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    ariaLabel?: string;
    className?: string;
    disabled?: boolean;
}

export function Switch({
    checked,
    onChange,
    ariaLabel,
    className = "",
    disabled = false,
}: SwitchProps) {
    return (
        <label
            className={`
                relative inline-flex items-center cursor-pointer
                h-[28px] w-[48px] shrink-0
                ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
                ${className}
            `}
        >
            <input
                type="checkbox"
                className="sr-only peer"
                checked={checked}
                onChange={(e) => !disabled && onChange(e.target.checked)}
                aria-label={ariaLabel}
                disabled={disabled}
            />
            <div
                className={`
                    w-full h-full rounded-[var(--radius-full)]
                    bg-[color-mix(in_srgb,var(--text-color)_15%,transparent)]
                    peer-checked:bg-[var(--accent-color)]
                    transition-[background-color,box-shadow] duration-[0.35s]
                    [transition-timing-function:cubic-bezier(0.22,0.68,0,1)]
                    peer-checked:shadow-[0_0_8px_color-mix(in_srgb,var(--accent-color)_30%,transparent)]
                    before:content-[''] before:absolute
                    before:h-[22px] before:w-[22px]
                    before:left-[3px] before:top-[3px]
                    before:bg-white before:rounded-[var(--radius-full)]
                    before:transition-[transform,width] before:duration-[0.35s]
                    before:[transition-timing-function:cubic-bezier(0.22,0.68,0,1)]
                    before:shadow-[0_1px_4px_rgba(0,0,0,0.15)]
                    peer-checked:before:translate-x-[20px]
                    active:before:w-[26px]
                    peer-checked:active:before:translate-x-[16px]
                `}
            />
        </label>
    );
}
