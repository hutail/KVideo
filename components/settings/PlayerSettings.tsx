'use client';

import { Icons } from '@/components/ui/Icon';
import type { ProxyMode } from '@/lib/store/settings-store';
import { DanmakuSettings } from './DanmakuSettings';

interface PlayerSettingsProps {
    fullscreenType: 'auto' | 'native' | 'window';
    onFullscreenTypeChange: (type: 'auto' | 'native' | 'window') => void;
    proxyMode: ProxyMode;
    onProxyModeChange: (mode: ProxyMode) => void;
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

const activeBtn = 'bg-[var(--accent-color)] border-[var(--accent-color)] text-white shadow-[0_2px_12px_color-mix(in_srgb,var(--accent-color)_35%,transparent)]';
const inactiveBtn = 'bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--text-color)] hover:bg-[color-mix(in_srgb,var(--accent-color)_8%,transparent)] hover:border-[color-mix(in_srgb,var(--accent-color)_20%,var(--glass-border))]';
const btnBase = 'px-4 py-3 rounded-[var(--radius-2xl)] border text-left font-medium transition-all duration-200 cursor-pointer';

export function PlayerSettings(props: PlayerSettingsProps) {
    const { fullscreenType, onFullscreenTypeChange, proxyMode, onProxyModeChange } = props;

    return (
        <div className="bg-[var(--glass-bg)] backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] border border-[var(--glass-border)] rounded-[var(--radius-2xl)] shadow-[var(--shadow-sm)] p-5 sm:p-6 mb-5">
            <h2 className="text-lg font-bold text-[var(--text-color)] mb-4 tracking-[-0.02em]">播放器设置</h2>

            <div className="space-y-5">
                {/* Fullscreen Mode */}
                <div>
                    <h3 className="font-medium text-sm text-[var(--text-color)] mb-1.5 inline-flex items-center gap-2">
                        <Icons.Maximize size={16} className="text-[var(--accent-color)]" />
                        默认全屏方式
                    </h3>
                    <p className="text-xs text-[var(--text-color-secondary)] mb-3">选择在桌面端点击播放器全屏按钮时的行为</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <button onClick={() => onFullscreenTypeChange('native')} className={`${btnBase} ${fullscreenType === 'native' ? activeBtn : inactiveBtn}`}>
                            <div className="font-semibold text-sm">系统全屏</div>
                            <div className="text-xs opacity-75 mt-0.5">进入浏览器原生全屏状态</div>
                        </button>
                        <button onClick={() => onFullscreenTypeChange('window')} className={`${btnBase} ${fullscreenType === 'window' ? activeBtn : inactiveBtn}`}>
                            <div className="font-semibold text-sm">网页全屏</div>
                            <div className="text-xs opacity-75 mt-0.5">播放器填满当前浏览器窗口</div>
                        </button>
                    </div>
                </div>

                <div className="border-t border-[var(--glass-border)]" />

                {/* Proxy Mode */}
                <div>
                    <h3 className="font-medium text-sm text-[var(--text-color)] mb-1.5 inline-flex items-center gap-2">
                        <Icons.Globe size={16} className="text-[var(--accent-color)]" />
                        代理播放模式
                    </h3>
                    <p className="text-xs text-[var(--text-color-secondary)] mb-3">控制视频播放时的网络请求策略</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {(['retry', 'none', 'always'] as ProxyMode[]).map((mode) => {
                            const labels: Record<ProxyMode, [string, string]> = {
                                retry: ['智能重试 (推荐)', '直连优先，失败时尝试代理'],
                                none: ['仅直连', '不使用代理，失败则报错'],
                                always: ['总是代理', '所有请求都通过代理转发'],
                            };
                            return (
                                <button key={mode} onClick={() => onProxyModeChange(mode)} className={`${btnBase} ${proxyMode === mode ? activeBtn : inactiveBtn}`}>
                                    <div className="font-semibold text-sm">{labels[mode][0]}</div>
                                    <div className="text-xs opacity-75 mt-0.5">{labels[mode][1]}</div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="border-t border-[var(--glass-border)]" />

                {/* Danmaku Settings */}
                <DanmakuSettings
                    danmakuApiUrl={props.danmakuApiUrl}
                    onDanmakuApiUrlChange={props.onDanmakuApiUrlChange}
                    danmakuOpacity={props.danmakuOpacity}
                    onDanmakuOpacityChange={props.onDanmakuOpacityChange}
                    danmakuFontSize={props.danmakuFontSize}
                    onDanmakuFontSizeChange={props.onDanmakuFontSizeChange}
                    danmakuDisplayArea={props.danmakuDisplayArea}
                    onDanmakuDisplayAreaChange={props.onDanmakuDisplayAreaChange}
                    showDanmakuApi={props.showDanmakuApi}
                />
            </div>
        </div>
    );
}
