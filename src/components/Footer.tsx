import { IoMdPlay } from "react-icons/io";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-400 text-black text-xl font-medium py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold underline mb-4">Quick Links</h3>
            <ul>
              <li className="flex items-center mb-3">
                <IoMdPlay className="mr-2 " />
                <Link href="/home">Home</Link>
              </li>
              <li className="flex items-center mb-3">
                <IoMdPlay className="mr-2  " />
                <Link href="/aboutUs">About Us</Link>
              </li>
              <li className="flex items-center mb-3">
                <IoMdPlay className="mr-2" />
                <Link href="/contactUs">Contact Us</Link>
              </li>
              <li className="flex items-center mb-3">
                <IoMdPlay className="mr-2" />
                <Link href="/terms">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          <div className="flex space-x-8 mt-10">
            <ul>
              <li className="flex items-center mb-3">
                <IoMdPlay className="mr-2" />
                <Link href="/faqs">FAQs</Link>
              </li>
              <li className="flex items-center mb-3">
                <IoMdPlay className="mr-2" />
                <Link href="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold underline mb-4">Contact Us</h3>
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-2 mb-4 rounded-md border border-gray-300 bg-gray-300"
            />
            <button className="bg-green-900 text-white py-2 px-6 rounded-md hover:bg-green-700">
              Send
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
