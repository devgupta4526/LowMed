import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [comments, setComments] = useState([
    { id: 1, name: 'John Doe', text: 'This is a really insightful post! Thanks for sharing.' },
    { id: 2, name: 'Jane Smith', text: 'I love visiting beaches, this post was very relatable.' },
  ]);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: comments.length + 1, name: 'Anonymous', text: newComment.trim() }
      ]);
      setNewComment('');
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const blogPost = {
    title: "Exploring the Beaches",
    author: "devgupta4526",
    content: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Quisque at erat eu lacus bibendum tincidunt. Nulla ac bibendum orci.
      Praesent ut lacinia magna. Duis tristique consectetur erat, non condimentum nisi aliquet ut.
      `,
    image: "https://images.pexels.com/photos/3238764/pexels-photo-3238764.jpeg",
    relatedPosts: [
      {
        id: 2,
        title: "Mountain Hiking Adventure",
        image: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg"
      },
      {
        id: 3,
        title: "A Day in the Forest",
        image: "https://images.pexels.com/photos/355321/pexels-photo-355321.jpeg"
      }
    ]
  };

  return (
    <div className='mt-20'>
      <div className='container mx-auto px-5'>
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className='mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg'
        >
          &larr; Back
        </button>

        <h1 className='text-5xl font-extrabold mb-6'>{blogPost.title}</h1>
        <p className='text-sm text-gray-500 mb-2'>By {blogPost.author}</p>
        <img
          src={blogPost.image}
          alt={blogPost.title}
          className='w-full h-auto my-5 rounded-lg shadow-lg'
        />
        <div className='prose lg:prose-xl mb-10'>
          <p>{blogPost.content}</p>
        </div>

        {/* Related Posts Section */}
        <div className='related-posts mb-10'>
          <h2 className='text-3xl font-semibold mb-5'>Related Posts</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {blogPost.relatedPosts.map(post => (
              <div key={post.id} className='related-post-item'>
                <img
                  src={post.image}
                  alt={post.title}
                  className='w-full h-40 object-cover rounded-lg mb-3'
                />
                <h3 className='text-xl font-medium'>{post.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Comment Section */}
        <div className='comment-section'>
          <h2 className='text-3xl font-semibold mb-5'>Comments</h2>
          <div className='comment-box mb-6'>
            <textarea
              className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              rows='4'
              placeholder='Leave a comment...'
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button
              onClick={handleCommentSubmit}
              className='mt-3 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600'
            >
              Submit
            </button>
          </div>
          <div className='comments-list'>
            {comments.map((comment) => (
              <div key={comment.id} className='comment-item mb-4'>
                <p className='text-sm text-gray-500'>{comment.name}</p>
                <p className='text-base bg-gray-100 p-3 rounded-lg'>{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
