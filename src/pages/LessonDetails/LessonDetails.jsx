import Container from '../../components/Shared/Container'
import Heading from '../../components/Shared/Heading'
import Button from '../../components/Shared/Button/Button'
import ReportModal from '../../components/Modal/ReportModal'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import { FaHeart, FaRegHeart, FaFlag } from "react-icons/fa";
import { FaEye, FaShareFromSquare } from "react-icons/fa6";
import { User } from 'lucide-react'
import useAuth from '../../hooks/useAuth'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  TelegramShareButton,
  LinkedinIcon,
  WhatsappIcon,
  TelegramIcon,
  TwitterIcon
} from "react-share";
import { useRef } from 'react'
import LessonCard from '../../components/Shared/LessonCard/LessonCard'
import SemilarLessonCard from '../../components/Shared/SemilarLessonCard/SemilarLessonCard'

// random view
const views = Math.floor(Math.random() * 10000);

const LessonDetails = () => {
  const { user } = useAuth();
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => {
    setIsOpen(false)
  }
  const modalRef = useRef();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
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
  // console.log(lesson)
  const { title, description, category, emotional_ton, createdAt, privacy, authorInfo, } = lesson;

  // get semilar or reccomended lessons by category or emotional_ton
  const {
    data: similarLessons = [],
    isLoading: similarLessonsLoading
  } = useQuery({
    queryKey: ["similar-lessons", id, category, emotional_ton],
    enabled: !!category || !!emotional_ton,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/similar-lessons?category=${category}&tone=${emotional_ton}&exclude=${id}`
      );
      return res.data;
    }
  });

  // console.log("semilar lessons", similarLessons)

  // interaction button

  // favorite count
  const { data: favoriteCount = 0, refetch: refetchCount } = useQuery({
    enabled: !!lesson._id,
    queryKey: ['favorite-count', lesson._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorite-lessons/count/${lesson._id}`);
      return res.data.count;
    }
  });

  // like count
  const { data: likeCount = 0, refetch: refetchLikeCount } = useQuery({
    enabled: !!lesson._id,
    queryKey: ['like-count', lesson._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/like-lessons/count/${lesson._id}`);
      return res.data.count;
    }
  });

  // initial check if user has favorited/liked
  useEffect(() => {
    if (!user?.email || !lesson._id) return;

    // favorite
    axiosSecure
      .get(`/favorite-lessons/check?lessonId=${lesson._id}&email=${user.email}`)
      .then(res => setIsFavorited(res.data.isFavorited));

    // like
    axiosSecure
      .get(`/like-lessons/check?lessonId=${lesson._id}&email=${user.email}`)
      .then(res => setIsLiked(res.data.isLiked));
  }, [lesson._id, user, axiosSecure]);

  // favorite button toogle
  const handleToggleFavorite = () => {
    axiosSecure.post(`/favorite-lessons/${lesson._id}`, { email: user?.email, title: lesson.title })
      .then(res => {
        setIsFavorited(res.data.action === 'added');
        refetchCount();
      });
  };

  // handle like button toogle
  const handleToggleLike = () => {
    if (!user) return alert("Please login to like");

    axiosSecure.post(`/like-lessons/${lesson._id}`, { email: user.email })
      .then(res => {
        setIsLiked(res.data.action === "added");
        refetchLikeCount();
      });
  };

  // get user comment
  const { data: userComments = [], isLoading: userCommentsLoading, refetch: commentRefetch } = useQuery({
    queryKey: ['user-comments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/getUser-comment')
      return res.data;
    }
  })
  // console.log(userComments);

  // save user comment in db
  const handlePostComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    console.log(comment);
    const userInfo = {
      message: comment,
      image: user?.photoURL,
      userId: user?.uid,
      displayName: user?.displayName,
      email: user?.email,
      createdAt: new Date(),
    }
    axiosSecure.post('/lesson-comment', userInfo)
      .then(res => {
        console.log(res.data);
        if (res.data.insertedId) {
          toast.success("post comment");
          e.target.reset();
          commentRefetch();
        }
      })
    // postCommentMutation.mutate(userInfo)
    // e.target.reset();
  }

  // count total lesson created
  const { data: totalLesson, isLoading: totalLessonLoading } = useQuery({
    queryKey: ['totalLesson-count', authorInfo?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/lessons/count/${authorInfo?.email}`)
      return res.data;
    }
  })
  // console.log(totalLesson)

  // handle open share modal
  const handleOpneShareModal = () => {
    modalRef.current.showModal();
  }

  // Fetch logged-in user's details from DB
  const { data: userData = {}, isLoading: userLoading } = useQuery({
    queryKey: ['userInPublicLessons', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`users/${user?.email}`);
      return res.data;
    }
  });

  const isUserPremium = userData?.isPremium;

  if (isLoading || userCommentsLoading || totalLessonLoading || similarLessonsLoading || userLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }
  const shareUrl = `http://localhost:3000/lesson-details/69438b28a0bf90ca51d281f6`;
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

      <div className='flex justify-between'>

        <div>
          {/* 4. Stats Section */}
          <section className="flex items-center py-5 gap-6 text-gray-600 text-lg">
            <span className="flex items-center gap-1">
              ❤️ {likeCount}
            </span>

            <span className="flex items-center gap-1">
              🔖 {favoriteCount}
            </span>

            <span className="flex items-center gap-1">
              <FaEye /> {views.toLocaleString()} Views
            </span>
          </section>

          {/* 5. Interaction Buttons */}
          <section className="flex items-center gap-4">
            {/* Save */}
            <button
              onClick={handleToggleFavorite}
              className={`px-4 py-2 border rounded flex items-center gap-2
         ${isFavorited ? 'bg-red-100 border-red-400' : 'hover:bg-gray-100'}`}
            >
              🔖 {isFavorited ? 'Saved' : 'Save to Favorite'}
            </button>

            {/* Like */}
            <button
              onClick={handleToggleLike}
              className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-100"
            >
              {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              {isLiked ? "Liked" : "Like"}
            </button>

            {/* Report */}
            <div>
              <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-100 text-red-600"
              >
                <FaFlag /> Report
              </button>
              <ReportModal
                lesson={lesson}
                closeModal={closeModal}
                isOpen={isOpen}
              >

              </ReportModal>
            </div>
            <button onClick={handleOpneShareModal} className='btn btn-outline px-4'>Share  <FaShareFromSquare size={20} /></button>
          </section>
        </div>
        {/* 2. Metadata */}
        <section className="bg-gray-50 w-[300px] p-4 rounded-xl border space-y-2 text-sm">
          <div className="flex justify-between ">
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
      </div>

      {/* 3. Author Section */}
      <section className=" p-5 rounded-xl border bg-white flex items-center gap-4">
        <img
          src={authorInfo?.image}
          alt="author"
          className="w-16 h-16 rounded-full object-cover border"
        />

        <div className="flex-1">
          <p className="font-semibold text-lg">{authorInfo?.name}</p>
          <p className="text-sm text-gray-500">Total Lessons: {totalLesson.totalCreatedLessons}</p>
        </div>

        <Link to='/dashboard/profile'
          className="px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700"

        >
          View all by this author
        </Link>
      </section>

      {/* 6. Comments Section */}
      <section className="space-y-6 mt-8">
        <h2 className="text-xl font-bold">Comments</h2>

        {/* Add comment */}
        <div className="space-y-3">
          <form onSubmit={handlePostComment}>
            <textarea
              placeholder="Write a comment..."
              name='comment'
              className="w-full border p-3 rounded-xl focus:outline-none focus:ring"
              rows="3"
            ></textarea>

            <button
              type='submit'
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              Post Comment
            </button>
          </form>
        </div>

        {/* Existing comments */}
        <div className="space-y-4">
          {/* Example static comments, replace with map */}
          {
            userComments.map(comment => <div key={comment._id} className="p-4 border rounded-xl bg-gray-50">
              <div className='flex gap-3 items-center'>
                <img src={comment.image} alt="user Photo"
                  className='w-[50px] h-[50px] rounded-full'
                />
                <p className="font-medium">{comment.displayName}</p>
              </div>
              <p className="text-sm text-gray-600">{comment.message}</p>
            </div>)
          }

        </div>
      </section>

      <div>
        <h2 className='text-3xl font-bold py-8 text-pink-500'>Recommended Lesson</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
          {
            similarLessons.map(recommended => <SemilarLessonCard
              key={recommended._id}
              recommended={recommended}
              isUserPremium={isUserPremium}
            >
            </SemilarLessonCard>)
          }
        </div>
      </div>

      {/* share modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Share Now</h3>
          <div className='flex gap-4 py-8'>
            {/* facebook share button */}
            <FacebookShareButton url={shareUrl} quote={title}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            {/* linked in */}
            <LinkedinShareButton url={shareUrl} quote={title}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            {/* whatsup */}
            <WhatsappShareButton url={shareUrl} quote={title}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            {/* telegram */}
            <TelegramShareButton url={shareUrl} quote={title}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
            <TwitterShareButton url={shareUrl} quote={title}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default LessonDetails
