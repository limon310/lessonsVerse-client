import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import ReportDetailsModal from '../../Modal/ReportDetailsModal'
import { Trash2 } from 'lucide-react';
import { Eye } from 'lucide-react';
import { Pencil } from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import LessonDetailsModal from '../../Modal/LessonDetailsModal';
import UpdatePlantForm from '../../Form/UpdatePlantForm';
import { Link } from 'react-router';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import { FaLock } from 'react-icons/fa';

const UserCreatedLessonRow = ({ lesson, refetch }) => {
  const { title, _id, category, createdAt, authorInfo, privacy, access_level, } = lesson || {}
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const modalRef = useRef();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [privacyValue, setPrivacyValue] = useState(privacy || "Public");
  const [accessValue, setAccessValue] = useState(access_level || "Free");

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // get user data using tanstack quiry for access level update
  const { data: usersData = [] } = useQuery({
    queryKey: ['usersAccessLevel', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`)
      return res.data;
    }
  });
  const isUserPremium = usersData.isPremium;

  // handle lesson delete
  const handleDelete = (lesson) => {
    // console.log(lesson._id);
    const id = lesson._id;
    // console.log(id);
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

  // handle modal opne
  const handleEditModalOpen = (lesson) => {
    setSelectedLesson(lesson)
    modalRef.current.showModal();
  }

  // Handle Privacy Update
  const handlePrivacyChange = (e) => {
    const newPrivacy = e.target.value;
    setPrivacyValue(newPrivacy);

    axiosSecure.patch(`/my-lessons/${_id}/visibility`, { visibility: newPrivacy })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          toast.success("Visibility updated");
          refetch();
        }
      }).catch(err => console.log(err));
  }

  // Handle Access Level Update
  const handleAccessChange = (e) => {
    const newAccess = e.target.value;
    setAccessValue(newAccess);

    axiosSecure.patch(`/my-lessons/${_id}/access`, { access_level: newAccess })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          toast.success("Access level updated");
          refetch();
        }
      }).catch(err => console.log(err));
  }

  // handle update lesson
  const handleUpdateLesson = (data) => {
    // console.log("data from update lesson form", data);
    const { title, access_level, email, name, createdAt, _id } = data;
    console.log(_id)
    const updateData = {
      title,
      access_level,
      createdAt,
      authorInfo: { name, email }
    }
    console.log(updateData);
    axiosSecure.patch(`/my-lessons/${selectedLesson._id}`, updateData)
      .then(res => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success('Lesson Update Successful')
          modalRef.current.close();
        }
      })
  }

  return (
    <>
      <tr>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <h2 className='text-xl font-semibold'>{title}</h2>
          <p className='text-sm mt-1'>{category}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <select value={privacyValue} onChange={handlePrivacyChange}>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          {
            isUserPremium
              ? <>
                <select value={accessValue} onChange={handleAccessChange}>
                  <option value="Free">Free</option>
                  <option value="Premium">Premium</option>
                </select>
              </>
              : <p className="text-red-500 text-sm">
                Upgrade Premium to<br></br> change access level. <Link to="/upgrade-premium" className="text-blue-500 underline">Upgrade</Link>
              </p>
          }
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
          {/* details icon */}
          <button onClick={() => setIsOpen(true)} className='mr-4 cursor-pointer'>

            <Eye size={20} />
            <LessonDetailsModal lesson={lesson} closeModal={closeModal} isOpen={isOpen} />
          </button>
          {/* update icons */}
          <button onClick={() => handleEditModalOpen(lesson)} className='mr-4 cursor-pointer'>
            <Pencil size={20} />
          </button>

          {/* trush icons */}
          <button onClick={() => handleDelete(lesson)} className='cursor-pointer'>
            <Trash2 size={20} />
          </button>
        </td>
      </tr>
      {/* update modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-gray-800">
          <h3 className="font-bold text-lg">Update Your Bill!</h3>

          <form onSubmit={handleSubmit(handleUpdateLesson)}>
            <fieldset className="fieldset">
              {/* Title */}
              <label className="label">Title</label>
              <input type="text" className="input" defaultValue={lesson.title} {...register("title", { required: true })} />
              {errors.title?.type === "required" && <span className='text-red-500 text-sm'>title is required</span>}
              {/* access level */}
              <label className="label text-lg">Access Level:
                <select
                  id="access_level"
                  className={`w-full p-3 border ${errors.access_level ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-green-500`}
                  {...register("access_level", { required: "Please select access level" })}
                >
                  <option value="Free">Free</option>
                  <option value="Premium">Premium</option>
                </select>
              </label>
              {/* UserName */}
              <label className="label">Name</label>
              <input type="name" className="input" defaultValue={authorInfo.name} {...register("name", { required: true })} />
              {errors.name?.type === "required" && <span className='text-red-500 text-sm'>name is required</span>}
              {/* email */}
              <label className="label">Eamil</label>
              <input type="text" name='email' className="input" defaultValue={authorInfo.email} {...register("email", { required: true })} />
              {errors.email?.type === "required" && <span className='text-red-500 text-sm'>email is required</span>}
              {/* date */}
              <label className="label">Date</label>
              <input type="text" name="time" className="input" defaultValue={lesson.createdAt} {...register("createdAt", { required: true })} />
              {errors.createdAt?.type === "required" && <span className='text-red-500 text-sm'>date is required</span>}
              <button className="btn btn-neutral mt-4">Update</button>
            </fieldset>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </>

  )
}

export default UserCreatedLessonRow
