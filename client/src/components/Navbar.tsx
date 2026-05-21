import { useEffect, useState } from "react";
import ImageKit from "./Image";
import { Link } from "react-router";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((token) => console.log(token))
  })

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* LOGO */}
      <Link
        to={"/blog/"}
        className="flex items-center gap-4 text-2xl font-bold"
      >
        <ImageKit src="/logo.png" alt="Lama Logo" w={32} h={32} />
        <span>lamalog</span>
      </Link>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <div
          className="cursor-pointer text-4xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "X" : "≡"}
        </div>

        {/* Mobile link list */}
        <div
          className={`w-full h-screen flex flex-col items-center gap-8 font-medium text-lg justify-center absolute top-16 bg-[#e6e6ff] transition-all ease-in-out ${
            open ? "right-0" : "-right-full"
          }`}
        >
          <Link to={"/"}>Home</Link>
          <Link to={"/"}>Trending</Link>
          <Link to={"/blog/"}>Most Popular</Link>
          <Link to={"/blog/"}>About</Link>
          <SignedOut>
            <Link to={"/blog/login"}>
              <button className="bg-blue-800 text-white py-2 px-4 rounded-3xl">
                Login 👋
              </button>
            </Link>
          </SignedOut>

          <SignedIn>
            <SignOutButton redirectUrl="/blog/">
              <button className="bg-red-600 text-white py-2 px-4 rounded-3xl">
                Logout
              </button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
      {/* DEKSTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to={"/blog/"}>Home</Link>
        <Link to={"/blog/"}>Trending</Link>
        <Link to={"/blog/"}>Most Popular</Link>
        <Link to={"/blog/"}>About</Link>

        <SignedOut>
          <Link to={"/blog/login"}>
            <button className="bg-blue-800 text-white py-2 px-4 rounded-3xl">
              Login 👋
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Navbar;
