import { useState, useCallback } from 'react';
import { SearchForm } from './SearchForm';
import type { SearchType } from './SearchForm';
import { SoftwareCard } from './SoftwareCard';
import type { Software } from '../types/software';

interface SearchContainerProps {
  categories: string[];
  tags: string[];
  software: Software[];
}

interface SearchState {
  query: string;
  searchType: SearchType;
  category: string;
  selectedTags: string[];
}

export function SearchContainer({ categories, tags, software }: SearchContainerProps) {
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    searchType: 'all',
    category: 'all',
    selectedTags: []
  });

  const filterSoftware = useCallback((software: Software) => {
    const { query, searchType, category, selectedTags } = searchState;

    // Category filter
    if (category !== 'all' && software.category !== category) {
      return false;
    }

    // Tag filter
    if (selectedTags.length > 0 && !selectedTags.every(tag => software.tags.includes(tag))) {
      return false;
    }

    // Text search
    if (query) {
      const searchText = query.toLowerCase().trim();
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
    }

    return true;
  }, [searchState]);

  const filteredSoftware = software.filter(filterSoftware);

  return (
    <div>
      <div className="mb-8">
        <SearchForm
          categories={categories}
          tags={tags}
          onSearch={(query, searchType, category, selectedTags) => {
            setSearchState({
              query,
              searchType,
              category,
              selectedTags
            });
          }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSoftware.map((software) => (
          <SoftwareCard key={software.id} software={software} />
        ))}
      </div>
      {filteredSoftware.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-lg text-gray-500">検索結果が見つかりませんでした。</p>
        </div>
      )}
    </div>
  );
}
