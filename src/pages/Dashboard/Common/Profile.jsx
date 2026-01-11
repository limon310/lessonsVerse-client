import { useState } from 'react';
import useAuth from '../../../hooks/useAuth'
import useRole from '../../../hooks/useRole'
import UpdateUserProfileModal from '../../../components/Modal/UpdateUserProfileModal';
import UserLessonSection from '../User/UserLessonSection';
import Container from '../../../components/Shared/Container';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import { Mail, BookOpen, Bookmark, Award, Edit3, ShieldCheck } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();
  const [open, setOpen] = useState(false);

  const { data: userData = {}, isLoading: userLoading } = useQuery({
    queryKey: ['userData-profile', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`users/${user?.email}`);
      return res.data;
    }
  });

  const isUserPremium = userData?.isPremium;
  const isAdmin = userData?.role === "admin";

  const { data: lessonCount = {} } = useQuery({
    queryKey: ['lessonCount', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/lessons/count/${user?.email}`)
      return res.data;
    }
  })

  const { data: saveLessonCount = {} } = useQuery({
    queryKey: ['saveLessonCount'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/saveLesson/count`)
      return res.data;
    }
  })

  if (userLoading) return <LoadingSpinner />

  return (
    <Container>
      <div className='py-12'>
        <title>Profile | {user?.displayName}</title>

        {/* Main Profile Card */}
        <div className='bg-base-100 border border-base-300 shadow-2xl rounded-[2.5rem] overflow-hidden relative'>

          {/* Header/Cover Section */}
          <div className='h-48 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 relative'>
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          </div>

          <div className='px-8 pb-10'>
            <div className='flex flex-col md:flex-row items-end -mt-16 gap-6 relative z-10'>
              {/* Profile Image */}
              <div className='relative group'>
                <img
                  alt='profile'
                  src={user?.photoURL}
                  className='h-36 w-36 rounded-3xl object-cover border-4 border-base-100 shadow-xl ring-1 ring-base-300'
                />
                {isUserPremium && (
                  <div className="absolute -top-3 -right-3 bg-amber-400 text-amber-950 p-2 rounded-xl shadow-lg border-2 border-base-100">
                    <Award size={20} />
                  </div>
                )}
              </div>

              {/* User Header Info */}
              <div className='flex-1 pb-2'>
                <div className='flex items-center gap-3 mb-1'>
                  <h1 className='text-3xl font-black text-neutral tracking-tight'>
                    {user?.displayName}
                  </h1>
                  <span className={`badge py-3 px-4 font-bold border-none ${isAdmin ? 'bg-indigo-100 text-indigo-700' : 'bg-base-200 text-neutral-content'}`}>
                    {isAdmin ? <ShieldCheck size={14} className="mr-1" /> : null}
                    {role?.toUpperCase()}
                  </span>
                </div>
                <div className='flex items-center text-neutral-content gap-2 font-medium'>
                  <Mail size={16} />
                  <span>{user?.email}</span>
                </div>
              </div>

              {/* Actions */}
              <div className='pb-2'>
                <button
                  onClick={() => setOpen(true)}
                  className='btn btn-neutral rounded-2xl px-6 gap-2 border-none bg-neutral hover:bg-neutral/80'
                >
                  <Edit3 size={18} />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Statistics Section */}
            {!isAdmin && (
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-10'>
                <div className='bg-base-200/50 border border-base-300 p-6 rounded-3xl flex items-center gap-5'>
                  <div className='p-4 bg-primary/10 text-primary rounded-2xl'>
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <p className='text-[10px] uppercase font-black text-neutral-content tracking-widest'>Created</p>
                    <p className='text-2xl font-black text-neutral'>{lessonCount?.totalCreatedLessons || 0}</p>
                  </div>
                </div>

                <div className='bg-base-200/50 border border-base-300 p-6 rounded-3xl flex items-center gap-5'>
                  <div className='p-4 bg-accent/10 text-accent rounded-2xl'>
                    <Bookmark size={24} />
                  </div>
                  <div>
                    <p className='text-[10px] uppercase font-black text-neutral-content tracking-widest'>Saved</p>
                    <p className='text-2xl font-black text-neutral'>{saveLessonCount?.totalSaveLessons || 0}</p>
                  </div>
                </div>

                {isUserPremium && (
                  <div className='bg-amber-50 border border-amber-200 p-6 rounded-3xl flex items-center gap-5'>
                    <div className='p-4 bg-amber-500 text-white rounded-2xl shadow-lg shadow-amber-200'>
                      <Award size={24} />
                    </div>
                    <div>
                      <p className='text-[10px] uppercase font-black text-amber-600 tracking-widest'>Status</p>
                      <p className='text-2xl font-black text-amber-900'>Premium</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Lesson Management Section */}
        {!isAdmin && (
          <div className='mt-12'>
            <div className='flex items-center gap-4 mb-8'>
              <h2 className='text-2xl font-black text-neutral'>Your Lesson Library</h2>
              <div className='h-px flex-1 bg-base-300'></div>
            </div>
            <UserLessonSection isUserPremium={isUserPremium} />
          </div>
        )}

        {/* Modal */}
        {open && (
          <UpdateUserProfileModal
            user={user}
            close={() => setOpen(false)}
          />
        )}
      </div>
    </Container>
  );
};

export default Profile;
