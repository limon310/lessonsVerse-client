import { useQuery } from '@tanstack/react-query';
import { Eye, Trash2, Filter, LayoutGrid, CalendarDays, HeartIcon } from 'lucide-react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import { useState } from 'react';

const MyFavorite = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [category, setCategory] = useState("");
  const [emotional_ton, setEmotional_ton] = useState("");

  const { data: myFavoritesLesson = [], isLoading, refetch } = useQuery({
    enabled: !!user?.email,
    queryKey: ['my-favoritesLessons', category, emotional_ton, user?.email],
    queryFn: async () => {
      const params = {};
      if (category) params.category = category;
      if (emotional_ton) params.emotional_ton = emotional_ton;
      const res = await axiosSecure.get('/my-favorite-lessons', { params });
      return res.data;
    }
  });

  const handleToggleFavorite = (lessonId) => {
    axiosSecure.delete(`/remove-favorite/${lessonId}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          toast.success("Removed from favorites", {
            style: { borderRadius: '12px', background: 'oklch(var(--b2))', color: 'oklch(var(--n))' }
          });
          refetch();
        }
      });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className='min-h-screen bg-base-100 text-neutral'>
      <title>My Favorites | Studio</title>

      <div className='container mx-auto px-4 sm:px-8 py-10'>
        {/* Header Section */}
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10'>
          <div className='space-y-1'>
            <div className='flex items-center gap-3'>
              <div className='p-3 bg-secondary/10 text-secondary rounded-2xl'>
                <HeartIcon size={28} />
              </div>
              <h2 className='text-4xl font-black tracking-tight'>Reading List</h2>
            </div>
            <p className='text-neutral-content font-medium opacity-70 ml-1'>
              Your curated collection of insightful lessons and realizations.
            </p>
          </div>

          {/* Stats Badge */}
          <div className="stats shadow-sm bg-base-200 border border-base-300 rounded-4xl px-4">
            <div className="stat py-2">
              <div className="stat-title text-[10px] uppercase font-black opacity-60">Saved Items</div>
              <div className="stat-value text-2xl text-secondary">{myFavoritesLesson.length}</div>
            </div>
          </div>
        </div>

        {/* Filter Section - Glassmorphism style */}
        <div className='bg-base-200/50 backdrop-blur-md border border-base-300 p-6 rounded-[2.5rem] mb-8'>
          <div className='flex items-center gap-2 mb-4 text-neutral-content font-bold text-sm'>
            <Filter size={16} /> Quick Filters
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full rounded-2xl bg-base-100 border-base-300 focus:ring-2 focus:ring-secondary/50 font-bold"
            >
              <option value="">All Categories</option>
              <option value="Personal">Personal </option>
              <option value="Growth">Growth</option>
              <option value="Career">Career</option>
              <option value="Relationships">Relationships</option>
              <option value="Mindset">Mindset</option>
              <option value="Mistakes_learned">Mistakes Learned</option>
              <option value="Finance_Money">Finance Money</option>
              <option value="Health_Wellness">Health Wellness</option>
            </select>

            {/* Emotional Tone Filter */}
            <select
              value={emotional_ton}
              onChange={(e) => setEmotional_ton(e.target.value)}
              className="select select-bordered w-full rounded-2xl bg-base-100 border-base-300 focus:ring-2 focus:ring-secondary/50 font-bold"
            >
              < option value="" > All Emotional Ton</option >
              <option value="Motivational">Motivational</option>
              <option value="Sad">Sad</option>
              <option value="Realization">Realization</option>
              <option value="Gratitude">Gratitude</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className='bg-base-100 rounded-4xl border border-base-300 shadow-xl overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className="table w-full">
              {/* head */}
              <thead className='bg-base-200/50'>
                <tr className='border-b border-base-300'>
                  <th className='py-5 px-6 text-[11px] uppercase font-black tracking-widest opacity-60'>Asset</th>
                  <th className='py-5 text-[11px] uppercase font-black tracking-widest opacity-60'>Classification</th>
                  <th className='py-5 text-[11px] uppercase font-black tracking-widest opacity-60'>Saved Date</th>
                  <th className='py-5 text-right px-8 text-[11px] uppercase font-black tracking-widest opacity-60'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-base-300/30'>
                {myFavoritesLesson.length > 0 ? (
                  myFavoritesLesson.map((favorite, index) => (
                    <tr key={favorite._id} className='hover:bg-base-200/40 transition-colors group'>
                      <td className='px-6 py-5'>
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-mono font-bold opacity-30">{String(index + 1).padStart(2, '0')}</span>
                          <span className='text-sm font-black text-neutral group-hover:text-secondary transition-colors italic uppercase tracking-tight'>
                            {favorite.title}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className='flex flex-col gap-1'>
                          <span className='badge badge-ghost badge-sm font-bold border-none bg-secondary/10 text-secondary'>
                            {favorite.category}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className='flex items-center gap-2 text-neutral-content text-xs font-bold'>
                          <CalendarDays size={14} />
                          {new Date(favorite.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                      </td>
                      <td className='px-8 text-right'>
                        <div className='flex justify-end gap-2'>
                          <Link
                            to={`/lesson-details/${favorite.lessonId}`}
                            className='btn btn-ghost btn-sm btn-circle text-neutral-content hover:text-secondary hover:bg-secondary/10'
                          >
                            <Eye size={18} />
                          </Link>
                          <button
                            onClick={() => handleToggleFavorite(favorite.lessonId)}
                            className='btn btn-ghost btn-sm btn-circle text-neutral-content hover:text-error hover:bg-error/10'
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-24 text-center">
                      <div className="flex flex-col items-center gap-3 opacity-20">
                        <LayoutGrid size={64} />
                        <p className="text-xl font-black uppercase tracking-tighter">No Favorites Found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFavorite;
