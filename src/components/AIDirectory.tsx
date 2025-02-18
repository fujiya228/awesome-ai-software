import { useState, useCallback } from 'react';
import { SearchForm } from './SearchForm';
import { SoftwareCard } from './SoftwareCard';
import type { SearchType } from './SearchForm';
import type { Software } from '../types/software';
import { aiSoftware } from '../data/software';

// Get unique list of categories and tags
const categories = [...new Set(aiSoftware.map(software => software.category))];
const tags = [...new Set(aiSoftware.flatMap(software => software.tags))];

interface SearchState {
  query: string;
  searchType: SearchType;
  category: string;
  selectedTags: string[];
}

export function AIDirectory() {
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

  const filteredSoftware = aiSoftware.filter(filterSoftware);

  return (
    <main className="container mx-auto px-4 py-8 relative min-h-screen">
      {/* Background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full filter blur-[120px] animate-pulse delay-700"></div>
      </div>

      {/* Title section */}
      <div className="relative z-10 text-center mb-12">
        <h1 className="text-5xl font-bold mb-2">
          <span className="neon-text relative inline-block">
            Awesome AI Software
            <span className="absolute -inset-1 bg-blue-500/20 blur-lg rounded-full"></span>
          </span>
        </h1>
        <p className="text-blue-200/70 text-lg max-w-2xl mx-auto mt-4 animate-float">
          Explore the latest AI software
        </p>
      </div>

      {/* Search form */}
      <div className="relative z-10 mb-12 neon-glow animate-float">
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

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {filteredSoftware.map((software) => (
          <div key={software.id} className="transform transition-all duration-300 hover:scale-[1.02]">
            <SoftwareCard software={software} />
          </div>
        ))}
      </div>

      {/* No search results display */}
      {filteredSoftware.length === 0 && (
        <div className="text-center mt-12 relative z-10">
          <p className="text-lg text-blue-200/70 neon-text">
            No search results found
          </p>
        </div>
      )}
    </main>
  );
}