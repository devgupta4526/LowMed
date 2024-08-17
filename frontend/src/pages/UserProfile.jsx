import React, { useState } from 'react';
import BlogCard from '../components/BlogCard';

const UserProfile = () => {
  const [savedBlogs, setSavedBlogs] = useState([
    {
      id: '1',
      title: 'Exploring the Beaches',
      author: 'devgupta4526',
      image: 'https://images.pexels.com/photos/3238764/pexels-photo-3238764.jpeg',
      excerpt: 'Discover the most serene beaches for your next holiday...',
    },
    {
      id: '2',
      title: 'The Charm of Old Towns',
      author: 'coder29',
      image: 'https://images.pexels.com/photos/26159384/pexels-photo-26159384/free-photo-of-a-window-with-a-flower-box-on-it.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      excerpt: 'Walk through the history of these beautiful old towns...',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    image: '',
    excerpt: '',
  });

  const handleAddBlog = () => {
    const newBlogWithId = { ...newBlog, id: Date.now().toString() };
    setSavedBlogs([...savedBlogs, newBlogWithId]);
    setIsModalOpen(false);
    setNewBlog({ title: '', author: '', image: '', excerpt: '' });
  };

  return (
    <div className='mt-20'>
      <div className='container mx-auto px-5'>
        <div className='bg-gray-50 p-8 rounded-lg shadow-lg'>
          <div className='flex items-center space-x-6 mb-8'>
            <img
              src='https://via.placeholder.com/150'
              alt='Profile'
              className='w-24 h-24 rounded-full shadow-md'
            />
            <div>
              <h1 className='text-4xl font-bold text-gray-800'>Dev Gupta</h1>
              <p className='text-gray-600'>devguptamsi@gmail.com</p>
              <p className='text-gray-700 mt-2'>
                Full-stack developer passionate about creating interactive and
                responsive web applications.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className='ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300'
            >
              Add Blog
            </button>
          </div>
          <div className='mt-10'>
            <h2 className='text-3xl font-semibold mb-6 text-gray-800'>
              Saved Blogs
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
              {savedBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  title={blog.title}
                  author={blog.author}
                  image={blog.image}
                  excerpt={blog.excerpt}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-8 rounded-lg shadow-lg w-1/3'>
            <h3 className='text-2xl font-semibold mb-4'>Add New Blog</h3>
            <input
              type='text'
              placeholder='Title'
              value={newBlog.title}
              onChange={(e) =>
                setNewBlog({ ...newBlog, title: e.target.value })
              }
              className='w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
              type='text'
              placeholder='Author'
              value={newBlog.author}
              onChange={(e) =>
                setNewBlog({ ...newBlog, author: e.target.value })
              }
              className='w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
              type='text'
              placeholder='Image URL'
              value={newBlog.image}
              onChange={(e) =>
                setNewBlog({ ...newBlog, image: e.target.value })
              }
              className='w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <textarea
              placeholder='Excerpt'
              value={newBlog.excerpt}
              onChange={(e) =>
                setNewBlog({ ...newBlog, excerpt: e.target.value })
              }
              className='w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <div className='flex justify-end'>
              <button
                onClick={handleAddBlog}
                className='px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-300'
              >
                Add
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className='ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition duration-300'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
