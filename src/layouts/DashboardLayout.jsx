import { Link, Outlet } from 'react-router'
import Sidebar from '../components/Dashboard/Sidebar/Sidebar'
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../hooks/useAuth';
import ThemeToggle from '../components/Shared/ThemeToggle';

const DashboardLayout = () => {
    const { user } = useAuth()
  const axiosSecure = useAxiosSecure();
  const { data: userData = null } = useQuery({
    queryKey: ['upgradeUser', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    }
  });
  return (
    <div className='relative min-h-screen md:flex bg-base-100 text-neutral'>

      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <div className='flex-1 flex flex-col min-h-screen md:ml-64'>

        {/* --- Navbar (Desktop only) --- */}
        <header className='hidden md:flex sticky top-0 z-30 h-16 w-full items-center bg-base-100/60 backdrop-blur-xl border-b border-base-300 px-10'>
          <div className='flex w-full items-center justify-end gap-5'>

            {/* Action Buttons */}
            <div className='flex items-center gap-2'>
              <ThemeToggle />
              {/* <button title="Settings" className='btn btn-ghost btn-sm btn-circle hover:bg-base-200'>
                <Settings size={18} className="opacity-70" />
              </button>

              <button title="Notifications" className='btn btn-ghost btn-sm btn-circle hover:bg-base-200'>
                <div className="indicator">
                  <Bell size={18} className="opacity-70" />
                  <span className="badge badge-xs badge-secondary indicator-item border-none"></span>
                </div>
              </button> */}
            </div>

            {/* User Profile Section */}
            <div className='flex items-center gap-4 pl-5 border-l border-base-300'>
              <div className='flex flex-col items-end'>
                <span className='text-[10px] font-black uppercase text-primary tracking-widest leading-none mb-1'>Active Now</span>
                <span className='text-sm font-bold'>System <span className='text-success'>{userData?.role}</span></span>
              </div>

              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="avatar">
                  <div className="w-10 rounded-2xl ring-2 ring-primary/10 ring-offset-base-100 ring-offset-2 hover:ring-primary/40 transition-all cursor-pointer">
                    <img src={userData?.photoURL || "https://ui-avatars.com/api/?name=Admin&background=random"} alt="user" />
                  </div>
                </div>
                {/* Profile Dropdown Menu */}
                <ul tabIndex={0} className="dropdown-content z-1 menu p-2 shadow-xl bg-base-100 border border-base-300 rounded-2xl w-52 mt-4 font-bold">
                  <li><Link to="/dashboard/profile">Profile</Link></li>
                  <li><Link to="/">Home</Link></li>
                </ul>
              </div>
            </div>

          </div>
        </header>

        {/* --- Dynamic Content --- */}
        <main className='p-6 md:p-10 bg-base-200/40 flex-1'>
          <div className='max-w-7xl mx-auto'>
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  )
}

export default DashboardLayout