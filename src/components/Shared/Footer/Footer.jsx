import { Link } from 'react-router'
import logo from '../../../assets/images/logo.png'
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">

            <div className="col-span-2 md:col-span-1 lg:col-span-2 space-y-4">
              <Link to='/' className="flex items-center space-x-3 text-2xl font-bold text-white">
                <span className="text-indigo-400 text-3xl"><img className='w-[70px] h-[70px] rounded-full' src={logo} alt="" /></span>
                <span>LessonsVerse</span>
              </Link>
              <p className="text-gray-400 text-sm max-w-xs">
                Preserving personal wisdom and fostering community growth through shared life lessons.
              </p>
            </div>

            <div className="col-span-1">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul class="space-y-3">
                <li>
                  <Link to="" className="text-gray-400 hover:text-indigo-400 transition duration-150">about us</Link>
                </li>
                <li>
                  <Link to="" className="text-gray-400 hover:text-indigo-400 transition duration-150">Premium Upgrade</Link>
                </li>
                <li>
                  <Link to="" className="text-gray-400 hover:text-indigo-400 transition duration-150">Terms & Conditions</Link>
                </li>
                <li>
                  <Link to="" className="text-gray-400 hover:text-indigo-400 transition duration-150">Privacy Policy</Link>
                </li>
              </ul>
            </div>

            <div className="col-span-1">
              <h3 class="text-lg font-semibold text-white mb-4">Contact</h3>
              <ul class="space-y-3">
                <li class="text-gray-400">
                  <span className="hover:text-indigo-400">mdlimonislam134@gmail.com</span>
                </li>
                <li className="text-gray-400">
                  Phone: <span className="hover:text-indigo-400">+88 01896139783</span>
                </li>
                <li className="text-gray-400">
                  Address: Dinajpur Bangladesh
                </li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <Link to='' className="text-gray-400 hover:text-white transition duration-150" aria-label="Follow us on X (Twitter)">
                  <FaXTwitter size={24} />
                </Link>
                <Link to="" className="text-gray-400 hover:text-white transition duration-150" aria-label="Follow us on Facebook">
                  <FaFacebook size={24} />
                </Link>
                <Link to="" className="text-gray-400 hover:text-white transition duration-150" aria-label="Follow us on LinkedIn">
                  <FaLinkedin size={24} />
                </Link>
              </div>
            </div>
          </div>

          <div class="mt-12 pt-8 border-t border-gray-700">
            <p class="text-center text-sm text-gray-500">
              &copy; <span id="currentYear"></span>LessonsVerse. All rights reserved. {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer
