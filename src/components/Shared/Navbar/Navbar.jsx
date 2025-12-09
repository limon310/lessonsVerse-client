import Container from '../Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import logo from '../../../assets/images/logo.png'
const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  // console.log(user)
  const links = <>
    <li className='text-lg'><Link to="/">Home</Link></li>
    <li className='text-lg'><Link to="">Public Lessons</Link></li>
    <li className='text-lg'><Link to="">Add Lesson</Link></li>
    <li className='text-lg'><Link to="">My Lessons</Link></li>
    {
      user?
      <li className='text-lg'><Link to="">Upgrade Priemium</Link></li>
      :""
    }
  </>
  return (
    // <div className='fixed w-full bg-white z-10 shadow-sm'>
    //   <div className='py-4 '>
    //     <Container>
    //       <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>
    //         {/* Logo */}
    //         <Link to='/'>
    //           <div className='flex items-center gap-1'>
    //             <img
    //               className='w-[60px] h-[60px] rounded-full'
    //               src={logo} alt='logo' width='100' height='100' />
    //             <p className='text-3xl font-bold'>Lessons<span className='text-pink-600'>Verse</span></p>
    //           </div>
    //         </Link>
    //         <div className="navbar-center hidden lg:flex">
    //           <ul className="menu menu-horizontal px-1 text-lg">
    //             {links}
    //           </ul>
    //         </div>
    //         {/* Dropdown Menu */}
    //         <div className='relative'>
    //           <div className='flex flex-row items-center gap-3'>
    //             {/* Dropdown btn */}
    //             <div
    //               onClick={() => setIsOpen(!isOpen)}
    //               className='p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
    //             >
    //               <AiOutlineMenu />
    //               <div className='hidden md:block'>
    //                 {/* Avatar */}
    //                 <img
    //                   className='rounded-full'
    //                   referrerPolicy='no-referrer'
    //                   src={user && user.photoURL ? user.photoURL : avatarImg}
    //                   alt='profile'
    //                   height='30'
    //                   width='30'
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //           {isOpen && (
    //             <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
    //               <div className='flex flex-col cursor-pointer'>
    //                 <Link
    //                   to='/'
    //                   className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
    //                 >
    //                   Home
    //                 </Link>

    //                 {user ? (
    //                   <>
    //                     <span className='px-4 py-3 hover:bg-neutral-100 transition font-semibold text-pink-500'>{user?.displayName}</span>
    //                     <Link
    //                       to='/dashboard'
    //                       className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
    //                     >
    //                       Dashboard
    //                     </Link>
    //                     <div
    //                       onClick={logOut}
    //                       className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
    //                     >
    //                       Logout
    //                     </div>
    //                   </>
    //                 ) : (
    //                   <>
    //                     <Link
    //                       to='/login'
    //                       className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
    //                     >
    //                       Login
    //                     </Link>
    //                     <Link
    //                       to='/signup'
    //                       className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
    //                     >
    //                       Sign Up
    //                     </Link>
    //                   </>
    //                 )}
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </Container>
    //   </div>
    // </div>

    // <div className='fixed w-full bg-white shadow-sm'>
      // <div className='py-4 '></div>
      <div className='fixed w-full bg-white z-10 shadow-sm'>
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
                {links}
            </ul>
          </div>
          <Link to='/'>
            <div className='flex items-center gap-1'>
              <img
                className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full'
                src={logo} alt='logo' width='100' height='100' />
              <p className='text-3xl font-bold hidden md:block'>Lessons<span className='text-pink-600'>Verse</span></p>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end z-10">
          {/* Dropdown Menu */}
          <div className='relative'>
            <div className='flex flex-row items-center gap-3'>
              {/* Dropdown btn */}
              <div
                onClick={() => setIsOpen(!isOpen)}
                className='p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
              >
                <AiOutlineMenu />
                <div className='hidden md:block'>
                  {/* Avatar */}
                  <img
                    className='rounded-full'
                    referrerPolicy='no-referrer'
                    src={user && user.photoURL ? user.photoURL : avatarImg}
                    alt='profile'
                    height='30'
                    width='30'
                  />
                </div>
              </div>
            </div>
            {isOpen && (
              <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                <div className='flex flex-col cursor-pointer'>
                  <Link
                    to='/'
                    className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                  >
                    Home
                  </Link>

                  {user ? (
                    <>
                      <span className='px-4 py-3 hover:bg-neutral-100 transition font-semibold text-pink-500'>{user?.displayName}</span>
                      <Link
                        to='/dashboard'
                        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                      >
                        Dashboard
                      </Link>
                      <div
                        onClick={logOut}
                        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                      >
                        Logout
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to='/login'
                        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                      >
                        Login
                      </Link>
                      <Link
                        to='/signup'
                        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
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
