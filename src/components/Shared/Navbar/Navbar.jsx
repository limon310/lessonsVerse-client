import Container from '../Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import logo from '../../../assets/images/logo.png'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { LuBadgeCheck } from "react-icons/lu";
import ThemeToggle from '../ThemeToggle'
import NavbarLinks from './NavbarLinks'
import { ArrowUpRight, Send } from 'lucide-react'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  // console.log(user)
  const axiosSecure = useAxiosSecure();
  const { data: userData = null } = useQuery({
    queryKey: ['upgradeUser', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    }
  });
  const isUserPremium = userData?.isPremium;

  return (
    <div className='fixed w-full bg-base-200 z-100 shadow-sm'>
      <Container>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <NavbarLinks userData={userData} />
              </ul>
            </div>
            <Link to='/'>
              <div className='flex items-center gap-1'>
                <img
                  className='w-10 h-10 md:w-[60px] md:h-[60px] rounded-full'
                  src={logo} alt='logo' width='100' height='100' />
                <p className='text-3xl font-bold hidden md:block'>Lessons<span className='text-pink-500'>Verse</span></p>
              </div>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <NavbarLinks userData={userData} />
            </ul>
          </div>
          <div className="navbar-end z-10">
            {/* theme toogle */}
            <div className='mr-4'>
              <ThemeToggle />
            </div>
            {/* show upgrade button on condition */}
            {user && (
              userData?.role === "admin" ? null : isUserPremium ? (
                <span className="px-3 py-1">
                  <LuBadgeCheck color="blue" size={28} />
                </span>
              ) : (
                <Link
                  to="/upgrade-premium"
                  className="btn btn-primary mr-2 text-base-100 text-sm"
                >
                  Upgrade
                </Link>
              )
            )}

            {/* Dropdown Menu */}
            <div className='relative bg-base-100 text-neutral'>
              <div className='flex flex-row items-center gap-3'>
                {/* Dropdown btn */}
                {user ? ( // only show dropdown if user exists
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className='p-4 md:py-1 md:px-2 border border-base-300 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                  >
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                      {/* Avatar */}
                      <img
                        className='rounded-full w-8 h-8'
                        referrerPolicy='no-referrer'
                        src={user.photoURL || avatarImg}
                        alt='profile'
                      />
                    </div>
                  </div>
                ) : (
                  // If no user not login then show
                  <div className="flex gap-3">
                    {/* <Link
                      to="/login"
                      className="px-5 py-2 font-semibold rounded-lg bg-primary hover:bg-primary-focus transition-colors duration-300 shadow-md"
                    >
                      Login
                    </Link> */}
                    <Link to='/login'
                      className="btn btn-primary rounded-2xl px-5 h-auto py-4 font-black uppercase tracking-widest group text-[12px]"
                    >
                      Login
                      <ArrowUpRight size={16} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      {/* <Send size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> */}
                    </Link>
                    {/* <Link
                      to="/signup"
                      className="px-5 py-2 font-semibold rounded-lg bg-success hover:bg-secondary-focus transition-colors duration-300 shadow-md"
                    >
                      Sign Up
                    </Link> */}
                    <Link to="/signup"
                      className="btn btn-success rounded-2xl px-6 h-auto py-4 font-black uppercase tracking-widest group text-base-100 text-[12px]"
                    >
                      Sign Up
                      <Send size={16} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </div>

                )}
              </div>

              {/* Dropdown menu */}
              {isOpen && user && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-base-100 overflow-hidden right-0 top-12 text-sm'>
                  <div className='flex flex-col cursor-pointer'>
                    <Link
                      to='/'
                      className='block md:hidden px-4 py-3 hover:bg-neutral-content transition font-semibold'
                    >
                      Home
                    </Link>

                    <span className='px-4 py-3 hover:bg-neutral-content transition font-semibold text-success'>{user.displayName}</span>
                    <Link
                      to='/dashboard/profile'
                      className='px-4 py-3 hover:bg-primary transition font-semibold'
                    >
                      Profile
                    </Link>
                    <Link
                      to='/dashboard'
                      className='px-4 py-3 hover:bg-primary transition font-semibold'
                    >
                      Dashboard
                    </Link>
                    <div
                      onClick={logOut}
                      className='px-4 py-3 hover:bg-primary transition font-semibold cursor-pointer'
                    >
                      Logout
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </Container>
    </div>
  )
}

export default Navbar
