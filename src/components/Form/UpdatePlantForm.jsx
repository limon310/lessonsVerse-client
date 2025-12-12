
import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddLessonForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // console.log("user in dashboard add lesson", user)
  // Initialize useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  // handle add lessons
  const onSubmit = (data) => {
    // console.log('Form Data Submitted:', data);
    const { title, description, category, privacy, emotional_ton, access_level } = data;
    const lessonData = {
      title,
      description,
      category,
      privacy,
      emotional_ton,
      access_level,

      authorInfo: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL
      }
    }
    console.log(lessonData)
    axiosSecure.post('/lessons', lessonData)
      .then(res => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            title: "Lesson Created!",
            icon: "success",
            draggable: true
          });
        }
      })
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-whited shadow-xl rounded-lg border border-gray-200">

      {/* Header */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Update Lesson</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* --- Lesson Title Field --- */}
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-2 text-sm font-medium text-gray-700">Lesson Title</label>
          <input
            id="title"
            type="text"
            placeholder="lesson title here"
            className={`w-full p-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register("title", {
              required: "Lesson title is required.",
              minLength: {
                value: 5,
                message: "Title must be at least 5 characters long."
              }
            })}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
        </div>

        {/* --- Category and privacy Fields*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Category Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="category" className="mb-2 text-sm font-medium text-gray-700">Category</label>
            <select
              id="category"
              className={`w-full p-3 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register("category", { required: "Please select a category." })}
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
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
          </div>

          {/* Privacy */}
          <div className="flex flex-col">
            <label htmlFor="category" className="mb-2 text-sm font-medium text-gray-700">Privacy</label>
            <select
              id="privacy"
              className={`w-full p-3 border ${errors.privacy ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register("privacy", { required: "Please select privacy." })}
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
            {errors.privacy && <p className="mt-1 text-sm text-red-600">{errors.privacy.message}</p>}
          </div>
        </div>

        {/* --- Description Textarea --- */}
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-2 text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            rows="4"
            placeholder="Provide a brief summary of the lesson content."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            {...register("description", {
              maxLength: {
                value: 1000,
                message: "Description cannot exceed 500 characters."
              }
            })}
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* --- access level and emotional ton Fields*/}
          {/* Emotional Ton Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="category" className="mb-2 text-sm font-medium text-gray-700">Emotional Ton</label>
            <select
              id="emotional_ton"
              className={`w-full p-3 border ${errors.emotional_ton ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register("emotional_ton", { required: "Please select a Ton." })}
            >
              <option value="Motivational">Motivational</option>
              <option value="Sad">Sad</option>
              <option value="Realization">Realization</option>
              <option value="Gratitude">Gratitude</option>
            </select>
            {errors.emotional && <p className="mt-1 text-sm text-red-600">{errors.emotional_ton.message}</p>}
          </div>

          {/* Access level Input */}
          <div className="flex flex-col">
            <label htmlFor="category" className="mb-2 text-sm font-medium text-gray-700">Access Level</label>
            <select
              id="access_level"
              className={`w-full p-3 border ${errors.access_level ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register("access_level", { required: "Please select access level" })}
            >
              <option value="Free">Free</option>
              {
                <option value="Premium">Premium</option>
              }
            </select>
            {errors.access_level && <p className="mt-1 text-sm text-red-600">{errors.access_level.message}</p>}
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
    </div>
  );
};

export default AddLessonForm;
