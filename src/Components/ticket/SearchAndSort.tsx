import React, { useState, useEffect } from 'react';
import ticketAPI from 'src/apis/ticket.api';
import { toast } from 'react-toastify';

interface SearchAndSortProps {
  onSearch: (name: string, type: string) => void;
}

const SearchAndSort: React.FC<SearchAndSortProps> = ({ onSearch }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ticketAPI.getCategory();
        setCategories(response.data.data);
      } catch (err) {
        console.error('Failed to fetch categories', err);
        toast.error('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  const handleApply = () => {
    setIsLoading(true);
    try {
      onSearch(searchTitle, selectedCategory);
    } catch (error) {
      toast.error('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="search-input" className="block text-gray-700 mb-2 font-medium">
          Search Title
        </label>
        <input
          id="search-input"
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          placeholder="Enter ticket title..."
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
        />
        
      </div>

      <div>
        <label htmlFor="category-select" className="block text-gray-700 mb-2 font-medium">
          Category
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
        >
          
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleApply}
        disabled={isLoading}
        className="w-full bg-purple-600 text-white py-2 px-4 rounded-md 
                 hover:bg-purple-700 transition-colors duration-200
                 disabled:bg-purple-300 disabled:cursor-not-allowed
                 flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <span className="mr-2">Searching...</span>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </>
        ) : (
          'Apply Filter'
        )}
      </button>
    </div>
  );
};

export default SearchAndSort;