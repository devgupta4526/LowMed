import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/auth.slice";
import YourBlogs from "../components/YourBlogs"; // Import the new YourBlogs component

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [savedBlogs, setSavedBlogs] = useState([]);
  const [yourBlogs, setYourBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    image: null, // Changed to handle file
    excerpt: "",
  });

  const [userDetails, setUserDetails] = useState({
    username: "Dev Gupta",
    email: "devguptamsi@gmail.com",
    bio: "Full-stack developer passionate about creating interactive and responsive web applications.",
  });

  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("None");

  const userId = useSelector((state) => state.auth.userId);
  const yourJwtToken = useSelector((state) => state.auth.accessToken);

  // Fetch user's blogs when the component mounts
  useEffect(() => {
    const fetchYourBlogs = async () => {
      try {
        setIsLoading(true); // Show loading state
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/blogs/myblogs/`,
          {
            params: { userId }, // Pass userId as a query parameter
            headers: { Authorization: `Bearer ${yourJwtToken}` },
          }
        );
        const data = await res.data;
        if (data.success) {
          setYourBlogs(data.data); // Set blogs data
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to load your blogs");
        console.log(error);
      } finally {
        setIsLoading(false); // Hide loading state
      }
    };

    fetchYourBlogs();
  }, [yourJwtToken, userId]);

  const handleAddBlog = async (e) => {
    e.preventDefault();
    setAuthor(userId);

    if (!title || !author || !image || !content || !category) {
      toast.error("Please fill in all required fields and upload an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", userId);
      formData.append("image", image);
      formData.append("content", content);
      formData.append("category", category);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs/post`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${yourJwtToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = await res.data;
      if (data.success) {
        setTitle("");
        setContent("");
        setAuthor("");
        setImage(null);
        setCategory("None");
        toast.success(data.message);
        setYourBlogs((prevBlogs) => [data.data, ...prevBlogs]); // Add new blog to state
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.log(error);
    }
  };

  const handleUpdateDetails = (e) => {
    e.preventDefault();
    // Handle the update details logic here
    setIsUpdateFormVisible(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/users/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${yourJwtToken}` },
          withCredentials: true,
        }
      );
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate(`/`);
    } catch (error) {
      toast.error("Error logging out");
      console.log(error);
    }
  };

  return (
    <div className="mt-20">
      <div className="container mx-auto px-5">
        {/* User Info */}
        <div className="bg-black p-10 rounded-lg shadow-lg text-white mb-10">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-24 h-24 rounded-full ring-4 ring-white"
            />
            <div className="flex-grow">
              <h1 className="text-4xl font-bold">{userDetails.username}</h1>
              <p className="text-gray-400">{userDetails.email}</p>
              <p className="mt-2 text-gray-300">{userDetails.bio}</p>
            </div>
          </div>
          <button
            onClick={() => setIsUpdateFormVisible(!isUpdateFormVisible)}
            className="mt-6 px-6 py-3 bg-white text-black rounded-md shadow-lg hover:bg-gray-200 transition duration-300"
          >
            {isUpdateFormVisible ? "Close Form" : "Update User Details"}
          </button>
          <button
            onClick={handleLogout}
            className="mx-3 mt-4 px-6 py-3 bg-red-600 text-white rounded-md shadow-lg hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Update User Details Form */}
        {isUpdateFormVisible && (
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg mb-10">
            <h3 className="text-2xl font-bold mb-4 text-black">
              Update User Details
            </h3>
            <form onSubmit={handleUpdateDetails}>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={userDetails.username}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, username: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={userDetails.email}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
                <textarea
                  placeholder="Bio"
                  value={userDetails.bio}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, bio: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  rows="4"
                  required
                />
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="px-6 py-3 bg-black text-white rounded-md shadow-lg hover:bg-gray-700 transition duration-300"
                >
                  Update Details
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Saved Blogs */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold mb-6 text-black">Saved Blogs</h2>
          <div className="flex overflow-x-scroll space-x-6 py-4">
            {savedBlogs.map((blog) => (
              <div
                key={blog.id}
                className="min-w-[300px] w-[300px] flex-shrink-0"
              >
                <BlogCard
                  id={blog.id}
                  title={blog.title}
                  author={blog.author}
                  image={blog.image}
                  excerpt={blog.content}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Your Blogs */}
        <YourBlogs
          yourBlogs={yourBlogs}
          isLoading={isLoading}
          fetchYourBlogs={() => fetchYourBlogs()} // Pass fetch function
          userToken={yourJwtToken}
        />

        {/* Create New Blog Form */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold mb-6 text-black">
            Create a New Blog
          </h2>
          <form onSubmit={handleAddBlog}>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                rows="4"
                required
              />
              <select
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
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-black text-white rounded-md shadow-lg hover:bg-gray-700 transition duration-300"
              >
                Create Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
