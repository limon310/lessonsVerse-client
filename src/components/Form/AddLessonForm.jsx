import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import successAnimation from '../../assets/images/Tick Pop.json';
import Lottie from 'lottie-react';
import { BookOpen, ShieldCheck, Sparkles, Info, Crown } from 'lucide-react';

const AddLessonForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showSuccess, setShowSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  // Get user data for premium validation
  const { data: usersData = {} } = useQuery({
    queryKey: ['usersAccessLevel', user?.email],
    queryFn: async () => (await axiosSecure.get(`/users/${user?.email}`)).data
  });
  const isUserPremium = usersData.isPremium;

  const onSubmit = (data) => {
    const lessonData = {
      ...data,
      creatorId: user?.uid,
      authorInfo: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      }
    };

    axiosSecure.post('/lessons', lessonData).then(res => {
      if (res.data.insertedId) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        reset();
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto my-12 relative">
      {/* Background Decor */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />

      <div className="bg-base-100 border border-base-300 shadow-2xl rounded-[2.5rem] overflow-hidden">
        {/* Header Section */}
        <div className="bg-primary p-10 text-primary-content flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-black tracking-tight flex items-center gap-3">
              <BookOpen size={36} /> Add New Lesson
            </h2>
            <p className="mt-2 opacity-80 font-medium">Share your wisdom and realizations with the community</p>
          </div>
          <Sparkles size={60} className="opacity-20 hidden md:block" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-8">
          {/* Title Field */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-neutral-content tracking-widest ml-1">Lesson Title</label>
            <input
              type="text"
              placeholder="e.g., The Art of Patience"
              className={`input input-bordered w-full rounded-2xl bg-base-200/50 border-base-300 focus:ring-2 focus:ring-primary/40 ${errors.title ? 'border-error' : ''}`}
              {...register("title", { required: "Title is required", minLength: 5 })}
            />
            {errors.title && <span className="text-error text-xs font-bold ml-1">{errors.title.message}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-neutral-content tracking-widest ml-1">Category</label>
              <select
                className="select select-bordered w-full rounded-2xl bg-base-200/50"
                {...register("category", { required: "Required" })}
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
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-neutral-content tracking-widest ml-1">Privacy Level</label>
              <select className="select select-bordered w-full rounded-2xl bg-base-200/50" {...register("privacy")}>
                <option value="Public">Public (Everyone can see)</option>
                <option value="Private">Private (Only Premium User)</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-neutral-content tracking-widest ml-1">Lesson Content</label>
            <textarea
              rows="5"
              placeholder="Write the core summary of what you've learned..."
              className="textarea textarea-bordered w-full rounded-2xl bg-base-200/50 border-base-300 resize-none"
              {...register("description", { minLength: { value: 50, message: "Min 50 chars" } })}
            />
            {errors.description && <span className="text-error text-xs font-bold">{errors.description.message}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Emotional Ton */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-neutral-content tracking-widest ml-1">Emotional Tone</label>
              <select className="select select-bordered w-full rounded-2xl bg-base-200/50" {...register("emotional_ton")}>
                <option value="Motivational">🚀 Motivational</option>
                <option value="Realization">💡 Realization</option>
                <option value="Gratitude">🙏 Gratitude</option>
                <option value="Sad">🌧️ Sad</option>
              </select>
            </div>

            {/* Access Level */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs font-black uppercase text-neutral-content tracking-widest ml-1">Access Tier</label>
                {!isUserPremium && <span className="text-[10px] font-black text-warning flex items-center gap-1 uppercase tracking-tighter"><Crown size={12} /> Premium Feature</span>}
              </div>

              <div className="group relative">
                <select
                  disabled={!isUserPremium}
                  className={`select select-bordered w-full rounded-2xl bg-base-200/50 ${!isUserPremium ? 'opacity-50 cursor-not-allowed' : ''}`}
                  {...register("access_level")}
                >
                  <option value="Free">Free for all</option>
                  <option value="Premium">Premium Subscribers only</option>
                </select>

                {!isUserPremium && (
                  <div className="absolute inset-0 bg-transparent" title="Upgrade to Premium to enable paid lessons" />
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-6">
            <button
              type="button"
              onClick={() => reset()}
              className="btn btn-ghost rounded-2xl px-10 font-bold w-full sm:w-auto"
              disabled={isSubmitting}
            >
              Reset Form
            </button>
            <button
              type="submit"
              className="btn btn-primary rounded-2xl px-12 font-black w-full sm:w-auto shadow-lg shadow-primary/30"
              disabled={isSubmitting}
            >
              {isSubmitting ? <span className="loading loading-spinner"></span> : "Publish Lesson"}
            </button>
          </div>
        </form>
      </div>

      {/* Modern Success Toast */}
      {showSuccess && (
        <div className="fixed top-10 right-10 z-100 animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="bg-base-100 border border-base-300 shadow-2xl rounded-3xl p-4 flex items-center gap-4 min-w-[280px]">
            <div className="w-16 h-16">
              <Lottie animationData={successAnimation} loop={false} />
            </div>
            <div>
              <p className="font-black text-neutral">Success!</p>
              <p className="text-xs font-bold text-success uppercase">Lesson Published</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddLessonForm;
