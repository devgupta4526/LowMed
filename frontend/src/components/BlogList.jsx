import React from 'react';
import BlogCard from './BlogCard';

const BlogList = () => {
  return (
    <div className='my-20 bg-white flex flex-col justify-center items-center'>
      <h3 className='text-3xl font-semibold my-14'>Latest Blog Posts</h3>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 bg-20'>
        <BlogCard
          id="1"
          title="Exploring the Beaches"
          author="devgupta4526"
          image="https://images.pexels.com/photos/3238764/pexels-photo-3238764.jpeg"
          excerpt="Discover the most serene beaches for your next holiday..."
        />
        <BlogCard
          id="2"
          title="The Charm of Old Towns"
          author="coder29"
          image="https://images.pexels.com/photos/26159384/pexels-photo-26159384/free-photo-of-a-window-with-a-flower-box-on-it.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          excerpt="Walk through the history of these beautiful old towns..."
        />
        {/* Add more BlogCards as needed */}
      </div>
    </div>
  );
};

export default BlogList;
