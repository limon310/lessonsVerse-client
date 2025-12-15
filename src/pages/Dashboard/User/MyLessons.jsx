import { useQuery } from '@tanstack/react-query';
import UserCreatedLessonRow from '../../../components/Dashboard/TableRows/UserCreatedLessonRow'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const MyLessons = () => {
  const { user } = useAuth();
  // console.log(user.email)
  const axiosSecure = useAxiosSecure();
  const { data: myLessons = [], isLoading, refetch, } = useQuery({
    enabled: !!user?.email, 
    queryKey: ['user', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lessons/${user?.email}`)
      return res.data || {};
    }
  });
  // console.log(myLessons);
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }
  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='grid sm:grid-cols-1 lg:grid-cols-2 justify-between'>
            <div>
              <h2 className='text-3xl font-bold text-pink-500'>My Lessons</h2>
              <p className='text-sm text-gray-400 mt-2'>Manage lessons you created. Only you can see private items.</p>
            </div>
            <div className='flex gap-1 items-center justify-center'>
              <h2 className='text-sm text-gray-400'>Sign in as</h2>
              <p className='text-sm font bold'>{user?.email}</p>
              <button className='btn btn-primary ml-4'>Create lesson</button>
            </div>
          </div>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 font-bold text-left text-sm uppercase'
                    >
                      Title & Category
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Visibility
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Access
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Created
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Reactions
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Save
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    myLessons.map(lesson => <UserCreatedLessonRow key={lesson._id} lesson={lesson} refetch={refetch} />)
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyLessons