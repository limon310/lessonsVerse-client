import { useQuery } from '@tanstack/react-query'
import { Eye, User, X } from 'lucide-react'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import toast from 'react-hot-toast'
import { Link } from 'react-router'
import { useState } from 'react'

const MyFavorite = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [category, setCategory] = useState("");
  const [emotional_ton, setEmotional_ton] = useState("");

  const { data: myFavoritesLesson = [], isLoading, refetch } = useQuery({
    enabled: !!user?.email,
    queryKey: ['my-favoritesLessons', category, emotional_ton],
    queryFn: async () => {
      const params = {};
      if(category)params.category = category;
      if(emotional_ton)params.emotional_ton = emotional_ton
      const res = await axiosSecure.get('/my-favorite-lessons', {params})
      return res.data;
    }
  })
  // console.log("favorite lessons form my favorite lessons route", myFavoritesLesson);

  // remove from favorite
  const handleToggleFavorite = (lessonId) => {
    axiosSecure.delete(`/remove-favorite/${lessonId}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          toast.success("remove from favorite");
          refetch();
        }
      });
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }
  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        {/* dynamic title */}
        <title>My Favorite Lessons</title>
        <div className='py-8'>
          <h2 className='text-3xl font-bold text-purple-500'>Filter By:</h2>
          {/* filter */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-6">
            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border px-3 py-2 rounded"
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

            {/* emotional_ton */}
            <select
              value={emotional_ton}
              onChange={(e)=> setEmotional_ton(e.target.value)}
              className='border px-3 py-2 rounded'
            >
              <option value="">All Emotional Ton</option>
              <option value="Motivational">Motivational</option>
              <option value="Sad">Sad</option>
              <option value="Realization">Realization</option>
              <option value="Gratitude">Gratitude</option>
            </select>
          </div>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr className='text-lg font-bold'>
                    <th>#</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Remove From Favorite</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {
                    myFavoritesLesson.map((favorite, index) => <tr key={favorite._id}>
                      <td>{index + 1}</td>
                      <td>{favorite.title}</td>
                      <td>{new Date(favorite.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button className='btn bg-red-300 cursor-pointer'
                          onClick={() => handleToggleFavorite(favorite.lessonId)}
                        ><X /></button>
                      </td>
                      <td>
                        <Link to={`/lesson-details/${favorite._id}`}><Eye size={20} /></Link>
                      </td>
                    </tr>)
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

export default MyFavorite
