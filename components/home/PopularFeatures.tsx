/**
 * PopularFeatures - Main component for popular movies section
 * Displays Douban movie recommendations with tag filtering and infinite scroll.
 * Includes personalized "为你推荐" tag when user has 2+ watched items.
 */

'use client';

import { useState, useEffect } from 'react';
import { TagManager } from './TagManager';
import { MovieGrid } from './MovieGrid';
import { useTagManager } from './hooks/useTagManager';
import { usePopularMovies } from './hooks/usePopularMovies';
import { usePersonalizedRecommendations } from './hooks/usePersonalizedRecommendations';

interface PopularFeaturesProps {
  onSearch?: (query: string) => void;
}

export function PopularFeatures({ onSearch }: PopularFeaturesProps) {
  const {
    tags,
    selectedTag,
    contentType,
    newTagInput,
    showTagManager,
    justAddedTag,
    setContentType,
    setSelectedTag,
    setNewTagInput,
    setShowTagManager,
    setJustAddedTag,
    handleAddTag,
    handleDeleteTag,
    handleRestoreDefaults,
    handleDragEnd,
    isLoadingTags,
  } = useTagManager();

  const {
    movies: recommendMovies,
    loading: recommendLoading,
    hasMore: recommendHasMore,
    hasHistory,
    prefetchRef: recommendPrefetchRef,
    loadMoreRef: recommendLoadMoreRef,
  } = usePersonalizedRecommendations(false);

  // Track whether the recommendation tab is active
  const [isRecommendSelected, setIsRecommendSelected] = useState(hasHistory);

  // Sync selection when hasHistory changes after Zustand hydration from localStorage.
  // On first render the store is empty (hasHistory=false), so useState captures false.
  // Once hydration completes and hasHistory becomes true, auto-select the recommendation tab.
  useEffect(() => {
    if (hasHistory) {
      setIsRecommendSelected(true);
    }
  }, [hasHistory]);

  const effectiveRecommendSelected = hasHistory && isRecommendSelected;

  const {
    movies,
    loading,
    hasMore,
    prefetchRef,
    loadMoreRef,
  } = usePopularMovies(
    effectiveRecommendSelected ? '' : selectedTag,
    tags,
    contentType
  );

  const handleMovieClick = (movie: any) => {
    if (onSearch) {
      onSearch(movie.title);
    }
  };

  const handleRecommendSelect = () => {
    setIsRecommendSelected(true);
  };

  const handleRegularTagSelect = (tagId: string) => {
    if (tagId === 'custom_高级' || tags.find(t => t.id === tagId)?.label === '高级') {
      window.location.href = '/premium';
      return;
    }
    setIsRecommendSelected(false);
    setSelectedTag(tagId);
  };

  return (
    <div className="animate-fade-in">
      {/* Content Type Toggle */}
      {!effectiveRecommendSelected && (
        <div className="mb-8 flex justify-center">
          <div className="relative w-72 sm:w-80 p-1 bg-[var(--glass-bg)] backdrop-blur-[20px] saturate-[180%] [-webkit-backdrop-filter:blur(20px)_saturate(180%)] border border-[var(--glass-border)] rounded-[var(--radius-full)] grid grid-cols-2 shadow-[var(--shadow-sm)] overflow-hidden">
            <div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[var(--accent-color)] rounded-[calc(var(--radius-full)-4px)] transition-transform duration-[0.35s] [transition-timing-function:cubic-bezier(0.22,0.68,0,1)] shadow-[0_2px_12px_color-mix(in_srgb,var(--accent-color)_35%,transparent)]"
              style={{
                transform: `translateX(${contentType === 'movie' ? '4px' : 'calc(100% + 4px)'})`,
              }}
            />
            <button
              onClick={() => setContentType('movie')}
              className={`relative z-10 py-2.5 text-sm font-semibold transition-colors duration-200 cursor-pointer flex justify-center items-center select-none ${contentType === 'movie' ? 'text-white' : 'text-[var(--text-color-secondary)] hover:text-[var(--text-color)]'}`}
            >
              电影
            </button>
            <button
              onClick={() => setContentType('tv')}
              className={`relative z-10 py-2.5 text-sm font-semibold transition-colors duration-200 cursor-pointer flex justify-center items-center select-none ${contentType === 'tv' ? 'text-white' : 'text-[var(--text-color-secondary)] hover:text-[var(--text-color)]'}`}
            >
              电视剧
            </button>
          </div>
        </div>
      )}

      <TagManager
        tags={tags}
        selectedTag={effectiveRecommendSelected ? '' : selectedTag}
        showTagManager={showTagManager}
        newTagInput={newTagInput}
        justAddedTag={justAddedTag}
        onTagSelect={handleRegularTagSelect}
        onTagDelete={handleDeleteTag}
        onToggleManager={() => setShowTagManager(!showTagManager)}
        onRestoreDefaults={handleRestoreDefaults}
        onNewTagInputChange={setNewTagInput}
        onAddTag={handleAddTag}
        onDragEnd={handleDragEnd}
        onJustAddedTagHandled={() => setJustAddedTag(false)}
        isLoadingTags={isLoadingTags}
        recommendTag={hasHistory ? {
          label: '为你推荐',
          isSelected: effectiveRecommendSelected,
          onSelect: handleRecommendSelect,
        } : undefined}
      />

      {effectiveRecommendSelected ? (
        <MovieGrid
          movies={recommendMovies}
          loading={recommendLoading}
          hasMore={recommendHasMore}
          onMovieClick={handleMovieClick}
          prefetchRef={recommendPrefetchRef}
          loadMoreRef={recommendLoadMoreRef}
        />
      ) : (
        <MovieGrid
          movies={movies}
          loading={loading}
          hasMore={hasMore}
          onMovieClick={handleMovieClick}
          prefetchRef={prefetchRef}
          loadMoreRef={loadMoreRef}
        />
      )}
    </div>
  );
}
