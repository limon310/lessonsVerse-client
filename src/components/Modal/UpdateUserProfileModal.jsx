import { useForm } from 'react-hook-form';
import { imageUpload } from '../../utils';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import { Camera, X, Loader2, User, Mail } from 'lucide-react';
import { useState } from 'react';

const UpdateUserProfileModal = ({ user, close }) => {
  const { updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // Handle local image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (data) => {
    setLoading(true);
    const { name, image } = data;
    let imageURL = user?.photoURL;

    try {
      if (image && image.length > 0) {
        const imageFile = image[0];
        imageURL = await imageUpload(imageFile);
      }

      const updateInfo = {
        displayName: name,
        photoURL: imageURL
      };

      await updateUserProfile(updateInfo);
      toast.success("Profile updated successfully");
      close();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-neutral/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-base-100 rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden border border-base-300 animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="px-8 pt-8 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-black text-neutral tracking-tight">Edit Profile</h3>
            <p className="text-sm text-neutral-content font-medium">Update your public identity</p>
          </div>
          <button onClick={close} className="btn btn-ghost btn-circle btn-sm">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleUpdate)} className="p-8 space-y-6">

          {/* Avatar Preview & Upload */}
          <div className="flex flex-col items-center gap-4 py-2">
            <div className="relative group">
              <img
                src={preview || user?.photoURL}
                alt="preview"
                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-base-200 shadow-inner group-hover:opacity-80 transition-opacity"
              />
              <label
                htmlFor="image"
                className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <div className="bg-neutral/70 p-2 rounded-full text-white">
                  <Camera size={20} />
                </div>
              </label>
            </div>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              {...register("image")}
              onChange={handleImageChange}
            />
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">Click image to change</p>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-neutral-content ml-1 flex items-center gap-2">
              <User size={14} /> Full Name
            </label>
            <input
              type="text"
              defaultValue={user?.displayName}
              placeholder="Enter your name"
              className={`w-full px-4 py-3 rounded-2xl bg-base-200 border-none focus:ring-2 focus:ring-primary/50 text-neutral font-medium transition-all ${errors.name ? 'ring-2 ring-error' : ''}`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-xs text-error font-bold ml-1">{errors.name.message}</p>}
          </div>

          {/* Email (Read Only) */}
          <div className="space-y-2 opacity-60">
            <label className="text-xs font-black uppercase tracking-widest text-neutral-content ml-1 flex items-center gap-2">
              <Mail size={14} /> Registered Email
            </label>
            <input
              type="email"
              value={user?.email}
              disabled
              className="w-full px-4 py-3 rounded-2xl bg-base-300 border-none text-neutral font-medium cursor-not-allowed"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={close}
              className="btn flex-1 rounded-2xl border-base-300 bg-transparent text-neutral hover:bg-base-200 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1 rounded-2xl font-bold shadow-lg shadow-primary/20"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserProfileModal;