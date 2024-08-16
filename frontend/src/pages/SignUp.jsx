import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!username || !fullName || !email || !password || !avatar) {
      toast.error("Please fill in all required fields and upload an avatar.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", avatar);
      if (coverImage) formData.append("coverImage", coverImage);

      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/users/signup",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const data = await res.data;
      if (data.success) {
        setUsername("");
        setFullName("");
        setEmail("");
        setPassword("");
        setAvatar(null);
        setCoverImage(null);
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="mt-20 sm:mt-10 min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-3xl px-5 py-6 w-full sm:w-[27vw]">
        <h1 className="text-2xl font-bold text-center mb-4">Let's Connect</h1>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="devgupta4526"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow-md rounded-md w-full px-3 py-2 border-gray-300 focus:outline-none focus:ring-black focus:border-black"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Dev Gupta"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="shadow-md rounded-md w-full px-3 py-2 border-gray-300 focus:outline-none focus:ring-black focus:border-black"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="devguptamsi@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-md rounded-md w-full px-3 py-2 border-gray-300 focus:outline-none focus:ring-black focus:border-black"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-md rounded-md w-full px-3 py-2 border-gray-300 focus:outline-none focus:ring-black focus:border-black"
              required
            />
          </div>

          {/* File Uploads */}
          <div className="mb-4">
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Avatar <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="avatar"
              onChange={(e) => setAvatar(e.target.files[0])}
              className="file:border file:rounded-md file:py-2 file:px-4 file:bg-black file:text-white file:cursor-pointer file:hover:bg-gray-700"
              accept="image/*"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="coverImage"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Cover Image
            </label>
            <input
              type="file"
              id="coverImage"
              onChange={(e) => setCoverImage(e.target.files[0])}
              className="file:border file:rounded-md file:py-2 file:px-4 file:bg-black file:text-white file:cursor-pointer file:hover:bg-gray-700"
              accept="image/*"
            />
          </div>

          {/* Login link */}
          <div className="flex items-center justify-end mb-4">
            <Link className="text-xs text-black" to="/login">
              Log In With Account
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md shadow-md text-sm font-medium text-white bg-black hover:bg-gray-800"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
