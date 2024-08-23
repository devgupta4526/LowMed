import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

const HeroSection = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="sm:w-[60vw] h-[20vh] overflow-clip sm:rounded-3xl mx-auto flex justify-center items-center">
      <form className="absolute flex justify-center items-center" onSubmit={handleSearch}>
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Search Blog Posts..."
          className="py-5 px-3 w-[80vw] sm:w-[40vw] text-xl sm:text-3xl mx-auto outline-none border-b-2 bg-bgColor"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IoIosSearch className="text-3xl sm:text-5xl text-gray-400 -ml-10" />
      </form>
    </div>
  );
};

export default HeroSection;
