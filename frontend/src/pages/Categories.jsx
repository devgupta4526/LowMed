import React, { useState } from 'react';

const categoriesData = [
  { name: 'Travel', count: 10 },
  { name: 'Technology', count: 7 },
  { name: 'Health', count: 5 },
  { name: 'Food', count: 8 },
  { name: 'Lifestyle', count: 6 },
];

const Categories = () => {
  const [filter, setFilter] = useState('');

  const filteredCategories = categoriesData.filter(category =>
    category.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className='mt-20'>
      <div className='container mx-auto px-5'>
        <h1 className='text-4xl font-bold my-5'>Categories</h1>
        <div className='flex justify-between items-center mb-8'>
          <p className='text-lg'>Explore blog posts by category.</p>
          <input
            type='text'
            placeholder='Search categories...'
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className='px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <div
                key={index}
                className='p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer'
              >
                <h3 className='text-2xl font-semibold'>{category.name}</h3>
                <p className='text-gray-500'>{category.count} Posts</p>
              </div>
            ))
          ) : (
            <p className='text-gray-500 col-span-full'>No categories found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
