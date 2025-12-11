import Container from '../../components/Shared/Container'
import Heading from '../../components/Shared/Heading'
import Button from '../../components/Shared/Button/Button'
import ReportModal from '../../components/Modal/ReportModal'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark, FaFlag } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

const LessonDetails = () => {
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => {
    setIsOpen(false)
  }
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  // console.log(id);
  const { data: lesson = {}, isLoading } = useQuery({
    queryKey: ["lessons-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessonDetails/${id}`)
      return res.data;
    }
  })
  console.log(lesson)
  const { title, description, category, emotional_ton, createdAt, privacy, authorInfo } = lesson;
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const views = Math.floor(Math.random() * 10000);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

      {/* 1. Lesson Info */}
      <section className="space-y-4">
        {/* Featured Image */}
        {lesson?.featuredImage && (
          <img
            src={lesson.featuredImage}
            alt="featured"
            className="w-full h-80 object-cover rounded-xl shadow-sm"
          />
        )}

        {/* Title */}
        <h1 className="text-3xl font-bold">{title}</h1>

        {/* Category + Tone */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
            {category}
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full">
            {emotional_ton}
          </span>
        </div>

        {/* Full Description */}
        <p className="text-gray-700 leading-7 whitespace-pre-line">
          {description}
        </p>
      </section>


      {/* 2. Metadata */}
      <section className="bg-gray-50 p-4 rounded-xl border space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="font-medium">Created:</span>
          <span>{createdAt}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Last Updated:</span>
          <span>{createdAt}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Visibility:</span>
          <span className="text-green-600">{privacy}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Reading Time:</span>
          <span>{lesson?.readingTime || "3–5 minutes"}</span>
        </div>
      </section>


      {/* 3. Author Section */}
      <section className="p-5 rounded-xl border bg-white flex items-center gap-4">
        <img
          src={authorInfo?.image}
          alt="author"
          className="w-16 h-16 rounded-full object-cover border"
        />

        <div className="flex-1">
          <p className="font-semibold text-lg">{authorInfo?.name}</p>
          <p className="text-sm text-gray-500">Total Lessons: {authorInfo?.count || 0}</p>
        </div>

        <Link to='/dashboard/profile'
          className="px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700"

        >
          View all by this author
        </Link>
      </section>


      {/* 4. Stats Section */}
      <section className="flex items-center gap-6 text-gray-600 text-lg">
        <span className="flex items-center gap-1">
          ❤️ {0}
        </span>
        {/* <span className="flex items-center gap-1">
          ❤️ {lesson?.likes || 0}
        </span> */}

        <span className="flex items-center gap-1">
          🔖 {lesson?.favorites || 0}
        </span>

        <span className="flex items-center gap-1">
          <FaEye /> {views.toLocaleString()} Views
        </span>
      </section>


      {/* 5. Interaction Buttons */}
      <section className="flex items-center gap-4">
        {/* Save */}
        <button
          onClick={() => setSaved(!saved)}
          className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-100"
        >
          {saved ? <FaBookmark /> : <FaRegBookmark />}
          {saved ? "Saved" : "Save to Favorites"}
        </button>

        {/* Like */}
        <button
          onClick={() => setLiked(!liked)}
          className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-100"
        >
          {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          {liked ? "Liked" : "Like"}
        </button>

        {/* Report */}
        <div>
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-100 text-red-600"
          >
            <FaFlag /> Report Lesson
          </button>
          <ReportModal
            plant={lesson}
            closeModal={closeModal}
            isOpen={isOpen}
          >

          </ReportModal>
        </div>

      </section>


      {/* 6. Comments Section */}
      <section className="space-y-6 mt-8">
        <h2 className="text-xl font-bold">Comments</h2>

        {/* Add comment */}
        <div className="space-y-3">
          <textarea
            placeholder="Write a comment..."
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring"
            rows="3"
          ></textarea>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
            Post Comment
          </button>
        </div>

        {/* Existing comments */}
        <div className="space-y-4">
          {/* Example static comments, replace with map */}
          <div className="p-4 border rounded-xl bg-gray-50">
            <p className="font-medium">Demo User</p>
            <p className="text-sm text-gray-600">This lesson was amazing!</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LessonDetails
