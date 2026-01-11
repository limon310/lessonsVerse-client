import ReportModal from '../../components/Modal/ReportModal'
import { useState, useRef, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import { FaHeart, FaRegHeart, FaFlag, FaCalendarAlt, FaClock, FaCheckCircle } from "react-icons/fa";
import { FaEye, FaShareNodes } from "react-icons/fa6";
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import {
  FacebookIcon, FacebookShareButton, LinkedinShareButton, WhatsappShareButton,
  TwitterShareButton, TelegramShareButton, LinkedinIcon, WhatsappIcon,
  TelegramIcon, TwitterIcon
} from "react-share";
import LessonCard from '../../components/Shared/LessonCard/LessonCard'

const views = Math.floor(Math.random() * 10000);

const LessonDetails = () => {
  const { user } = useAuth();
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const modalRef = useRef();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  // Queries
  const { data: lesson = {}, isLoading } = useQuery({
    queryKey: ["lessons-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessonDetails/${id}`)
      return res.data;
    }
  })

  const { title, description, category, emotional_ton, createdAt, privacy, authorInfo, creatorId, featuredImage } = lesson;
  const dateFormate = new Date(createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const { data: similarLessons = [], isLoading: similarLessonsLoading } = useQuery({
    queryKey: ["similar-lessons", id, category, emotional_ton],
    enabled: !!category || !!emotional_ton,
    queryFn: async () => {
      const res = await axiosSecure.get(`/similar-lessons?category=${category}&tone=${emotional_ton}&id=${id}`);
      return res.data;
    }
  });

  const { data: favoriteCount = 0, refetch: refetchCount } = useQuery({
    enabled: !!lesson._id,
    queryKey: ['favorite-count', lesson._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorite-lessons/count/${lesson._id}`);
      return res.data.count;
    }
  });

  const { data: likeCount = 0, refetch: refetchLikeCount } = useQuery({
    enabled: !!lesson._id,
    queryKey: ['like-count', lesson._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/like-lessons/count/${lesson._id}`);
      return res.data.count;
    }
  });

  const { data: userComments = [], isLoading: userCommentsLoading, refetch: commentRefetch } = useQuery({
    queryKey: ['user-comments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/getUser-comment')
      return res.data;
    }
  })

  const { data: totalLesson = { totalCreatedLessons: 0 }, isLoading: totalLessonLoading } = useQuery({
    queryKey: ['totalLesson-count', authorInfo?.email],
    enabled: !!authorInfo?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/lessons/count/${authorInfo.email}`)
      return res.data;
    }
  })

  const { data: userData = {} } = useQuery({
    queryKey: ['userInPublicLessons', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`users/${user?.email}`);
      return res.data;
    }
  });

  useEffect(() => {
    if (!user?.email || !lesson._id) return;
    axiosSecure.get(`/favorite-lessons/check?lessonId=${lesson._id}&email=${user.email}`)
      .then(res => setIsFavorited(res.data.isFavorited));
    axiosSecure.get(`/like-lessons/check?lessonId=${lesson._id}&email=${user.email}`)
      .then(res => setIsLiked(res.data.isLiked));
  }, [lesson._id, user, axiosSecure]);

  // Handlers
  const handleToggleFavorite = () => {
    axiosSecure.post(`/favorite-lessons/${lesson._id}`, { email: user?.email, title, category, emotional_ton })
      .then(res => {
        setIsFavorited(res.data.action === 'added');
        refetchCount();
        toast.success(res.data.action === 'added' ? "Saved to favorites" : "Removed from favorites");
      });
  };

  const handleToggleLike = () => {
    if (!user) return toast.error("Please login to like");
    axiosSecure.post(`/like-lessons/${lesson._id}`, { email: user.email })
      .then(res => {
        setIsLiked(res.data.action === "added");
        refetchLikeCount();
      });
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const userInfo = {
      message: comment,
      image: user?.photoURL,
      userId: user?.uid,
      displayName: user?.displayName,
      email: user?.email,
      createdAt: new Date(),
    }
    axiosSecure.post('/lesson-comment', userInfo).then(res => {
      if (res.data.insertedId) {
        toast.success("Comment posted");
        e.target.reset();
        commentRefetch();
      }
    })
  }

  const shareUrl = window.location.href;

  if (isLoading || userCommentsLoading || totalLessonLoading || similarLessonsLoading) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-base-100 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left Column: Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Header Section */}
            <header className="space-y-6">
              {featuredImage && (
                <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-lg border border-base-300">
                  <img src={featuredImage} alt={title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="space-y-4">
                <div className="flex gap-2">
                  <span className="badge badge-primary badge-outline font-medium px-4 py-3">{category}</span>
                  <span className="badge badge-accent badge-outline font-medium px-4 py-3">{emotional_ton}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-neutral tracking-tight">
                  {title}
                </h1>
              </div>

              {/* Action Bar */}
              <div className="flex flex-wrap items-center justify-between py-4 border-y border-base-300 gap-4">
                <div className="flex items-center gap-6">
                  <button onClick={handleToggleLike} className="flex items-center gap-2 group transition-colors cursor-pointer">
                    {isLiked ? <FaHeart className="text-error text-2xl" /> : <FaRegHeart className="text-2xl group-hover:text-error" />}
                    <span className="font-bold text-neutral">{likeCount}</span>
                  </button>
                  <button onClick={handleToggleFavorite} className="flex items-center gap-2 group transition-colors cursor-pointer">
                    <span className={`text-2xl ${isFavorited ? 'text-primary' : 'text-neutral-content group-hover:text-primary'}`}>
                      {isFavorited ? '🔖' : '📑'}
                    </span>
                    <span className="font-bold text-neutral">{favoriteCount}</span>
                  </button>
                  <div className="flex items-center gap-2 text-neutral-content">
                    <FaEye className="text-xl" />
                    <span className="font-medium">{views.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => modalRef.current.showModal()} className="btn btn-ghost btn-sm gap-2">
                    <FaShareNodes /> Share
                  </button>
                  <button onClick={() => setIsOpen(true)} className="btn btn-ghost btn-sm text-error gap-2">
                    <FaFlag /> Report
                  </button>
                </div>
              </div>
            </header>

            {/* Content Body */}
            <article className="prose prose-lg max-w-none text-neutral-content leading-relaxed">
              <p className="whitespace-pre-line">{description}</p>
            </article>

            {/* Comments Section */}
            <section className="pt-10 space-y-8">
              <h3 className="text-2xl font-bold text-neutral">Discussion ({userComments.length})</h3>

              <form onSubmit={handlePostComment} className="bg-base-200 p-6 rounded-2xl border border-base-300 space-y-4">
                <textarea
                  required
                  name='comment'
                  placeholder="Share your thoughts on this lesson..."
                  className="textarea textarea-bordered w-full bg-base-100 focus:ring-primary h-24 text-base"
                />
                <div className="flex justify-end">
                  <button type='submit' className="btn btn-primary px-8">Post Comment</button>
                </div>
              </form>

              <div className="space-y-6">
                {userComments.map(comment => (
                  <div key={comment._id} className="flex gap-4 p-4 rounded-xl hover:bg-base-200 transition-colors">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={comment.image} alt="User" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-neutral">{comment.displayName}</h4>
                        <span className="text-xs text-neutral-content">• Just now</span>
                      </div>
                      <p className="mt-1 text-neutral-content">{comment.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <aside className="space-y-8">

            {/* Metadata Card */}
            <div className="card bg-base-200 border border-base-300 shadow-sm">
              <div className="card-body space-y-4">
                <h3 className="font-bold text-lg border-b border-base-300 pb-2">Lesson Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-neutral-content"><FaCalendarAlt /> Published</span>
                    <span className="font-semibold">{dateFormate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-neutral-content"><FaClock /> Reading Time</span>
                    <span className="font-semibold">{lesson?.readingTime || "5 min read"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-neutral-content"><FaCheckCircle className="text-success" /> Visibility</span>
                    <span className="badge badge-success badge-sm badge-outline uppercase tracking-wider">{privacy}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Author Card */}
            <div className="card bg-primary text-primary-content shadow-xl overflow-hidden">
              <div className="card-body items-center text-center space-y-3">
                <div className="avatar">
                  <div className="w-20 h-20 rounded-full border-4 border-primary-content/20 shadow-lg">
                    <img src={authorInfo?.image} alt="Author" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{authorInfo?.name}</h3>
                  <p className="text-sm opacity-80">{totalLesson.totalCreatedLessons} Lessons Created</p>
                </div>
                <button
                  onClick={() => navigate(`/authorProfile/${creatorId}`)}
                  className="btn btn-neutral text-base-100 btn-block mt-2"
                >
                  View Author Profile
                </button>
              </div>
            </div>

            {/* Recommendations Section */}
            <div className="space-y-4">
              <h3 className="font-bold text-xl text-neutral">Recommended</h3>
              <div className="grid grid-cols-1 gap-4">
                {similarLessons.slice(0, 3).map(recommended => (
                  <LessonCard
                    key={recommended._id}
                    lesson={recommended}
                    isUserPremium={userData?.isPremium}
                  />
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>

      {/* Share Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box bg-base-100 max-w-sm">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-2xl text-center mb-6">Share Lesson</h3>
          <div className='flex flex-wrap justify-center gap-6 py-4'>
            <FacebookShareButton url={shareUrl} quote={title}><FacebookIcon size={48} round /></FacebookShareButton>
            <LinkedinShareButton url={shareUrl}><LinkedinIcon size={48} round /></LinkedinShareButton>
            <WhatsappShareButton url={shareUrl} title={title}><WhatsappIcon size={48} round /></WhatsappShareButton>
            <TwitterShareButton url={shareUrl} title={title}><TwitterIcon size={48} round /></TwitterShareButton>
            <TelegramShareButton url={shareUrl} title={title}><TelegramIcon size={48} round /></TelegramShareButton>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop bg-black/40"><button>close</button></form>
      </dialog>

      <ReportModal lesson={lesson} closeModal={closeModal} isOpen={isOpen} />
    </div>
  )
}

export default LessonDetails
