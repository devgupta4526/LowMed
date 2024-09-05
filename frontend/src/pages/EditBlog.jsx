import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";

const EditBlog = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const navigate = useNavigate();
  const userToken = useSelector((state) => state.auth.accessToken);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("None");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch blog details on component mount
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get(
          `${import.meta.env.VITE_API_URL}/blogs/post/${id}`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        const data = res.data;

        if (data.success) {
          setTitle(data.data.title);
          setContent(data.data.content);
          setCategory(data.data.category);
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

  // Handle image selection and preview update
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Update image preview
  };

  // Submit the form data (without using FormData) to the server
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !category) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      // Creating a JSON payload
      const payload = {
        title,
        content,
        category,
        image: imagePreview // We send the image URL as part of the payload
      };

      const res = await axiosInstance.put(
        `${import.meta.env.VITE_API_URL}/blogs/post/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json"
          },
        }
      );

      const data = res.data;
      if (data.success) {
        toast.success("Blog updated successfully!");
        navigate(`/profile`); // Redirect after successful update
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error);
    }
  };

  // Display loading state until blog data is fetched
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <textarea
            name="content"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            rows="4"
            required
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
          {/* <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          /> */}
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
