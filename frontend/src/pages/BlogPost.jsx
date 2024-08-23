import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { accessToken, userId } = useSelector((state) => state.auth);

  const [blogPost, setBlogPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentsLength,setCommentsLength] = useState();

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/blogs/post/${id}`);
        setBlogPost(response.data.data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/comments/${id}`);
        console.log("comment response");
        // Update this line to access comments in response.data.statusCode
        setComments(Array.isArray(response.data.statusCode) ? response.data.statusCode : []);
        setCommentsLength(response.data.statusCode.length);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setComments([]); // Set an empty array if there's an error
      }
    };

    fetchBlogPost();
    fetchComments();
  }, [id,commentsLength]);

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '') return;

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/comments/${id}`,
        { text: newComment, userId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setComments((prevComments) => [...prevComments, response.data.data]);
      setNewComment('');
      setCommentsLength(commentsLength + 1);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mt-20'>
      <div className='container mx-auto px-5'>
        <button
          onClick={handleBackClick}
          className='mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg'
        >
          &larr; Back
        </button>

        <h1 className='text-5xl font-extrabold mb-6'>{blogPost.title}</h1>
        <p className='text-sm text-gray-500 mb-2'>By {blogPost.author.username}</p>
        <img
          src={blogPost.image}
          alt={blogPost.title}
          className='w-full h-auto my-5 rounded-lg shadow-lg'
        />
        <div className='prose lg:prose-xl mb-10'>
          <p>{blogPost.content}</p>
        </div>

        <div className='related-posts mb-10'>
          <h2 className='text-3xl font-semibold mb-5'>Related Posts</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {blogPost.relatedPosts?.map((post) => (
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
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} className='comment-item mb-4'>
                  <p className='text-sm text-gray-500'>{comment.username}</p>
                  <p className='text-base bg-gray-100 p-3 rounded-lg'>{comment.text}</p>
                </div>
              ))
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
