import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useAuth from '../../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../Shared/LoadingSpinner'


const UserCreatedLessonRow = () => {

  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // const { data: myLessons = [], isLoading } = useQuery({
  //   queryKey: ['user', user?.email],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/my-lessons/${user?.email}`)
  //     return res.data;
  //   }
  // });
  // console.log(myLessons)
  // if(isLoading){
  //   return <LoadingSpinner></LoadingSpinner>
  // }
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src='https://i.ibb.co.com/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg'
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
        </div>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>Money Plant</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>Indoor</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>$120</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>5</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>Pending</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          onClick={() => setIsOpen(true)}
          className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight'
        >
          <span className='absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full'></span>
          <span className='relative cursor-pointer'>Cancel</span>
        </button>

        <DeleteModal isOpen={isOpen} closeModal={closeModal} />
      </td>
    </tr>
  )
}

export default UserCreatedLessonRow
