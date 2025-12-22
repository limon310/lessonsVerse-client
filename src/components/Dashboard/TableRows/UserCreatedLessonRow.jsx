import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import ReportDetailsModal from '../../Modal/ReportDetailsModal'
import { Trash2 } from 'lucide-react';
import { Eye } from 'lucide-react';
import { Pencil } from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import LessonDetailsModal from '../../Modal/LessonDetailsModal';
import UpdatePlantForm from '../../Form/UpdateLessonForm';
import { Link } from 'react-router';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import { FaLock } from 'react-icons/fa';

const UserCreatedLessonRow = ({ lesson, refetch }) => {
  // console.log(lesson)
  const { title, _id, category, createdAt, description, emotional_ton, authorInfo, privacy, access_level, } = lesson || {}
  // formate date
  const formateCreatedAt = new Date(createdAt).toLocaleDateString();

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
    formState: { errors, isSubmitting },
    reset
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
    const id = selectedLesson._id;
    console.log("data from update lesson form", data);
    const updateData = {
      title: data.title,
      access_level: data.access_level,
      category: data.category,
      privacy: data.privacy,
      description: data.description,
      emotional_ton: data.emotional_ton,
    };
    // console.log(updateData);
    axiosSecure.patch(`/my-lessons/${id}`, updateData)
      .then(res => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success('Lesson Update Successful')
          modalRef.current.close();
        }
      })
  }

  // count total save lessons
  const { data: favoriteCount = 0 } = useQuery({
    enabled: !!_id,
    queryKey: ['favorite-Lessoncount', _id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorite-lessons/count/${_id}`);
      return res.data.count;
    }
  });
  // console.log("save count", favoriteCount)

  // reaction count
  const { data: likeCount = 0 } = useQuery({
    enabled: !!_id,
    queryKey: ['reaction-count', _id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/like-lessons/count/${lesson._id}`);
      return res.data.count;
    }
  });


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
          <span className="flex items-center gap-1">
            ❤️ {likeCount}
          </span>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900'>{favoriteCount}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          {/* details icon */}
          <button onClick={() => setIsOpen(true)} className='mr-4 cursor-pointer'>

            <Eye size={20} />
            <LessonDetailsModal
              lesson={lesson}
              likeCount={likeCount}
              favoriteCount={favoriteCount}
              closeModal={closeModal} isOpen={isOpen} />
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
        {/* update modal */}
        <td colSpan={'7'}>
          <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box text-gray-800">
              <h3 className="font-bold text-3xl text-center">Update Lesson</h3>
              <form onSubmit={handleSubmit(handleUpdateLesson)} className="space-y-6">

                {/* --- Lesson Title Field --- */}
                <div className="flex flex-col">
                  <label htmlFor="title" className="mb-2 text-sm font-medium text-gray-700">Lesson Title</label>
                  <input
                    id="title"
                    type="text"
                    defaultValue={title}
                    className={`w-full p-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    {...register("title")}
                  />
                </div>

                {/* --- Category and privacy Fields*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Category Dropdown */}
                  <div className="flex flex-col">
                    <label htmlFor="category" className="mb-2 text-sm font-medium text-gray-700">Category</label>
                    <select
                      id="category"
                      defaultValue={category}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      {...register("category")}
                    >
                      <option value="Personal ">Personal </option>
                      <option value="Growth">Growth</option>
                      <option value="Career">Career</option>
                      <option value="Relationships">Relationships</option>
                      <option value="Mindset">Mindset</option>
                      <option value="Mistakes_learned">Mistakes Learned</option>
                      <option value="Finance_Money">Finance Money</option>
                      <option value="Health_Wellness">Health Wellness</option>
                    </select>
                  </div>

                  {/* Privacy */}
                  <div className="flex flex-col">
                    <label htmlFor="category" className="mb-2 text-sm font-medium text-gray-700">Privacy</label>
                    <select
                      id="privacy"
                      defaultValue={privacy}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      {...register("privacy")}
                    >
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                    </select>
                  </div>
                </div>

                {/* --- Description Textarea --- */}
                <div className="flex flex-col">
                  <label htmlFor="description" className="mb-2 text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="description"
                    defaultValue={lesson.description}
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                    {...register("description")}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* --- access level and emotional ton Fields*/}
                  {/* Emotional Ton Dropdown */}
                  <div className="flex flex-col">
                    <label htmlFor="category" className="mb-2 text-sm font-medium text-gray-700">Emotional Ton</label>
                    <select
                      id="emotional_ton"
                      defaultValue={emotional_ton}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      {...register("emotional_ton")}
                    >
                      <option value="Motivational">Motivational</option>
                      <option value="Sad">Sad</option>
                      <option value="Realization">Realization</option>
                      <option value="Gratitude">Gratitude</option>
                    </select>
                  </div>

                  {/* Access level Input */}
                  <div className="flex flex-col relative group">
                    <label
                      htmlFor="access_level"
                      className="mb-2 text-sm font-medium text-gray-700"
                    >
                      Access Level
                    </label>

                    <select
                      id="access_level"
                      defaultValue={access_level}
                      disabled={!isUserPremium}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 
                      ${errors.access_level ? "border-red-500" : "border-gray-300"}
                      ${!isUserPremium ? "bg-gray-100 cursor-not-allowed" : "focus:ring-blue-500"}`}
                      {...register("access_level")}
                    >
                      <option value="Free">Free</option>
                      <option value="Premium">Premium</option>
                    </select>

                    {/* Tooltip */}
                    {!isUserPremium && (
                      <div className="absolute -top-9 left-0 hidden group-hover:block z-10">
                        <div className="bg-black text-white text-xs px-3 py-1 rounded shadow">
                          Upgrade Premium to create paid lessons
                        </div>
                      </div>
                    )}

                  </div>
                    {/* name */}
                  <div>
                    <label htmlFor='name' className='block mb-2 text-sm mt-2'>
                      Name
                    </label>
                    <input
                      type="name"
                      value={authorInfo.name}
                      disabled
                      className="input input-bordered w-full bg-gray-100"
                    />
                  </div>
                  {/* email */}
                  <div>
                    <label htmlFor='email' className='block mb-2 text-sm mt-2'>
                      Email address
                    </label>
                    <input
                      type="email"
                      value={authorInfo.email}
                      disabled
                      className="input input-bordered w-full bg-gray-100"
                    />
                  </div>

                </div>

                {/* --- Button Group --- */}
                <div className="flex justify-end space-x-4 pt-4">

                  {/* Reset Button */}
                  <button
                    type="button"
                    onClick={() => reset()}
                    className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                    disabled={isSubmitting}
                  >
                    Reset
                  </button>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    // Conditional styling for disabled state
                    className={`px-6 py-2 text-white font-semibold rounded-lg shadow-md transition duration-150 ease-in-out ${isSubmitting
                      ? 'bg-blue-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                      }`}
                  >
                    {isSubmitting ? 'Updating...' : 'Update Lesson'}
                  </button>
                </div>
              </form>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Cancel</button>
                </form>
              </div>
            </div>
          </dialog>
        </td>
      </tr>
    </>

  )
}

export default UserCreatedLessonRow
