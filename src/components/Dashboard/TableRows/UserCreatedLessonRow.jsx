import { useState, useRef } from 'react';
import { Trash2, Eye, Pencil, Heart, Bookmark, Lock, ShieldCheck, Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import LessonDetailsModal from '../../Modal/LessonDetailsModal';

const UserCreatedLessonRow = ({ lesson, refetch }) => {
  const { title, _id, category, emotional_ton, authorInfo, privacy, access_level } = lesson || {};
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();

  // Local State
  const [isOpen, setIsOpen] = useState(false);
  const [privacyValue, setPrivacyValue] = useState(privacy || "Public");
  const [accessValue, setAccessValue] = useState(access_level || "Free");

  const closeModal = () => setIsOpen(false);

  // Form Handling
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  // Queries
  const { data: usersData = {} } = useQuery({
    queryKey: ['usersAccessLevel', user?.email],
    queryFn: async () => (await axiosSecure.get(`/users/${user?.email}`)).data
  });

  const { data: favoriteCount = 0 } = useQuery({
    enabled: !!_id,
    queryKey: ['favorite-count', _id],
    queryFn: async () => (await axiosSecure.get(`/favorite-lessons/count/${_id}`)).data.count
  });

  const { data: likeCount = 0 } = useQuery({
    enabled: !!_id,
    queryKey: ['like-count', _id],
    queryFn: async () => (await axiosSecure.get(`/like-lessons/count/${_id}`)).data.count
  });

  const isUserPremium = usersData.isPremium;

  // Handlers
  const handleDelete = (id) => {
    Swal.fire({
      title: "<span style='color: oklch(var(--n))'>Delete Lesson?</span>",
      html: "<span style='color: oklch(var(--nc))'>This action cannot be undone!</span>",
      icon: "warning",
      iconColor: "oklch(var(--er))", // Error color from your theme
      showCancelButton: true,
      background: "oklch(var(--b1))", // Base 100 background

      // Custom Classes for full control
      customClass: {
        popup: 'rounded-[2rem] border border-base-300 shadow-2xl',
        confirmButton: 'btn btn-error rounded-xl px-6 font-bold text-white border-none',
        cancelButton: 'btn btn-ghost rounded-xl px-6 font-bold text-neutral-content'
      },

      buttonsStyling: false, // Default Swal button styling বন্ধ করে DaisyUI ক্লাস ব্যবহারের জন্য
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/lesson/${id}`);
          if (res.data.deletedCount > 0) {
            refetch();
            toast.success("Lesson deleted successfully", {
              style: {
                borderRadius: '16px',
                background: 'oklch(var(--b2))',
                color: 'oklch(var(--n))',
                border: '1px solid oklch(var(--b3))'
              },
            });
          }
        } catch (error) {
          toast.error("Something went wrong");
        }
      }
    });
  };

  const updateField = async (field, value, endpoint) => {
    try {
      const res = await axiosSecure.patch(`/my-lessons/${_id}/${endpoint}`, { [field]: value });
      if (res.data.modifiedCount > 0) {
        toast.success(`${field.replace('_', ' ')} updated`);
        refetch();
      }
    } catch (err) { toast.error("Update failed"); }
  };

  return (
    <tr className="hover:bg-base-200/50 transition-colors border-b border-base-300">
      {/* 1. Title & Category */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-neutral font-black text-base">{title}</span>
          <span className="badge badge-ghost badge-xs font-bold text-neutral-content opacity-70 mt-1">{category}</span>
        </div>
      </td>

      {/* 2. Privacy Toggle */}
      <td className="px-6 py-4">
        <select
          className="select select-sm select-bordered w-full max-w-[120px] rounded-xl bg-base-100 font-bold"
          value={privacyValue}
          onChange={(e) => { setPrivacyValue(e.target.value); updateField('visibility', e.target.value, 'visibility'); }}
        >
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
      </td>

      {/* 3. Access Level Toggle */}
      <td className="px-6 py-4">
        {isUserPremium ? (
          <select
            className="select select-sm select-primary w-full max-w-[120px] rounded-xl bg-base-100 font-bold text-primary"
            value={accessValue}
            onChange={(e) => { setAccessValue(e.target.value); updateField('access_level', e.target.value, 'access'); }}
          >
            <option value="Free">Free</option>
            <option value="Premium">Premium ⭐</option>
          </select>
        ) : (
          <div className="tooltip" data-tip="Upgrade to change">
            <Link to="/upgrade-premium" className="text-[10px] font-black uppercase text-error flex items-center gap-1 hover:underline">
              <Lock size={12} /> Premium Only
            </Link>
          </div>
        )}
      </td>

      {/* 4. Stats */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4 text-neutral">
          <span className="flex items-center gap-1 font-black text-sm text-error">
            <Heart size={16} fill="oklch(var(--er))" /> {likeCount}
          </span>
          <span className="flex items-center gap-1 font-black text-sm text-primary">
            <Bookmark size={16} fill="oklch(var(--p))" /> {favoriteCount}
          </span>
        </div>
      </td>

      {/* 5. Management Actions */}
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
          <button onClick={() => setIsOpen(true)} className="btn btn-ghost btn-sm btn-circle text-neutral-content hover:text-primary hover:bg-primary/10 transition-all">
            <Eye size={18} />
          </button>
          <button onClick={() => modalRef.current.showModal()} className="btn btn-ghost btn-sm btn-circle text-neutral-content hover:text-accent hover:bg-accent/10 transition-all">
            <Pencil size={18} />
          </button>
          <button onClick={() => handleDelete(_id)} className="btn btn-ghost btn-sm btn-circle text-neutral-content hover:text-error hover:bg-error/10 transition-all">
            <Trash2 size={18} />
          </button>
        </div>
      </td>

      {/* --- Modals Component --- */}
      <LessonDetailsModal lesson={lesson} likeCount={likeCount} favoriteCount={favoriteCount} closeModal={closeModal} isOpen={isOpen} />

      {/* Update Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-200 border border-base-300 p-0 overflow-hidden rounded-[2.5rem] max-w-2xl">
          <div className="bg-primary p-8 text-primary-content flex justify-between items-center">
            <div>
              <h3 className="font-black text-3xl">Update Lesson</h3>
              <p className="opacity-80 font-medium">Refine your educational content</p>
            </div>
            <ShieldCheck size={48} className="opacity-20" />
          </div>

          <form onSubmit={handleSubmit((data) => {
            axiosSecure.patch(`/my-lessons/${_id}`, data).then(res => {
              if (res.data.modifiedCount > 0) {
                refetch(); toast.success('Update Successful');
                modalRef.current.close();
              }
            });
          })} className="p-8 space-y-6">

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-neutral-content tracking-widest ml-1">Lesson Title</label>
              <input
                defaultValue={title}
                {...register("title")}
                className="input input-bordered w-full rounded-2xl bg-base-100 border-base-300 focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-neutral-content tracking-widest ml-1">Category</label>
                <select defaultValue={category} {...register("category")} className="select select-bordered w-full rounded-2xl bg-base-100">
                  <option value="Growth">Growth</option>
                  <option value="Career">Career</option>
                  <option value="Mindset">Mindset</option>
                  <option value="Health_Wellness">Health Wellness</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-neutral-content tracking-widest ml-1">Privacy</label>
                <select defaultValue={privacy} {...register("privacy")} className="select select-bordered w-full rounded-2xl bg-base-100">
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-neutral-content tracking-widest ml-1">Description</label>
              <textarea
                rows="4"
                defaultValue={lesson.description}
                {...register("description")}
                className="textarea textarea-bordered w-full rounded-2xl bg-base-100"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <button type="button" onClick={() => modalRef.current.close()} className="btn btn-ghost rounded-2xl font-bold">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="btn btn-primary rounded-2xl font-bold">
                {isSubmitting ? <span className="loading loading-spinner"></span> : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop backdrop-blur-sm bg-neutral/20">
          <button>close</button>
        </form>
      </dialog>
    </tr>
  );
};

export default UserCreatedLessonRow;
