import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { logout, login } from "../../store/slices/auth.slice";

const Navbar = () => {
  const { pathname } = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  // const refreshToken = async () => {
  //   try {
  //     console.log("Refresh Request Sent");
  //     const res = await axios.post(
  //       `${import.meta.env.VITE_API_URL}/users/refresh`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
  //         },
  //       }
  //     );
  //     const data = res.data;
  //     dispatch(login(data));
  //     console.log("Token Saved");
  //   } catch (error) {
  //     console.log("Error from the server,", error);
  //     dispatch(logout());
  //   }
  // };

  // const parseJwt = (token) => {
  //   try {
  //     const base64Url = token.split('.')[1]; // Get the payload part of the JWT
  //     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //     const jsonPayload = decodeURIComponent(
  //       atob(base64)
  //         .split('')
  //         .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
  //         .join('')
  //     );
  //     return JSON.parse(jsonPayload);
  //   } catch (error) {
  //     return null;
  //   }
  // };

  // const isTokenExpiringSoon = (token) => {
  //   if (!token) return true;

  //   const decoded = parseJwt(token);
  //   if (!decoded) return true;

  //   const currentTime = Date.now() / 1000;
  //   return decoded.exp - currentTime < 60 * 5;
  // };

  // useEffect(() => {
  //   const checkAndRefreshToken = async () => {
  //     if (!accessToken || isTokenExpiringSoon(accessToken)) {
  //       await refreshToken();
  //     }
  //   };

  //   checkAndRefreshToken();

  //   const interval = setInterval(checkAndRefreshToken, 1000 * 60 * 13); // Check every 13 minutes

  //   return () => clearInterval(interval);
  // }, [accessToken, dispatch]);

  return (
    <nav
      className={`flex flex-col sm:flex-row justify-between items-start sm:items-center px-5 py-5 ${
        pathname === "/seller/profile" || pathname === "/buyer/profile"
          ? "hidden"
          : "fixed"
      } top-0 left-0 right-0 shadow-md gap-1 sm:gap-0 z-30 bg-white`}
    >
      <div className="flex justify-between items-center">
        <img src="/picprismlogo.png" alt="our logo" className="w-[50px]" />
        <Link to="/" className="font-bold text-3xl">
          LowMed
        </Link>
      </div>

      <ul className="flex gap-5 text-lg font-semibold text-gray-400 ml-5 sm:ml-0">
        <Link to="/" className="hover:text-black cursor-pointer sm:p-2">
          Home
        </Link>
        <Link to="/categories" className="hover:text-black cursor-pointer sm:p-2">
          Categories
        </Link>
        {isAuthenticated ? (
          <Link to="/profile" className="hover:text-black cursor-pointer sm:p-2">
            Profile
          </Link>
        ) : (
          <>
            <Link to="/login" className="hover:text-black cursor-pointer sm:p-2">
              Log In
            </Link>
            <Link to="/signup" className="hover:text-black cursor-pointer sm:p-2">
              Sign Up
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
