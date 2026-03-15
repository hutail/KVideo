'use client';

import { useState, useEffect, useRef } from 'react';
import { useFavorites } from '@/lib/store/favorites-store';
import { WatchHistorySidebar } from '@/components/history/WatchHistorySidebar';
import { Icons } from '@/components/ui/Icon';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { FavoritesHeader } from './FavoritesHeader';
import { FavoritesList } from './FavoritesList';
import { FavoritesFooter } from './FavoritesFooter';
import { trapFocus } from '@/lib/accessibility/focus-management';

export function FavoritesSidebar({ isPremium = false }: { isPremium?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<{
        isOpen: boolean;
        videoId?: string;
        source?: string;
        isClearAll?: boolean;
    }>({ isOpen: false });
    const { favorites, removeFavorite, clearFavorites } = useFavorites(isPremium);
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

    const handleDeleteItem = (videoId: string | number, source: string) => {
        setDeleteConfirm({ isOpen: true, videoId: String(videoId), source });
    };

    const handleClearAll = () => {
        setDeleteConfirm({ isOpen: true, isClearAll: true });
    };

    const confirmDelete = () => {
        if (deleteConfirm.isClearAll) clearFavorites();
        else if (deleteConfirm.videoId && deleteConfirm.source) removeFavorite(deleteConfirm.videoId, deleteConfirm.source);
        setDeleteConfirm({ isOpen: false });
    };

    return (
        <>
            {/* Toggle Button - Left side */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 flex items-center justify-center bg-[var(--glass-bg)] backdrop-blur-[12px] saturate-[160%] [-webkit-backdrop-filter:blur(12px)_saturate(160%)] border border-[var(--glass-border)] rounded-[var(--radius-full)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] hover:scale-110 transition-all duration-200 cursor-pointer"
                aria-label="打开收藏夹"
            >
                <Icons.Heart size={20} className="text-[var(--text-color-secondary)]" />
            </button>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[1999] bg-black/40 backdrop-blur-[6px] [-webkit-backdrop-filter:blur(6px)] opacity-0 animate-[fadeIn_0.2s_ease-out_forwards]"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar - Left side */}
            <aside
                ref={sidebarRef}
                role="complementary"
                aria-labelledby="favorites-sidebar-title"
                aria-hidden={!isOpen}
                style={{
                    transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                    willChange: isOpen ? 'transform' : 'auto'
                }}
                className="fixed top-0 left-0 bottom-0 w-[85%] sm:w-[90%] max-w-[400px] z-[2000] bg-[var(--glass-bg)] backdrop-blur-[20px] saturate-[160%] [-webkit-backdrop-filter:blur(20px)_saturate(160%)] border-r border-[var(--glass-border)] rounded-r-[var(--radius-2xl)] p-5 sm:p-6 flex flex-col shadow-[var(--shadow-lg)] transition-transform duration-300 [transition-timing-function:cubic-bezier(0.22,0.68,0,1)]"
            >
                <FavoritesHeader onClose={() => setIsOpen(false)} />
                <FavoritesList favorites={favorites} onRemove={handleDeleteItem} isPremium={isPremium} />
                <FavoritesFooter hasFavorites={favorites.length > 0} onClearAll={handleClearAll} />
            </aside>

            <WatchHistorySidebar isPremium={isPremium} />

            <ConfirmDialog
                isOpen={deleteConfirm.isOpen}
                title={deleteConfirm.isClearAll ? '清空收藏夹' : '取消收藏'}
                message={deleteConfirm.isClearAll ? '确定要清空所有收藏吗？此操作无法撤销。' : '确定要取消收藏这个视频吗？'}
                onConfirm={confirmDelete}
                onCancel={() => setDeleteConfirm({ isOpen: false })}
                confirmText="确定"
                cancelText="取消"
                variant="danger"
            />
        </>
    );
}
