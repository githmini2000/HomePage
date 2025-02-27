import { SlArrowDown } from "react-icons/sl";
import { IoPersonSharp } from "react-icons/io5";
import { PiHandbagSimple } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";


const Header = () => {
    <header className="bg-gray-100 p-4 flex items-center justify-between">
    <div className="flex items-center space-x-2">
        <span className="text-lg font-medium">All Categories</span>
        <SlArrowDown />
      </div>

      <div className="flex items-center space-x-2 w-96">
        <input
          type="text"
          placeholder="Search Product"
          className="w-full py-2 px-4 border border-gray-300 rounded-md"
        />
        <CiSearch />
   </div>

   <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <IoPersonSharp size={24} />
          <div>
            <span className="text-lg">Welcome</span>
            <br />
            <span className="text-sm text-gray-500">Register/Sign in</span>
          </div>
        </div>
        <SlArrowDown />
      </div>

      <div className="flex items-center space-x-6">
        <PiHandbagSimple size={24} />
        <CiHeart size={24} />
      </div>
    </header>
}

export default Header;