import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ id, image, title, excerpt, author }) => {
  return (
    <Link to={`/post/${id}`} className='rounded-lg bg-white shadow-lg p-2'>
      <div className='w-full h-[200px] overflow-hidden rounded-2xl'>
        <img
          src={image}
          alt={title}
          className='w-full h-full hover:scale-105 transition-all ease-linear duration-300 transform cursor-pointer'
        />
      </div>
      <p className='font-semibold text-white bg-black w-fit px-5 py-1 rounded-full text-sm mt-3'>
        {"@" + author.charAt(0).toUpperCase() + author.slice(1)}
      </p>
      <div className='mt-2'>
        <h3 className='text-lg font-semibold'>{title}</h3>
        <p className='text-grey-500'>{excerpt}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
