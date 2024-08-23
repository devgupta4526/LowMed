import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import axiosInstance from '../utils/axiosInstance';
import HeroSection from './HeroSection';

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axiosInstance.get(import.meta.env.VITE_API_URL + '/blogs/post/');
        const posts = response.data.data.reverse() || [];
        setBlogPosts(posts);
        setFilteredPosts(posts); // Initialize filteredPosts with all posts
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  useEffect(() => {
    // Filter blog posts based on search query
    const results = blogPosts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchQuery, blogPosts]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <HeroSection onSearch={handleSearch} />
      <div className='my-20 bg-white flex flex-col justify-center items-center'>
        <h3 className='text-3xl font-semibold my-14'>Latest Blog Posts</h3>
        {filteredPosts.length === 0 ? (
          <p className='text-lg text-gray-600'>No blog posts found.</p> // Display message when no posts are found
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 bg-20'>
            {filteredPosts.map((post) => (
              <BlogCard
                key={post._id}
                id={post._id}
                title={post.title}
                author={post.author.username}
                image={post.image}
                excerpt={post.content.substring(0, 50) + "...."}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
