'use client';

import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Icons } from '@/components/ui/Icon';
import { LatencyBadge } from '@/components/ui/LatencyBadge';
import { FavoriteButton } from '@/components/favorites/FavoriteButton';
import { Video } from '@/lib/types';
import { parseVideoTitle } from '@/lib/utils/video';
import type { ResolutionInfo } from '@/lib/hooks/useResolutionProbe';

interface VideoCardProps {
    video: Video;
    videoUrl: string;
    cardId: string;
    isActive: boolean;
    onCardClick: (e: React.MouseEvent, cardId: string, videoUrl: string) => void;
    isPremium?: boolean;
    latencies?: Record<string, number>;
    resolution?: ResolutionInfo | null;
    isProbing?: boolean;
}

export const VideoCard = memo<VideoCardProps>(({
    video, videoUrl, cardId, isActive, onCardClick,
    isPremium = false, latencies = {}, resolution, isProbing = false,
}) => {
    const displayLatency = latencies[video.source] ?? video.latency;
    const { cleanTitle } = parseVideoTitle(video.vod_name);

    return (
        <div
            className="relative"
            style={{ zIndex: 1 }}
            onMouseEnter={(e) => (e.currentTarget.style.zIndex = '100')}
            onMouseLeave={(e) => (e.currentTarget.style.zIndex = '1')}
        >
            <Link
                href={videoUrl}
                onClick={(e) => onCardClick(e, cardId, videoUrl)}
                role="listitem"
                aria-label={`${video.vod_name}${video.vod_remarks ? ` - ${video.vod_remarks}` : ''}`}
                prefetch={false}
                data-focusable
                className="group block h-full"
            >
                <Card
                    className="p-0 flex flex-col h-full bg-[var(--bg-color)]/50 backdrop-blur-none saturate-100 shadow-[var(--shadow-sm)] border-[var(--glass-border)] hover:shadow-[var(--shadow-lg)] hover:translate-y-[-3px] transition-all duration-[0.3s] [transition-timing-function:cubic-bezier(0.22,0.68,0,1)]"
                    hover={false}
                    blur={false}
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    {/* Poster */}
                    <div className="relative aspect-[2/3] bg-[color-mix(in_srgb,var(--glass-bg)_50%,transparent)] rounded-t-[var(--radius-2xl)] overflow-hidden">
                        {video.vod_pic ? (
                            <Image
                                src={video.vod_pic}
                                alt={video.vod_name}
                                fill
                                className="object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 16vw"
                                loading="eager"
                                unoptimized
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).style.opacity = '0';
                                }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Icons.Film size={56} className="text-[var(--text-color-secondary)] opacity-30" />
                            </div>
                        )}

                        {/* Fallback Icon */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center -z-10 gap-2">
                            <Icons.Film size={40} className="text-[var(--text-color-secondary)] opacity-30" />
                            <span className="text-[10px] text-[var(--text-color-secondary)] opacity-50 px-3 text-center line-clamp-2">{video.vod_name}</span>
                        </div>

                        {/* Bottom gradient overlay */}
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                        {/* Top badges row */}
                        <div className="absolute top-2 left-2 right-2 z-10 flex items-start justify-between gap-1">
                            <div className="flex items-center gap-1 min-w-0 flex-wrap">
                                {video.sourceName && (
                                    <Badge variant="primary" className="flex-shrink-0 max-w-[60%] truncate text-[9px]">
                                        {video.sourceName}
                                    </Badge>
                                )}
                                {video.type_name && (
                                    <Badge variant="secondary" className="flex-shrink-0 max-w-[45%] truncate text-[9px] bg-black/40 border-white/10 text-white/90">
                                        {video.type_name}
                                    </Badge>
                                )}
                            </div>
                            {displayLatency !== undefined && (
                                <LatencyBadge latency={displayLatency} className="flex-shrink-0" />
                            )}
                        </div>

                        {/* Favorite Button */}
                        <div className={`absolute top-9 right-2 z-20 transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                            <FavoriteButton
                                videoId={video.vod_id} source={video.source}
                                title={video.vod_name} poster={video.vod_pic}
                                sourceName={video.sourceName} type={video.type_name}
                                year={video.vod_year} remarks={video.vod_remarks}
                                size={16} className="shadow-lg" isPremium={isPremium}
                            />
                        </div>

                        {/* Hover overlay */}
                        <div
                            className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-250 ${isActive ? 'opacity-100 lg:opacity-0 lg:group-hover:opacity-100' : 'opacity-0 lg:group-hover:opacity-100'}`}
                        >
                            <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1">
                                {isActive && (
                                    <div className="lg:hidden text-white/90 text-[11px] font-medium">
                                        再次点击播放 →
                                    </div>
                                )}
                                {video.vod_year && (
                                    <div className="flex items-center gap-1.5 text-white/80 text-[11px]">
                                        <Icons.Calendar size={11} />
                                        <span>{video.vod_year}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="px-3 py-2.5 flex-1 flex flex-col gap-1">
                        <h4 className="font-semibold text-[13px] text-[var(--text-color)] line-clamp-2 min-h-[2.25rem] leading-[1.3] tracking-[-0.01em]">
                            {cleanTitle}
                        </h4>
                        <div className="flex items-center gap-1.5 flex-wrap mt-auto">
                            {resolution ? (
                                <span className={`inline-flex items-center px-1.5 py-0.5 rounded-[var(--radius-xs)] text-[9px] font-bold text-white ${resolution.color}`}>
                                    {resolution.label}
                                </span>
                            ) : isProbing ? (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded-[var(--radius-xs)] text-[9px] font-bold text-white/40 bg-gray-500/40 animate-pulse">
                                    ...
                                </span>
                            ) : null}
                            {video.vod_lang && (
                                <span className="text-[11px] text-[var(--text-color-secondary)]">
                                    {video.vod_lang}
                                </span>
                            )}
                        </div>
                    </div>
                </Card>
            </Link>
        </div>
    );
});

VideoCard.displayName = 'VideoCard';
