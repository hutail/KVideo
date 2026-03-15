'use client';

import { useState, useEffect, useRef } from 'react';
import { useHistory } from '@/lib/store/history-store';
import { Icons } from '@/components/ui/Icon';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { HistoryHeader } from './HistoryHeader';
import { HistoryList } from './HistoryList';
import { HistoryFooter } from './HistoryFooter';
import { trapFocus } from '@/lib/accessibility/focus-management';

export function WatchHistorySidebar({ isPremium = false }: { isPremium?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    showIdentifier?: string;
    isClearAll?: boolean;
  }>({ isOpen: false });
  const { viewingHistory, removeFromHistory, clearHistory } = useHistory(isPremium);
  const sidebarRef = useRef<HTMLElement>(null);
  const cleanupFocusTrapRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (isOpen && sidebarRef.current) {
      cleanupFocusTrapRef.current = trapFocus(sidebarRef.current);
    }
    return () => {
      if (cleanupFocusTrapRef.current) {
        cleanupFocusTrapRef.current();
        cleanupFocusTrapRef.current = null;
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleDeleteItem = (showIdentifier: string) => {
    setDeleteConfirm({ isOpen: true, showIdentifier });
  };

  const handleClearAll = () => {
    setDeleteConfirm({ isOpen: true, isClearAll: true });
  };

  const confirmDelete = () => {
    if (deleteConfirm.isClearAll) clearHistory();
    else if (deleteConfirm.showIdentifier) removeFromHistory(deleteConfirm.showIdentifier);
    setDeleteConfirm({ isOpen: false });
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 flex items-center justify-center bg-[var(--glass-bg)] backdrop-blur-[12px] saturate-[160%] [-webkit-backdrop-filter:blur(12px)_saturate(160%)] border border-[var(--glass-border)] rounded-[var(--radius-full)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] hover:scale-110 transition-all duration-200 cursor-pointer"
        aria-label="打开观看历史"
      >
        <Icons.History size={20} className="text-[var(--text-color-secondary)]" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[1999] bg-black/40 backdrop-blur-[6px] [-webkit-backdrop-filter:blur(6px)] opacity-0 animate-[fadeIn_0.2s_ease-out_forwards]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        role="complementary"
        aria-labelledby="history-sidebar-title"
        aria-hidden={!isOpen}
        style={{
          transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
          willChange: isOpen ? 'transform' : 'auto'
        }}
        className="fixed top-0 right-0 bottom-0 w-[85%] sm:w-[90%] max-w-[400px] z-[2000] bg-[var(--glass-bg)] backdrop-blur-[20px] saturate-[160%] [-webkit-backdrop-filter:blur(20px)_saturate(160%)] border-l border-[var(--glass-border)] rounded-l-[var(--radius-2xl)] p-5 sm:p-6 flex flex-col shadow-[var(--shadow-lg)] transition-transform duration-300 [transition-timing-function:cubic-bezier(0.22,0.68,0,1)]"
      >
        <HistoryHeader onClose={() => setIsOpen(false)} />
        <HistoryList history={viewingHistory} onRemove={handleDeleteItem} isPremium={isPremium} />
        <HistoryFooter hasHistory={viewingHistory.length > 0} onClearAll={handleClearAll} />
      </aside>

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title={deleteConfirm.isClearAll ? '清空历史记录' : '删除历史记录'}
        message={deleteConfirm.isClearAll ? '确定要清空所有观看历史吗？此操作无法撤销。' : '确定要删除这条历史记录吗？'}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false })}
        confirmText="删除"
        cancelText="取消"
        variant="danger"
      />
    </>
  );
}
