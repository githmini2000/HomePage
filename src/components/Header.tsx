import { SlArrowDown } from "react-icons/sl";
import { IoPersonSharp } from "react-icons/io5";
import { PiHandbagSimple } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  return (
    <header className="bg-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-5">
        <span className="text-lg font-medium">All Categories</span>
        <SlArrowDown />
      </div>

      <div className="relative flex items-center w-full max-w-3xl ">
        <input
          type="text"
          placeholder="Search Product"
          className="w-full py-2 px-4 pl-10 border  border-gray-300 rounded-full"
        />
        <CiSearch className="absolute right-3 text-gray-500" size={20} />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <IoPersonSharp size={35} />
          <div>
            <span className="text-sm text-gray-500">Welcome</span>
            <br />
            <span className="text-lg text-bold">Register/Sign in</span>
          </div>
        </div>
        <SlArrowDown />
      </div>

      <div className="flex items-center space-x-6">
        <PiHandbagSimple size={24} />
        <CiHeart size={28} />
      </div>
    </header>
  );
};

export default Header;
