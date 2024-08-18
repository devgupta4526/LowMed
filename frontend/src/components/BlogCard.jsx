import React from 'react';
import { Link } from 'react-router-dom';
 
const BlogCard = ({ id, image, title, excerpt, author }) => {

  const displayTitle = title || "Untitled";
  const displayAuthor = author ? "@" + author.charAt(0).toUpperCase() + author.slice(1) : "Unknown Author";
  const displayImage = image || "https://via.placeholder.com/400x200"; // Placeholder image if no image provided
  const displayExcerpt = excerpt || "No excerpt available.";
  return (
    <Link to={`/post/${id}`} className='rounded-lg bg-white shadow-lg p-2 px-3'>
      <div className='w-full h-[200px] overflow-hidden rounded-2xl '>
        <img
          src={displayImage}
          alt={displayTitle}
          className='w-full h-full hover:scale-105 transition-all ease-linear duration-300 transform cursor-pointer'
        />
      </div>
      <p className='font-semibold text-white bg-black w-fit px-5 py-1 rounded-full text-sm mt-3'>
        {displayAuthor}
      </p>
      <div className='mt-2'>
        <h3 className='text-lg font-semibold'>{displayTitle}</h3>
        <p className='text-grey-500'>{displayExcerpt}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
