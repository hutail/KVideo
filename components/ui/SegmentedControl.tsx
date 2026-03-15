'use client';

import { useRef, useEffect, useState } from 'react';

interface SegmentedControlProps<T extends string> {
    options: { label: string; value: T }[];
    value: T;
    onChange: (value: T) => void;
    className?: string;
}

export function SegmentedControl<T extends string>({
    options,
    value,
    onChange,
    className = '',
}: SegmentedControlProps<T>) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

    useEffect(() => {
        const updateIndicator = () => {
            if (!containerRef.current) return;
            const activeElement = containerRef.current.querySelector(
                `[data-value="${value}"]`
            ) as HTMLElement;

            if (activeElement) {
                setIndicatorStyle({
                    left: activeElement.offsetLeft,
                    width: activeElement.offsetWidth,
                });
            }
        };

        updateIndicator();
        window.addEventListener('resize', updateIndicator);
        return () => window.removeEventListener('resize', updateIndicator);
    }, [value, options]);

    return (
        <div
            ref={containerRef}
            className={`
                relative flex p-1
                bg-[var(--glass-bg)]
                backdrop-blur-[20px] saturate-[180%]
                [-webkit-backdrop-filter:blur(20px)_saturate(180%)]
                border border-[var(--glass-border)]
                rounded-[var(--radius-full)]
                shadow-[var(--shadow-sm)]
                ${className}
            `}
        >
            {/* Sliding Indicator */}
            <div
                className="absolute top-1 bottom-1 bg-[var(--accent-color)] rounded-[calc(var(--radius-full)-4px)] shadow-[0_2px_12px_color-mix(in_srgb,var(--accent-color)_35%,transparent)] transition-all duration-[0.35s] [transition-timing-function:cubic-bezier(0.22,0.68,0,1)]"
                style={{
                    left: `${indicatorStyle.left}px`,
                    width: `${indicatorStyle.width}px`,
                }}
            />

            {/* Segment Buttons */}
            {options.map((option) => (
                <button
                    key={option.value}
                    data-value={option.value}
                    onClick={() => onChange(option.value)}
                    className={`
                        relative z-10 flex-1 py-2 px-5
                        text-sm font-semibold tracking-[-0.01em]
                        transition-colors duration-200
                        cursor-pointer select-none
                        ${value === option.value
                            ? 'text-white'
                            : 'text-[var(--text-color-secondary)] hover:text-[var(--text-color)]'
                        }
                    `}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}
