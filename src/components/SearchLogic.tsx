import { useEffect } from 'react';
import type { Software } from '../types/software';
import type { SearchType } from './SearchForm';

interface SearchLogicProps {
  query: string;
  searchType: SearchType;
  category: string;
  selectedTags: string[];
}

export function SearchLogic({ query, searchType, category, selectedTags }: SearchLogicProps) {
  useEffect(() => {
    const applySearch = () => {
      const cards = document.querySelectorAll<HTMLElement>('[data-software-card]');
      let visibleCount = 0;

      cards.forEach((card) => {
        const softwareDataStr = card.getAttribute('data-software');
        if (!softwareDataStr) return;
        
        try {
          const software: Software = JSON.parse(softwareDataStr);
          let isMatch = true;

          // カテゴリーフィルター
          if (category !== 'all' && software.category !== category) {
            isMatch = false;
          }

          // タグフィルター
          if (selectedTags.length > 0 && !selectedTags.every(tag => software.tags.includes(tag))) {
            isMatch = false;
          }

          // テキスト検索
          if (query) {
            const searchText = query.toLowerCase().trim();
            const matchText = (() => {
              switch (searchType) {
                case 'name':
                  return software.name.toLowerCase().includes(searchText);
                case 'description':
                  return software.description.toLowerCase().includes(searchText);
                case 'category':
                  return software.category.toLowerCase().includes(searchText);
                case 'tags':
                  return software.tags.some(tag => tag.toLowerCase().includes(searchText));
                case 'all':
                default:
                  return (
                    software.name.toLowerCase().includes(searchText) ||
                    software.description.toLowerCase().includes(searchText) ||
                    software.category.toLowerCase().includes(searchText) ||
                    software.tags.some(tag => tag.toLowerCase().includes(searchText))
                  );
              }
            })();
            isMatch = isMatch && matchText;
          }

          card.classList.toggle('hidden', !isMatch);
          if (isMatch) visibleCount++;
        } catch (error) {
          console.error('Error processing card:', error);
        }
      });

      const noResultsEl = document.getElementById('no-results');
      if (noResultsEl) {
        noResultsEl.classList.toggle('hidden', visibleCount > 0);
      }

      // デバッグ情報
      console.log('Search executed:', {
        query,
        searchType,
        category,
        selectedTags,
        visibleCount,
        totalCards: cards.length
      });
    };

    // 検索を実行
    applySearch();

    // DOMの更新が完了したことを確認するために、次のフレームで再度実行
    requestAnimationFrame(applySearch);
  }, [query, searchType, category, selectedTags]);

  return null;
}