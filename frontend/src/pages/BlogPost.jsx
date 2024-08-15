import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams();

  // Fetch the blog post data based on the id
  // For now, let's use a placeholder

  const blogPost = {
    title: "Exploring the Beaches",
    author: "devgupta4526",
    content: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Quisque at erat eu lacus bibendum tincidunt. Nulla ac bibendum orci.
      Praesent ut lacinia magna. Duis tristique consectetur erat, non condimentum nisi aliquet ut.
      `,
    image: "https://images.pexels.com/photos/3238764/pexels-photo-3238764.jpeg"
  };

  return (
   <div className='mt-20'>
     <div className='container mx-auto px-5'>
      <h1 className='text-4xl font-bold my-5'>{blogPost.title}</h1>
      <p className='text-sm text-gray-500'>By {blogPost.author}</p>
      <img
        src={blogPost.image}
        alt={blogPost.title}
        className='w-full h-auto my-5 rounded-lg'
      />
      <p className='text-lg'>{blogPost.content}</p>
    </div>
   </div>
  );
};

export default BlogPost;
