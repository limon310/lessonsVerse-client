import { useQuery } from '@tanstack/react-query';
import UserCreatedLessonRow from '../../../components/Dashboard/TableRows/UserCreatedLessonRow';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { Plus, LayoutGrid, Search, UserCircle } from 'lucide-react';
import { Link } from 'react-router';

const MyLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myLessons = [], isLoading, refetch } = useQuery({
    enabled: !!user?.email,
    queryKey: ['myLessonsIn-myLessonPage', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get('/my-lessons');
      return res.data;
    }
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className='min-h-screen bg-base-100 text-neutral'>
      <title>My Lessons | Dashboard</title>

      <div className='container mx-auto px-4 sm:px-8 py-8'>
        {/* Header Section */}
        <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10'>
          <div className='space-y-1'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-primary/10 text-primary rounded-xl'>
                <LayoutGrid size={24} />
              </div>
              <h2 className='text-3xl font-black tracking-tight'>My Lessons</h2>
            </div>
            <p className='text-neutral-content font-medium opacity-80'>
              Studio workspace: Manage, edit, and track your educational content.
            </p>
          </div>

          <div className='flex flex-wrap items-center gap-4 bg-base-200 p-3 rounded-[2rem] border border-base-300 shadow-sm'>
            <div className='flex items-center gap-2 px-4 py-2 border-r border-base-300'>
              <UserCircle size={18} className="text-primary" />
              <div className='flex flex-col'>
                <span className='text-[10px] uppercase font-black text-neutral-content leading-none'>Creator</span>
                <span className='text-xs font-bold'>{user?.email}</span>
              </div>
            </div>
            <Link to="/dashboard/add-lesson" className='btn btn-primary rounded-2xl gap-2 shadow-lg shadow-primary/20'>
              <Plus size={20} />
              Create New Lesson
            </Link>
          </div>
        </div>

        {/* Filters/Stats Bar (Optional but looks Pro) */}
        <div className='flex justify-between items-center mb-6 px-2'>
          <div className='text-sm font-bold'>
            Total Assets: <span className='text-primary'>{myLessons.length}</span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-content opacity-50" size={16} />
            <input
              type="text"
              placeholder="Search your lessons..."
              className="input input-sm bg-base-200 border-base-300 rounded-xl pl-10 focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className='overflow-x-auto bg-base-200 rounded-4xl border border-base-300 shadow-xl'>
          <table className='table w-full border-collapse'>
            {/* head */}
            <thead>
              <tr className='border-b border-base-300'>
                <th className='bg-base-200 text-neutral-content font-black uppercase tracking-widest text-[11px] py-6 px-6'>
                  Title & Category
                </th>
                <th className='bg-base-200 text-neutral-content font-black uppercase tracking-widest text-[11px]'>
                  Visibility
                </th>
                <th className='bg-base-200 text-neutral-content font-black uppercase tracking-widest text-[11px]'>
                  Access
                </th>
                <th className='bg-base-200 text-neutral-content font-black uppercase tracking-widest text-[11px] text-center'>
                  Stats (Reactions)
                </th>
                <th className='bg-base-200 text-neutral-content font-black uppercase tracking-widest text-[11px] text-right px-6'>
                  Management
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-base-300/50'>
              {myLessons.length > 0 ? (
                myLessons.map(lesson => (
                  <UserCreatedLessonRow
                    key={lesson._id}
                    lesson={lesson}
                    refetch={refetch}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-20 text-center">
                    <div className="flex flex-col items-center opacity-40">
                      <LayoutGrid size={48} className="mb-2" />
                      <p className="font-bold">No lessons found. Start by creating one!</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyLessons;