'use client';

import { type SearchDisplayMode, type LocaleOption } from '@/lib/store/settings-store';
import { Switch } from '@/components/ui/Switch';

interface DisplaySettingsProps {
    realtimeLatency: boolean;
    searchDisplayMode: SearchDisplayMode;
    rememberScrollPosition: boolean;
    locale: LocaleOption;
    onRealtimeLatencyChange: (enabled: boolean) => void;
    onSearchDisplayModeChange: (mode: SearchDisplayMode) => void;
    onRememberScrollPositionChange: (enabled: boolean) => void;
    onLocaleChange: (locale: LocaleOption) => void;
}

const activeBtn = 'bg-[var(--accent-color)] border-[var(--accent-color)] text-white shadow-[0_2px_12px_color-mix(in_srgb,var(--accent-color)_35%,transparent)]';
const inactiveBtn = 'bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--text-color)] hover:bg-[color-mix(in_srgb,var(--accent-color)_8%,transparent)] hover:border-[color-mix(in_srgb,var(--accent-color)_20%,var(--glass-border))]';
const btnBase = 'px-4 py-3 rounded-[var(--radius-2xl)] border text-left font-medium transition-all duration-200 cursor-pointer';

export function DisplaySettings({
    realtimeLatency, searchDisplayMode, rememberScrollPosition, locale,
    onRealtimeLatencyChange, onSearchDisplayModeChange, onRememberScrollPositionChange, onLocaleChange,
}: DisplaySettingsProps) {
    return (
        <div className="bg-[var(--glass-bg)] backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] border border-[var(--glass-border)] rounded-[var(--radius-2xl)] shadow-[var(--shadow-sm)] p-5 sm:p-6 mb-5">
            <h2 className="text-lg font-bold text-[var(--text-color)] mb-4 tracking-[-0.02em]">显示设置</h2>

            {/* Toggle settings */}
            <div className="space-y-4 mb-5">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h3 className="font-medium text-sm text-[var(--text-color)]">记住滚动位置</h3>
                        <p className="text-xs text-[var(--text-color-secondary)] mt-0.5">退出或刷新页面后，自动恢复到之前的滚动位置</p>
                    </div>
                    <Switch checked={rememberScrollPosition} onChange={onRememberScrollPositionChange} ariaLabel="记住滚动位置开关" />
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h3 className="font-medium text-sm text-[var(--text-color)]">实时延迟显示</h3>
                        <p className="text-xs text-[var(--text-color-secondary)] mt-0.5">开启后，搜索结果中的延迟数值会每 5 秒更新一次</p>
                    </div>
                    <Switch checked={realtimeLatency} onChange={onRealtimeLatencyChange} ariaLabel="实时延迟显示开关" />
                </div>
            </div>

            <div className="border-t border-[var(--glass-border)] mb-5" />

            {/* Search Display Mode */}
            <div className="mb-5">
                <h3 className="font-medium text-sm text-[var(--text-color)] mb-1.5">搜索结果显示方式</h3>
                <p className="text-xs text-[var(--text-color-secondary)] mb-3">选择搜索结果的展示模式</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button onClick={() => onSearchDisplayModeChange('normal')} className={`${btnBase} ${searchDisplayMode === 'normal' ? activeBtn : inactiveBtn}`}>
                        <div className="font-semibold text-sm">默认显示</div>
                        <div className="text-xs opacity-75 mt-0.5">每个源的结果单独显示</div>
                    </button>
                    <button onClick={() => onSearchDisplayModeChange('grouped')} className={`${btnBase} ${searchDisplayMode === 'grouped' ? activeBtn : inactiveBtn}`}>
                        <div className="font-semibold text-sm">合并同名源</div>
                        <div className="text-xs opacity-75 mt-0.5">相同名称的视频合并为一个卡片</div>
                    </button>
                </div>
            </div>

            <div className="border-t border-[var(--glass-border)] mb-5" />

            {/* Locale */}
            <div>
                <h3 className="font-medium text-sm text-[var(--text-color)] mb-1.5">界面语言</h3>
                <p className="text-xs text-[var(--text-color-secondary)] mb-3">切换界面显示的中文字体</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button onClick={() => onLocaleChange('zh-CN')} className={`${btnBase} ${locale === 'zh-CN' ? activeBtn : inactiveBtn}`}>
                        <div className="font-semibold text-sm">简体中文</div>
                        <div className="text-xs opacity-75 mt-0.5">使用简体中文显示界面</div>
                    </button>
                    <button onClick={() => onLocaleChange('zh-TW')} className={`${btnBase} ${locale === 'zh-TW' ? activeBtn : inactiveBtn}`}>
                        <div className="font-semibold text-sm">繁體中文</div>
                        <div className="text-xs opacity-75 mt-0.5">使用繁體中文顯示界面</div>
                    </button>
                </div>
            </div>
        </div>
    );
}
