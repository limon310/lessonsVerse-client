import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import UpdatePlantModal from '../../Modal/UpdatePlantModal'
import { Trash2 } from 'lucide-react';
import { Eye } from 'lucide-react';
import { Pencil } from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const UserCreatedLessonRow = ({ lesson, refetch }) => {
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const axiosSecure = useAxiosSecure();

  const { title, _id, category, createdAt, privacy, emotional_ton, access_level, } = lesson || {}

  // handle lesson delete
  const handleDelete = (lesson) => {
    // console.log(lesson._id);
    const id = lesson._id;
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log("clicked delete button")
        axiosSecure.delete(`/lesson/${id}`)
          .then(res => {
            refetch();
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          })

      }
    });
  }

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <h2 className='text-xl font-semibold'>{title}</h2>
        <p className='text-sm mt-1'>{category}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <select name="" id="privacy">
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <select name="" id="privacy">
          <option value="Free">Free</option>
          <option value="Premium">Premium</option>
        </select>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{createdAt}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>0</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>0</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button className='mr-4'>
          <Eye size={20} />
        </button>
        <button className='mr-4'>
          <Pencil size={20} />
        </button>
        <button onClick={()=> handleDelete(lesson)}>
          <Trash2 size={20} />
        </button>
      </td>
    </tr>
  )
}

export default UserCreatedLessonRow
