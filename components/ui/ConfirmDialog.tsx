'use client';

import { useEffect, useRef } from 'react';
import { Button } from './Button';
import { Card } from './Card';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  dangerous?: boolean;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = '确认',
  cancelText = '取消',
  variant = 'warning',
  dangerous = false,
}: ConfirmDialogProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      cancelButtonRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCancel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const variantStyles = {
    danger: 'bg-red-500 hover:bg-red-600 shadow-[0_2px_8px_rgba(239,68,68,0.3)]',
    warning: 'bg-[var(--accent-color)] hover:bg-[var(--accent-hover,var(--accent-color))]',
    info: 'bg-blue-500 hover:bg-blue-600 shadow-[0_2px_8px_rgba(59,130,246,0.3)]',
  };

  const finalVariant = dangerous ? 'danger' : variant;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] animate-fade-in"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        className="fixed top-1/2 left-1/2 z-[9999] w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 animate-scale-in"
      >
        <Card hover={false} className="p-6 md:p-8">
          <h2
            id="dialog-title"
            className="text-lg font-bold text-[var(--text-color)] mb-2 tracking-[-0.02em]"
          >
            {title}
          </h2>
          <p
            id="dialog-description"
            className="text-[var(--text-color-secondary)] mb-6 leading-relaxed text-sm"
          >
            {message}
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              ref={cancelButtonRef}
              variant="secondary"
              onClick={onCancel}
              className="min-w-[90px]"
            >
              {cancelText}
            </Button>
            <Button
              onClick={onConfirm}
              className={`min-w-[90px] ${variantStyles[finalVariant]}`}
            >
              {confirmText}
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
