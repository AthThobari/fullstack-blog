import { useState } from "react";
import ImageKit from "./ImageKit";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-4 text-2xl font-bold">
        <ImageKit src="/logo.png" className="w-8 h-8" alt="" />
        <span>lamalog</span>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        {/* Mobile Button */}
        <div
          className="cursor-pointer text-4xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "x" : "≡"}
        </div>
        {/* Mobile Link List */}
        <div
          className={`w-full h-screen flex flex-col items-center justify-center absolute top-16 bg-[#e6e6ff] transition-all ease-in-out gap-8 font-medium text-lg ${open ? "-right-0" : "-right-[100%]"}`}
        >
          <a href="/">Home</a>
          <a href="/">Trending</a>
          <a href="/">Most Popular</a>
          <a href="/">About</a>
          <a href="/">
            <button className="py-2 px-4 bg-blue-800 text-white rounded-3xl">
              Log in ✋
            </button>
          </a>
        </div>
      </div>

      {/* Dekstop Menu */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <a href="/">Home</a>
        <a href="/">Trending</a>
        <a href="/">Most Popular</a>
        <a href="/">About</a>
        <a href="/">
          <button className="py-2 px-4 bg-blue-800 text-white rounded-3xl">
            Login ✋
          </button>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
