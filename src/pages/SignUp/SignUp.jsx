
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import SocialLogin from '../socialLogin/SocialLogin';
import { imageUpload } from '../../utils';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Image as ImageIcon, Sparkles } from 'lucide-react';

const SignUp = () => {
  const { createUser, updateUserProfile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || '/';
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleSignUp = async data => {
    const { name, image, email, password } = data;
    const imageFile = image[0];

    try {
      const imageURL = await imageUpload(imageFile);
      const result = await createUser(email, password);

      const updateInfo = { displayName: name, photoURL: imageURL };
      await updateUserProfile(updateInfo);

      const userInfo = { displayName: name, email, photoURL: imageURL };
      await axiosSecure.post('/users', userInfo);

      navigate(from, { replace: true });
      toast.success('Welcome to the Verse!');
    } catch (err) {
      toast.error(err?.message);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className='min-h-screen flex items-center justify-center bg-base-100 px-6 py-12 relative overflow-hidden'>
      <title>Join the Circle | LessonsVerse</title>

      {/* Background Aesthetic Blurs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='w-full max-w-lg bg-base-200 border border-base-300 rounded-[3rem] p-8 md:p-12 shadow-2xl relative z-10'
      >
        {/* Header */}
        <div className='text-center mb-10'>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-2xl mb-4 rotate-3">
            <Sparkles size={32} />
          </div>
          <h1 className='text-4xl font-black text-neutral tracking-tight'>Create Account</h1>
          <p className='text-neutral-content/70 mt-2 font-medium'>Join 10,000+ wisdom seekers today.</p>
        </div>

        <form onSubmit={handleSubmit(handleSignUp)} className='space-y-5'>
          {/* Name Field */}
          <div className='form-control'>
            <label className='label font-black uppercase text-[10px] tracking-widest text-neutral-content/60 ml-2'>Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-content/50" size={18} />
              <input
                type='text'
                placeholder='Enter your name'
                className={`input w-full pl-12 bg-base-100 border-base-300 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium ${errors.name ? 'border-red-500' : ''}`}
                {...register("name", { required: "Name is required" })}
              />
            </div>
            {errors.name && <span className='text-red-500 text-xs mt-1 ml-2'>{errors.name.message}</span>}
          </div>

          {/* Image Upload Field */}
          <div className='form-control'>
            <label className='label font-black uppercase text-[10px] tracking-widest text-neutral-content/60 ml-2'>Profile Picture</label>
            <div className="relative">
              <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-content/50" size={18} />
              <input
                type='file'
                accept='image/*'
                className='file-input file-input-bordered w-full pl-12 bg-base-100 border-base-300 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none'
                {...register("image", { required: "Profile image is required" })}
              />
            </div>
            {errors.image && <span className='text-red-500 text-xs mt-1 ml-2'>{errors.image.message}</span>}
          </div>

          {/* Email Field */}
          <div className='form-control'>
            <label className='label font-black uppercase text-[10px] tracking-widest text-neutral-content/60 ml-2'>Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-content/50" size={18} />
              <input
                type='email'
                placeholder='email@example.com'
                className={`input w-full pl-12 bg-base-100 border-base-300 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium ${errors.email ? 'border-red-500' : ''}`}
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && <span className='text-red-500 text-xs mt-1 ml-2'>{errors.email.message}</span>}
          </div>

          {/* Password Field */}
          <div className='form-control'>
            <label className='label font-black uppercase text-[10px] tracking-widest text-neutral-content/60 ml-2'>Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-content/50" size={18} />
              <input
                type='password'
                placeholder='••••••••'
                className={`input w-full pl-12 bg-base-100 border-base-300 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium ${errors.password ? 'border-red-500' : ''}`}
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/,
                    message: "Must include Uppercase, Lowercase & Number (Min 6)"
                  }
                })}
              />
            </div>
            {errors.password && <span className='text-red-500 text-xs mt-1 ml-2'>{errors.password.message}</span>}
          </div>

          <button
            type='submit'
            className='btn btn-primary btn-block rounded-2xl h-auto py-4 font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:shadow-primary/40 mt-4'
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className='flex items-center my-8'>
          <div className='flex-1 h-px bg-base-300'></div>
          <p className='px-4 text-[10px] font-black uppercase tracking-widest text-neutral-content/40'>Or continue with</p>
          <div className='flex-1 h-px bg-base-300'></div>
        </div>

        <SocialLogin />

        <p className='text-center mt-8 text-sm font-medium text-neutral-content/60'>
          Already part of the Verse?{' '}
          <Link to='/login' className='text-primary font-black hover:underline underline-offset-4'>
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;