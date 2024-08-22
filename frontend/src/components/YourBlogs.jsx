import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const YourBlogs = ({ yourBlogs, isLoading, fetchYourBlogs, userToken }) => {
  const navigate = useNavigate();

  const handleEdit = (blogId) => {
    navigate(`/edit-blog/${blogId}`);
  };



const handleDelete = async (blogId) => {
  if (!window.confirm("Are you sure you want to delete this blog?")) {
    return;
  }

  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/blogs/post/${blogId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    });

    alert("Blog deleted successfully!");
    fetchYourBlogs();  // Refresh the blog list
  } catch (error) {
    if (error.response) {
      // Error from server response
      alert(`Failed to delete blog: ${error.response.data.message}`);
    } else if (error.request) {
      // Error during request
      console.error("Error with request:", error.request);
      alert("An error occurred during the request.");
    } else {
      // Other errors
      console.error("Error deleting blog:", error.message);
      alert(`An error occurred: ${error.message}`);
    }
  }
};


  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold mb-6 text-black">Your Blogs</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : yourBlogs.length > 0 ? (
        <div className="flex overflow-x-scroll space-x-6 py-4">
          {yourBlogs.map((blog) => (
            <div key={blog._id} className="min-w-[300px] w-[300px] flex-shrink-0">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-xl font-bold text-black mb-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-2">
                    {blog.author.username || "Anonymous"}
                  </p>
                  <p className="text-gray-500 mb-2">Category: {blog.category || "None"}</p>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {blog.content.substring(0, 100)}...
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    Posted on: {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEdit(blog._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  );
};

export default YourBlogs;
