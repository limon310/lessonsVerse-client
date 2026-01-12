import { Dialog, DialogTitle, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Eye, Calendar, Globe, Clock, Heart, Bookmark, User, X } from 'lucide-react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const views = Math.floor(Math.random() * 10000);

const LessonDetailsModal = ({ closeModal, isOpen, lesson, favoriteCount, likeCount }) => {
  const { title, category, emotional_ton, createdAt, privacy, authorInfo } = lesson || {};
  const axiosSecure = useAxiosSecure();
  const dateFormate = new Date(createdAt).toLocaleDateString();

  const { data: totalLesson } = useQuery({
    queryKey: ['totalLesson-count', authorInfo?.email],
    enabled: !!authorInfo?.email && isOpen,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/lessons/count/${authorInfo?.email}`);
      return res.data;
    }
  });

  return (
    <Transition grow show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={closeModal}>
        {/* Backdrop overlay */}
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-neutral/30 backdrop-blur-sm' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-lg transform overflow-hidden rounded-[2.5rem] bg-base-100 p-8 shadow-2xl transition-all border border-base-300 relative'>

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute right-6 top-6 btn btn-ghost btn-sm btn-circle text-neutral-content hover:bg-base-300"
                >
                  <X size={20} />
                </button>

                {/* Header Section */}
                <DialogTitle as='div' className="space-y-1 mb-6">
                  <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
                    <Info size={14} /> Lesson Insight
                  </div>
                  <h1 className="text-3xl font-black text-neutral leading-tight">
                    {title}
                  </h1>
                </DialogTitle>

                <div className='space-y-6'>
                  {/* Category + Tone Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge badge-primary font-bold px-4 py-3 rounded-xl">{category}</span>
                    <span className="badge badge-accent font-bold px-4 py-3 rounded-xl">{emotional_ton}</span>
                    <span className="badge badge-ghost border-base-300 font-bold px-4 py-3 rounded-xl gap-2">
                      <Clock size={14} /> {lesson?.readingTime || "3–5 min"}
                    </span>
                  </div>

                  {/* Metadata Card */}
                  <section className="bg-base-200 border border-base-300 rounded-3xl p-5 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-neutral-content text-sm font-medium">
                        <Calendar size={16} className="text-primary" /> Created Date
                      </div>
                      <span className="text-neutral font-bold text-sm">{dateFormate}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-neutral-content text-sm font-medium">
                        <Globe size={16} className="text-accent" /> Visibility
                      </div>
                      <span className={`badge badge-sm font-bold ${privacy === 'Public' ? 'bg-success/10 text-success border-none' : 'bg-base-300 text-neutral-content border-none'}`}>
                        {privacy}
                      </span>
                    </div>
                  </section>

                  {/* Stats Counter */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-base-100 border border-base-300 rounded-2xl p-3 flex flex-col items-center justify-center">
                      <Heart size={18} className="text-error mb-1" fill="oklch(var(--er))" />
                      <span className="text-lg font-black text-neutral">{likeCount}</span>
                      <span className="text-[9px] uppercase font-bold text-neutral-content">Likes</span>
                    </div>
                    <div className="bg-base-100 border border-base-300 rounded-2xl p-3 flex flex-col items-center justify-center">
                      <Bookmark size={18} className="text-primary mb-1" fill="oklch(var(--p))" />
                      <span className="text-lg font-black text-neutral">{favoriteCount}</span>
                      <span className="text-[9px] uppercase font-bold text-neutral-content">Saves</span>
                    </div>
                    <div className="bg-base-100 border border-base-300 rounded-2xl p-3 flex flex-col items-center justify-center">
                      <Eye size={18} className="text-accent mb-1" />
                      <span className="text-lg font-black text-neutral">{views}</span>
                      <span className="text-[9px] uppercase font-bold text-neutral-content">Views</span>
                    </div>
                  </div>

                  {/* Author Profile */}
                  <section className="p-5 rounded-3xl border border-base-300 bg-base-200 flex items-center gap-4 group transition-all hover:border-primary/50">
                    <div className="relative">
                      <img
                        referrerPolicy='no-referrer'
                        src={authorInfo?.image}
                        alt="author"
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-base-100 shadow-md"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-success w-4 h-4 rounded-full border-2 border-base-200"></div>
                    </div>

                    <div className="flex-1">
                      <p className="font-black text-neutral flex items-center gap-2">
                        {authorInfo?.name}
                      </p>
                      <p className="text-xs text-neutral-content font-medium flex items-center gap-1">
                        <User size={12} className="text-primary" />
                        {totalLesson?.totalCreatedLessons || 0} Lessons Published
                      </p>
                    </div>
                  </section>
                </div>

                {/* Footer Action */}
                <div className='mt-8 pt-6 border-t border-base-300 flex justify-end'>
                  <button
                    type='button'
                    className='btn btn-primary btn-md rounded-2xl px-8 font-black'
                    onClick={closeModal}
                  >
                    Close Preview
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const Info = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
  </svg>
);

export default LessonDetailsModal;
