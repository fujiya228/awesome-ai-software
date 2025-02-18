import { useEffect } from 'react';
import type { Software } from '../types/software';
import type { SearchType } from './SearchForm';

interface SearchLogicProps {
  query: string;
  searchType: SearchType;
  category: string;
}

export function SearchLogic({ query, searchType, category }: SearchLogicProps) {
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

          // Category filter
          if (category !== 'all' && software.category !== category) {
            isMatch = false;
          }

          // Tag filter

          // Text search
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
                case 'all':
                default:
                  return (
                    software.name.toLowerCase().includes(searchText) ||
                    software.description.toLowerCase().includes(searchText) ||
                    software.category.toLowerCase().includes(searchText)
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

      // Debug information
      console.log('Search executed:', {
        query,
        searchType,
        category,
        visibleCount,
        totalCards: cards.length
      });
    };

    // Execute search
    applySearch();

    // Re-execute on the next frame to ensure DOM updates are complete
    requestAnimationFrame(applySearch);
  }, [query, searchType, category]);

  return null;
}
