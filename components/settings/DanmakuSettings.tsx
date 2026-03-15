'use client';

import { Icons } from '@/components/ui/Icon';

interface DanmakuSettingsProps {
    danmakuApiUrl: string;
    onDanmakuApiUrlChange: (url: string) => void;
    danmakuOpacity: number;
    onDanmakuOpacityChange: (value: number) => void;
    danmakuFontSize: number;
    onDanmakuFontSizeChange: (value: number) => void;
    danmakuDisplayArea: number;
    onDanmakuDisplayAreaChange: (value: number) => void;
    showDanmakuApi?: boolean;
}

const FONT_SIZES = [14, 18, 20, 24, 28];
const DISPLAY_AREAS = [
    { value: 0.25, label: '1/4屏' },
    { value: 0.5, label: '半屏' },
    { value: 0.75, label: '3/4屏' },
    { value: 1.0, label: '全屏' },
];

const pillActive = 'bg-[var(--accent-color)] border-[var(--accent-color)] text-white shadow-[0_2px_8px_color-mix(in_srgb,var(--accent-color)_30%,transparent)]';
const pillInactive = 'bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--text-color)] hover:bg-[color-mix(in_srgb,var(--accent-color)_8%,transparent)]';

export function DanmakuSettings({
    danmakuApiUrl, onDanmakuApiUrlChange,
    danmakuOpacity, onDanmakuOpacityChange,
    danmakuFontSize, onDanmakuFontSizeChange,
    danmakuDisplayArea, onDanmakuDisplayAreaChange,
    showDanmakuApi = true,
}: DanmakuSettingsProps) {
    return (
        <div>
            <h3 className="font-medium text-sm text-[var(--text-color)] mb-1.5 inline-flex items-center gap-2">
                <Icons.Danmaku size={16} className="text-[var(--accent-color)]" />
                弹幕设置
            </h3>
            <p className="text-xs text-[var(--text-color-secondary)] mb-3">
                配置弹幕聚合 API 地址，在播放器菜单中开关弹幕
            </p>

            <div className="space-y-4">
                {showDanmakuApi && (
                    <div>
                        <label className="block text-xs font-medium text-[var(--text-color)] mb-1.5">API 地址</label>
                        <input
                            type="text"
                            placeholder="https://your-danmu-api.example.com"
                            value={danmakuApiUrl}
                            onChange={(e) => onDanmakuApiUrlChange(e.target.value)}
                            className="w-full px-4 py-2.5 bg-[var(--glass-bg)] backdrop-blur-[8px] [-webkit-backdrop-filter:blur(8px)] border border-[var(--glass-border)] rounded-[var(--radius-2xl)] text-[var(--text-color)] placeholder:text-[var(--text-color-secondary)]/40 focus:outline-none focus:border-[var(--accent-color)] focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent-color)_15%,transparent)] transition-all duration-200 text-sm"
                        />
                        <p className="text-[11px] text-[var(--text-color-secondary)] mt-1.5">
                            兼容 <a href="https://github.com/huangxd-/danmu_api" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-color)] hover:underline">danmu_api</a> 格式的弹幕聚合服务
                        </p>
                    </div>
                )}

                {/* Opacity Slider */}
                <div>
                    <label className="block text-xs font-medium text-[var(--text-color)] mb-2">
                        弹幕透明度：{Math.round(danmakuOpacity * 100)}%
                    </label>
                    <div className="relative w-full h-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-[var(--radius-full)] overflow-hidden">
                        <div
                            className="absolute inset-y-0 left-0 bg-[var(--accent-color)] rounded-[var(--radius-full)] transition-[width] duration-100"
                            style={{ width: `${danmakuOpacity * 100}%` }}
                        />
                    </div>
                    <input
                        type="range"
                        min="10"
                        max="100"
                        value={Math.round(danmakuOpacity * 100)}
                        onChange={(e) => onDanmakuOpacityChange(parseInt(e.target.value) / 100)}
                        className="w-full accent-[var(--accent-color)] h-2 opacity-0 absolute mt-[-10px] cursor-pointer"
                    />
                </div>

                {/* Font Size */}
                <div>
                    <label className="block text-xs font-medium text-[var(--text-color)] mb-2">弹幕字号</label>
                    <div className="flex gap-2 flex-wrap">
                        {FONT_SIZES.map((size) => (
                            <button
                                key={size}
                                onClick={() => onDanmakuFontSizeChange(size)}
                                className={`px-3 py-1.5 rounded-[var(--radius-full)] border text-xs font-semibold transition-all duration-200 cursor-pointer ${danmakuFontSize === size ? pillActive : pillInactive}`}
                            >
                                {size}px
                            </button>
                        ))}
                    </div>
                </div>

                {/* Display Area */}
                <div>
                    <label className="block text-xs font-medium text-[var(--text-color)] mb-2">弹幕显示区域</label>
                    <div className="flex gap-2 flex-wrap">
                        {DISPLAY_AREAS.map(({ value, label }) => (
                            <button
                                key={value}
                                onClick={() => onDanmakuDisplayAreaChange(value)}
                                className={`px-3 py-1.5 rounded-[var(--radius-full)] border text-xs font-semibold transition-all duration-200 cursor-pointer ${danmakuDisplayArea === value ? pillActive : pillInactive}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
