import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const EditBlog = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const navigate = useNavigate();
  const userToken = useSelector((state) => state.auth.accessToken); // Get user's JWT token

  const [blogDetails, setBlogDetails] = useState({
    title: "",
    content: "",
    category: "",
    image: null, // We'll manage image uploads here
  });
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [imagePreview, setImagePreview] = useState(null); // For showing the current image preview

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/post/${id}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        const data = res.data;

        if (data.success) {
          setBlogDetails({
            title: data.data.title,
            content: data.data.content,
            category: data.data.category,
            image: null, // Keep this as null to allow for new image uploads
          });
          setImagePreview(data.data.image); // Show the current image preview
        } else {
          toast.error(data.message);
          navigate("/your-blogs"); // Redirect if blog not found
        }
      } catch (error) {
        toast.error("Failed to load blog details");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id, userToken, navigate]);

  const handleInputChange = (e) => {
    setBlogDetails({ ...blogDetails, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBlogDetails({ ...blogDetails, image: file });
    setImagePreview(URL.createObjectURL(file)); // Update image preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blogDetails.title || !blogDetails.content || !blogDetails.category) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", blogDetails.title);
      formData.append("content", blogDetails.content);
      formData.append("category", blogDetails.category);
      if (blogDetails.image) {
        formData.append("image", blogDetails.image);
      }

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/blogs/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = res.data;
      if (data.success) {
        toast.success("Blog updated successfully!");
        navigate(`/your-blogs`); // Redirect to your blogs page after a successful update
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading blog details...</div>;
  }

  return (
    <div className="mt-20 container mx-auto px-5">
      <h2 className="text-3xl font-bold mb-6 text-black">Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={blogDetails.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <textarea
            name="content"
            placeholder="Content"
            value={blogDetails.content}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            rows="4"
            required
          />
          <select
            name="category"
            value={blogDetails.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          >
            <option value="None">None</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Tech">Tech</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Fashion">Fashion</option>
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-40 h-40 object-cover mt-4 rounded-lg"
            />
          )}
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-black text-white rounded-md shadow-lg hover:bg-gray-700 transition duration-300"
          >
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
