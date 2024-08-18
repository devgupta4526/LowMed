import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import axios from 'axios';

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/blogs/post/'); // Adjusted endpoint
        setBlogPosts(response.data.data || []); // Ensure blogPosts is always an array
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setError(error); // Set error state
      } finally {
        setLoading(false);
      }
    };
    

    fetchBlogPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner/loader if needed
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display error message
  }

  if (blogPosts.length === 0) {
    return <div>No blog posts available.</div>;
  }

  return (
    <div className='my-20 bg-white flex flex-col justify-center items-center'>
      <h3 className='text-3xl font-semibold my-14'>Latest Blog Posts</h3>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 bg-20'>
        {blogPosts.map((post) => (
          <BlogCard
            key={post._id}
            id={post._id}
            title={post.title}
            author={post.author.username} // Assuming author name is populated
            image={post.image}
            excerpt={post.content.substring(0, 100)} // Show the first 100 characters as an excerpt
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
