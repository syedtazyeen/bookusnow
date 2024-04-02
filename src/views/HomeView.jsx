import React from "react";
import banner from "../assets/Banner.svg";
import { FaBars, FaChevronRight } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import RecommendedScroll from "../components/RecommendedScroll";
import UpcomingScroll from "../components/UpcomingScoll";

const HomeView = () => (
  <div className="w-full h-screen">
    <Banner />
    <Header />
    <MainContent />
  </div>
);

export default HomeView;

///

const MainContent = () => (
  <div className="z-10 inset-0 p-0 relative mt-8 xl:mt-32 m-auto">
    <div className="flex items-center justify-center flex-col p-4 text-white text-center">
      <h2 className="font-bold text-2xl md:text-4xl xl:text-5xl ">
        Discover Exciting Events Happening <br />
        Near You - Stay Tuned for Updates!
      </h2>
      <p className="opacity-70 max-w-xl mt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A, quaerat
        provident quasi dignissimos vel.
      </p>
    </div>
    <div className="mt-6 md:mt-24 text-white py-8">
      <p className="opacity-80 font-bold flex items-center gap-4 px-8">
        Recommended Shows <FaArrowRightLong />
      </p>
      <RecommendedScroll />
    </div>
    <div className="mt-2 p-8">
      <p className="opacity-80 font-bold flex items-center gap-4 mb-6">
        Upcoming Shows <FaArrowRightLong />
      </p>
      <UpcomingScroll />
    </div>
  </div>
);

const Banner = () => (
  <div className="absolute z-0 top-0 inset-0 h-[60vh] md:h-[70vh] xl:h-[90vh] w-full overflow-hidden">
    <img src={banner} className="w-full h-full object-cover" alt="Banner" />
  </div>
);

const Header = () => (
  <div className="sticky top-0 flex flex-col z-20 inset-0 bg-white relative text-sm px-8 py-4 overflow-hidden">
    <div className="gap-4 flex justify-between items-center">
      <div className="cursor-pointer flex-1 md:flex-none">
        <p className="text-xl text-red-700 font-semibold">BookUsNow</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="hidden md:flex items-center gap-2 bg-black text-white px-4 py-[.65rem] rounded-md">
          <FaBars />
          Categories
        </button>
        <div className="flex items-center gap-1 border-2 px-4 py-[.65rem] rounded-md">
          <input
            placeholder="Search"
            className="outline-none p-0 w-80 hidden md:flex"
          />
          <FaSearch className="text-slate-300" />
        </div>
      </div>
      <div>
        <button className="border-2 rounded-md px-4 py-2">Sign In</button>
      </div>
    </div>

    <LocationMenu />
  </div>
);

const LocationMenu = () => (
  <div className="bg-white mt-4 flex justify-center flex-col md:flex-row">
    <div className="flex items-center self-start md:self-center gap-2">
      <MdLocationOn className="opacity-50" />
      <p>Mumbai, India</p>
      <FaChevronRight className="opacity-50 text-[.7rem]" />
    </div>
    <div className="list-none flex md:justify-center overflow-x-auto p-2 md:flex-1 no-scrollbar">
      <ul className="flex items-center gap-8 whitespace-nowrap">
        {menuList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

const menuList = [
  "Live Shows",
  "Streams",
  "Movies",
  "Plays",
  "Events",
  "Sports",
  "Activities",
];
