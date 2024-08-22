import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { logout, login } from "../../store/slices/auth.slice";

const Navbar = () => {
  const { pathname } = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const refreshToken = async () => {
    try {
      console.log("Refresh Request Sent");
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/users/refresh",
        {}, // Empty data object
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("refreshToken"),
          },
        }
      );
      const data = res.data; // No need for an additional await
      dispatch(login(data));
      console.log("Token Saved");
      console.log(data);
    } catch (error) {
      console.log("Error from the server,", error);
      dispatch(logout());
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken();
    }, 1000 * 60 * 13); 

    return () => clearInterval(interval);
  }, []);

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
        {isAuthenticated && (
          <>
            <Link to="/profile" className="hover:text-black cursor-pointer sm:p-2">
              Profile
            </Link>
          </>
        )}
        {!isAuthenticated && (
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
