import { useState } from 'react';
import useAuth from '../../../hooks/useAuth'
import useRole from '../../../hooks/useRole'
import UpdateUserProfileModal from '../../../components/Modal/UpdateUserProfileModal';
import UserLessonSection from '../User/UserLessonSection';
import Container from '../../../components/Shared/Container';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';

const Profile = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();
  const [open, setOpen] = useState(false);

  // Fetch logged-in user's details from DB
  const { data: userData = {}, isLoading: userLoading } = useQuery({
    queryKey: ['userData-profile', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`users/${user?.email}`);
      return res.data;
    }
  });

  const isUserPremium = userData?.isPremium;
  // console.log(isUserPremium)

  // lesson count
  const { data: lessonCount = [] } = useQuery({
    queryKey: ['lessonCount'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/lessons/count/${user?.email}`)
      return res.data;
    }
  })
  // console.log("lessonCount", lessonCount);

  // save lesson count
  const { data: saveLessonCount = [] } = useQuery({
    queryKey: ['saveLessonCount'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/saveLesson/count/${user?.email}`)
      return res.data;
    }
  })
  // console.log("save lesson count", saveLessonCount);

  if(userLoading){
    return <LoadingSpinner></LoadingSpinner>
  }

  return (
    <Container>
      <div className='flex justify-center items-center h-screen'>
        <div className='bg-white shadow-lg rounded-2xl w-full'>
          <img
            alt='cover photo'
            src={user?.photoURL}
            className='w-full mb-4 rounded-t-lg h-56'
          />
          <div className='flex flex-col items-center justify-center p-4 -mt-16'>
            <a href='#' className='relative block'>
              <img
                alt='profile'
                src={user?.photoURL}
                className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
              />
            </a>

            <p className='p-2 px-4 text-xs text-white bg-lime-500 rounded-full'>
              {role}
            </p>
            <p className='text-2xl font-semibold flex items-center gap-2'>
              User: {user?.displayName}
            </p>
            {
              isUserPremium && <span className="text-yellow-500 text">⭐ Premium</span>
            }
            <div className='w-full p-2 mt-4 rounded-lg'>
              <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>

                <p className=''>
                  Email
                  <span className='font-bold text-gray-600 ms-2'>{user?.email}</span>
                </p>
                <p className=''>
                  CreatedLessons
                  <span className='font-bold text-gray-600 ms-2'>{lessonCount.totalCreatedLessons}</span>
                </p>
                <p className=''>
                  SaveLessons
                  <span className='font-bold text-gray-600 ms-2'>{saveLessonCount.totalSaveLessons}</span>
                </p>
                <div>
                  <button
                    onClick={() => setOpen(true)}
                    className='bg-lime-500 w-full  px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-lime-800 block mb-1'>
                    Update Profile
                  </button>
                  {open && <UpdateUserProfileModal
                    user={user}
                    close={() => setOpen(false)} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserLessonSection></UserLessonSection>
    </Container>
  );
};

const Stat = ({ label, value }) => (
  <div>
    <p className="text-xl font-bold">{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
)


export default Profile
