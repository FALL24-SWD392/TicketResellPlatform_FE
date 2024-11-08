import React, { useState, useEffect } from 'react';
import ticketAPI from 'src/apis/ticket.api'; // Adjust path as needed

const SearchAndSort: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ticketAPI.getCategory();
        setCategories(response.data.data);  // Assuming response.data contains the categories
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <label htmlFor='search-input' className='block text-gray-700 mb-2'>
        Search
      </label>
      <input
        id='search-input'
        type='text'
        placeholder='Search'
        className='w-full p-2 border border-gray-300 rounded-md mb-4'
      />
      <label htmlFor='category-select' className='block text-gray-700 mb-2'>
        Category
      </label>
      <select
        id='category-select'
        className='w-full p-2 border border-gray-300 rounded-md'
      >
        <option value=''>Select Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div className='flex justify-center mt-4'>
        <button className='w-[200px] bg-purple-600 text-white py-2 rounded-md border border-purple-700 hover:bg-[#e1e2eb]'>
          Apply
        </button>
      </div>
    </div>
  );
};

export default SearchAndSort;
