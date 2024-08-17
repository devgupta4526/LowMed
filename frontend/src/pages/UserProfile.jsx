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

  const [yourBlogs, setYourBlogs] = useState([
    {
      id: '3',
      title: 'The Beauty of Mountains',
      author: 'devgupta4526',
      image: 'https://images.pexels.com/photos/67523/pexels-photo-67523.jpeg',
      excerpt: 'Explore the majestic beauty of the mountains...',
    },
    {
      id: '4',
      title: 'Urban Adventures',
      author: 'devgupta4526',
      image: 'https://images.pexels.com/photos/2824502/pexels-photo-2824502.jpeg',
      excerpt: 'Discover the excitement of city life and urban adventures...',
    },
  ]);

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    image: '',
    excerpt: '',
  });

  const [userDetails, setUserDetails] = useState({
    username: 'Dev Gupta',
    email: 'devguptamsi@gmail.com',
    bio: 'Full-stack developer passionate about creating interactive and responsive web applications.',
  });

  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);

  const handleAddBlog = (e) => {
    e.preventDefault();
    const newBlogWithId = { ...newBlog, id: Date.now().toString() };
    setYourBlogs([...yourBlogs, newBlogWithId]);
    setNewBlog({ title: '', author: '', image: '', excerpt: '' });
  };

  const handleUpdateDetails = (e) => {
    e.preventDefault();
    // Handle the update details logic here
    setIsUpdateFormVisible(false);
  };

  const handleLogout = () => {
    // Logic to handle user logout
    // For example, clearing tokens and redirecting to the login page
    console.log('User logged out');
  };

  return (
    <div className='mt-20'>
      <div className='container mx-auto px-5'>
        {/* User Info */}
        <div className='bg-black p-10 rounded-lg shadow-lg text-white mb-10'>
          <div className='flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6'>
            <img
              src='https://via.placeholder.com/100'
              alt='Profile'
              className='w-24 h-24 rounded-full ring-4 ring-white'
            />
            <div className='flex-grow'>
              <h1 className='text-4xl font-bold'>{userDetails.username}</h1>
              <p className='text-gray-400'>{userDetails.email}</p>
              <p className='mt-2 text-gray-300'>{userDetails.bio}</p>
            </div>
          </div>
          <button
            onClick={() => setIsUpdateFormVisible(!isUpdateFormVisible)}
            className='mt-6 px-6 py-3 bg-white text-black rounded-md shadow-lg hover:bg-gray-200 transition duration-300'
          >
            {isUpdateFormVisible ? 'Close Form' : 'Update User Details'}
          </button>
          <button
            onClick={handleLogout}
            className='mx-3 mt-4 px-6 py-3 bg-red-600 text-white rounded-md shadow-lg hover:bg-red-700 transition duration-300'
          >
            Logout
          </button>
        </div>

        {/* Update User Details Form */}
        {isUpdateFormVisible && (
          <div className='bg-gray-100 p-8 rounded-lg shadow-lg mb-10'>
            <h3 className='text-2xl font-bold mb-4 text-black'>Update User Details</h3>
            <form onSubmit={handleUpdateDetails}>
              <div className='grid grid-cols-1 gap-4'>
                <input
                  type='text'
                  placeholder='Username'
                  value={userDetails.username}
                  onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                  required
                />
                <input
                  type='email'
                  placeholder='Email'
                  value={userDetails.email}
                  onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                  required
                />
                <textarea
                  placeholder='Bio'
                  value={userDetails.bio}
                  onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                  rows='4'
                  required
                />
              </div>
              <div className='flex justify-end mt-6'>
                <button
                  type='submit'
                  className='px-6 py-3 bg-black text-white rounded-md shadow-lg hover:bg-gray-700 transition duration-300'
                >
                  Update Details
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Saved Blogs */}
        <div className='mt-10'>
          <h2 className='text-3xl font-bold mb-6 text-black'>Saved Blogs</h2>
          <div className='flex overflow-x-scroll space-x-6 py-4'>
            {savedBlogs.map((blog) => (
              <div key={blog.id} className='min-w-[300px] w-[300px] flex-shrink-0'>
                <BlogCard
                  id={blog.id}
                  title={blog.title}
                  author={blog.author}
                  image={blog.image}
                  excerpt={blog.excerpt}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Your Blogs */}
        <div className='mt-10'>
          <h2 className='text-3xl font-bold mb-6 text-black'>Your Blogs</h2>
          <div className='flex overflow-x-scroll space-x-6 py-4'>
            {yourBlogs.map((blog) => (
              <div key={blog.id} className='min-w-[300px] w-[300px] flex-shrink-0'>
                <BlogCard
                  id={blog.id}
                  title={blog.title}
                  author={blog.author}
                  image={blog.image}
                  excerpt={blog.excerpt}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Add Blog Form */}
        <div className='mt-10 bg-gray-100 p-8 rounded-lg shadow-lg'>
          <h3 className='text-2xl font-bold mb-4 text-black'>Add New Blog</h3>
          <form onSubmit={handleAddBlog}>
            <div className='grid grid-cols-1 gap-4'>
              <input
                type='text'
                placeholder='Title'
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                required
              />
              <input
                type='text'
                placeholder='Author'
                value={newBlog.author}
                onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                required
              />
              <input
                type='text'
                placeholder='Image URL'
                value={newBlog.image}
                onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                required
              />
              <textarea
                placeholder='Excerpt'
                value={newBlog.excerpt}
                onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                rows='4'
                required
              />
            </div>
            <div className='flex justify-end mt-6'>
              <button
                type='submit'
                className='px-6 py-3 bg-black text-white rounded-md shadow-lg hover:bg-gray-700 transition duration-300'
              >
                Add Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
