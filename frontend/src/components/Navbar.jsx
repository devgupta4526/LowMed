import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { pathname } = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
        {isAuthenticated && (<>
          <Link to="/profile" className="hover:text-black cursor-pointer sm:p-2">
          Profile
        </Link>
        </>)}
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
