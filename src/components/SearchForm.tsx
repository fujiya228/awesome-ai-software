import { Input } from "./ui/input";
import { useState, useCallback, useRef, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";

interface SearchFormProps {
  onSearch: (query: string, searchType: SearchType, category: string, selectedTags: string[]) => void;
  categories: string[];
  tags: string[];
}

export type SearchType = "all" | "name" | "description" | "category" | "tags";

export function SearchForm({ onSearch, categories, tags }: SearchFormProps) {
  const [filters, setFilters] = useState({
    query: "",
    searchType: "all" as SearchType,
    category: "all",
    selectedTags: [] as string[]
  });

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = form.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update the position of the gradient
      form.style.setProperty('--mouse-x', `${x}px`);
      form.style.setProperty('--mouse-y', `${y}px`);
    };

    form.addEventListener('mousemove', handleMouseMove);
    return () => form.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleFilterChange = useCallback((key: keyof typeof filters, value: any) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      onSearch(
        newFilters.query,
        newFilters.searchType,
        newFilters.category,
        newFilters.selectedTags
      );
      return newFilters;
    });
  }, [onSearch]);

  const toggleTag = useCallback((tag: string) => {
    setFilters(prev => {
      const newTags = prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag];
      
      onSearch(prev.query, prev.searchType, prev.category, newTags);
      return { ...prev, selectedTags: newTags };
    });
  }, [onSearch]);

  return (
    <div 
      ref={formRef}
      className="relative max-w-3xl mx-auto space-y-4 p-6 rounded-lg bg-black/20 backdrop-blur-md border border-blue-500/10 group"
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      } as React.CSSProperties}
    >
      {/* グラデーショングロー効果 */}
      <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500/20 via-blue-500/10 to-purple-500/20 opacity-0 group-hover:opacity-100 blur transition duration-500" />
      
      <div className="relative z-10 flex gap-4 flex-wrap md:flex-nowrap">
        <Input
          type="search"
          placeholder="Search..."
          value={filters.query}
          onChange={(e) => handleFilterChange('query', e.target.value)}
          className="w-full min-w-[200px] bg-black/30 border-blue-500/20 text-blue-100 placeholder:text-blue-200/50 focus:border-blue-400/50 focus:ring-blue-400/20 transition-all duration-300"
        />
        <Select
          value={filters.searchType}
          onValueChange={(value: SearchType) => handleFilterChange('searchType', value)}
        >
          <SelectTrigger className="w-[180px] bg-black/30 border-blue-500/20 text-blue-100 hover:border-blue-400/50 transition-colors">
            <SelectValue placeholder="Search Type" />
          </SelectTrigger>
          <SelectContent className="bg-black/90 border-blue-500/20">
            <SelectItem value="all" className="text-blue-100">All</SelectItem>
            <SelectItem value="name" className="text-blue-100">Name</SelectItem>
            <SelectItem value="description" className="text-blue-100">Description</SelectItem>
            <SelectItem value="category" className="text-blue-100">Category</SelectItem>
            <SelectItem value="tags" className="text-blue-100">Tags</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filters.category}
          onValueChange={(value) => handleFilterChange('category', value)}
        >
          <SelectTrigger className="w-[180px] bg-black/30 border-blue-500/20 text-blue-100 hover:border-blue-400/50 transition-colors">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-black/90 border-blue-500/20">
            <SelectItem value="all" className="text-blue-100">All</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category} className="text-blue-100">
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="relative z-10 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant={filters.selectedTags.includes(tag) ? "default" : "outline"}
            className={`cursor-pointer transition-all duration-300 ${
              filters.selectedTags.includes(tag)
                ? 'bg-blue-500/30 text-blue-100 border-blue-400/50 hover:bg-blue-500/40'
                : 'border-blue-400/20 text-blue-200/70 hover:border-blue-400/50 hover:text-blue-100'
            }`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}