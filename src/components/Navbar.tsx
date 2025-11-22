import { useState } from "react"
import ImageKit from "./Image";

function Navbar() {
    const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-4 text-2xl font-bold">
            <ImageKit src="/logo.png" alt="Lama Logo" w={32} h={32}/>
            <span>lamalog</span>
        </div>
        {/* MOBILE MENU */}
        <div className="md:hidden">
            <div className="cursor-pointer text-4xl" onClick={() => setOpen((prev) => !prev)}>{open ? "X" : "≡"}</div>

            {/* Mobile link list */}
            <div className={`w-full h-screen flex flex-col items-center gap-8 font-medium text-lg justify-center absolute top-16 bg-color-[#e6e6ff] transition-all ease-in-out ${open ? "right-0" : "-right-full"}`}>
                <a href="/">Home</a>
            <a href="/">Trending</a>
            <a href="/">Most Popular</a>
            <a href="/">About</a>
            <a href="">
                <button className="bg-blue-800 text-white py-2 px-4 rounded-3xl">Login 👋</button>
            </a>
            </div>
        </div>
        {/* DEKSTOP MENU */}
        <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
            <a href="/">Home</a>
            <a href="/">Trending</a>
            <a href="/">Most Popular</a>
            <a href="/">About</a>
            <a href="">
                <button className="bg-blue-800 text-white py-2 px-4 rounded-3xl">Login 👋</button>
            </a>
        </div>
    </div>
  )
}

export default Navbar