import { useQuery } from '@tanstack/react-query'
import PlantDataRow from '../../../components/Dashboard/TableRows/PlantDataRow'
import { Eye, User, X } from 'lucide-react'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import toast from 'react-hot-toast'
import { Link } from 'react-router'

const MyFavorite = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myFavoritesLesson = [], isLoading, refetch } = useQuery({
    enabled: !!user?.email,
    queryKey: ['my-favorites', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-favorite-lessons/${user?.email}`)
      return res.data || {};
    }
  })
  // console.log("favorite lessons form my favorite lessons route", myFavoritesLesson);

    // remove from favorite
    const handleToggleFavorite = (lessonId) => {
    axiosSecure.delete(`/remove-favorite/${lessonId}`)
      .then((res) => {
        console.log(res.data);
        if(res.data.deletedCount>0){
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
        <div className='py-8'>
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
                    <td>{index +1}</td>
                    <td>{favorite.title}</td>
                    <td>{favorite.createdAt}</td>
                    <td>
                      <button
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
