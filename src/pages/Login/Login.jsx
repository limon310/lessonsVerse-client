// import { Link, Navigate, useLocation, useNavigate } from 'react-router'
// import toast from 'react-hot-toast'
// import LoadingSpinner from '../../components/Shared/LoadingSpinner'
// import useAuth from '../../hooks/useAuth'
// import { FcGoogle } from 'react-icons/fc'
// import { TbFidgetSpinner } from 'react-icons/tb'
// import SocialLogin from '../socialLogin/SocialLogin'

// const Login = () => {
//   const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth()
//   const navigate = useNavigate()
//   const location = useLocation()

//   const from = location.state || '/'

//   if (loading) return <LoadingSpinner />
//   if (user) return <Navigate to={from} replace={true} />

//   // form submit handler
//   const handleSubmit = async event => {
//     event.preventDefault()
//     const form = event.target
//     const email = form.email.value
//     const password = form.password.value

//     try {
//       //User Login
//       await signIn(email, password)

//       navigate(from, { replace: true })
//       toast.success('Login Successful')
//     } catch (err) {
//       console.log(err)
//       toast.error(err?.message)
//     }
//   }
//   return (
//     <div className='flex justify-center items-center min-h-screen bg-white'>
//       <title>Login | LessonVerse</title>
//       <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
//         <div className='mb-8 text-center'>
//           <h1 className='my-3 text-4xl font-bold'>Log In</h1>
//           <p className='text-sm text-gray-400'>
//             Sign in to access your account
//           </p>
//         </div>
//         <form
//           onSubmit={handleSubmit}
//           noValidate=''
//           action=''
//           className='space-y-6 ng-untouched ng-pristine ng-valid'
//         >
//           <div className='space-y-4'>
//             <div>
//               <label htmlFor='email' className='block mb-2 text-sm'>
//                 Email address
//               </label>
//               <input
//                 type='email'
//                 name='email'
//                 id='email'
//                 required
//                 placeholder='Enter Your Email Here'
//                 className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
//                 data-temp-mail-org='0'
//               />
//             </div>
//             <div>
//               <div className='flex justify-between'>
//                 <label htmlFor='password' className='text-sm mb-2'>
//                   Password
//                 </label>
//               </div>
//               <input
//                 type='password'
//                 name='password'
//                 autoComplete='current-password'
//                 id='password'
//                 required
//                 placeholder='*******'
//                 className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type='submit'
//               className='bg-lime-500 w-full rounded-md py-3 text-white'
//             >
//               {loading ? (
//                 <TbFidgetSpinner className='animate-spin m-auto' />
//               ) : (
//                 'Continue'
//               )}
//             </button>
//           </div>
//         </form>
//         <div className='space-y-1'>
//           <button className='text-xs hover:underline hover:text-lime-500 text-gray-400 cursor-pointer'>
//             Forgot password?
//           </button>
//         </div>
//         <div className='flex items-center pt-4 space-x-1'>
//           <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
//           <p className='px-3 text-sm dark:text-gray-400'>
//             Login with social accounts
//           </p>
//           <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
//         </div>
//         {/* social login components */}
//         <SocialLogin></SocialLogin>
//         <p className='px-6 text-sm text-center text-gray-400'>
//           Don&apos;t have an account yet?{' '}
//           <Link
//             state={from}
//             to='/signup'
//             className='hover:underline hover:text-lime-500 text-gray-600'
//           >
//             Sign up
//           </Link>
//           .
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Login

import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import useAuth from '../../hooks/useAuth';
import { TbFidgetSpinner } from 'react-icons/tb';
import SocialLogin from '../socialLogin/SocialLogin';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, UserCheck, ShieldCheck, User } from 'lucide-react';
import { useRef } from 'react';

const Login = () => {
  const { signIn, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null);

  const from = location.state || '/';

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace={true} />;

  // --- Multi-Role Demo Handler ---
  const fillDemoCredentials = (role) => {
    const form = formRef.current;
    if (role === 'admin') {
      form.email.value = "admin@lessonsverse.com";
      form.password.value = "Admin123";
      toast.success("Admin credentials loaded!");
    } else {
      form.email.value = "user@lessonsverse.com";
      form.password.value = "User123";
      toast.success("User credentials loaded!");
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
      toast.success('Welcome back to Verse!');
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-base-100 px-6 py-12 relative overflow-hidden transition-colors duration-300'>
      <title>Login | LessonsVerse</title>

      {/* Background Aesthetic Blurs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className='w-full max-w-lg bg-base-200 border border-base-300 rounded-[3rem] p-8 md:p-12 shadow-2xl relative z-10'
      >
        <div className='text-center mb-10'>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-2xl mb-4 -rotate-3">
            <LogIn size={32} />
          </div>
          <h1 className='text-4xl font-black text-neutral tracking-tight'>Welcome Back</h1>
          <p className='text-neutral-content/70 mt-2 font-medium italic'>Your wisdom awaits.</p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className='space-y-5'>
          <div className='form-control'>
            <label className='label font-black uppercase text-[10px] tracking-widest text-neutral-content/60 ml-2'>Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-content/50" size={18} />
              <input type='email' name='email' required placeholder='email@example.com' className='input w-full pl-12 bg-base-100 border-base-300 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium transition-all' />
            </div>
          </div>

          <div className='form-control'>
            <div className="flex justify-between items-center px-2">
              <label className='label font-black uppercase text-[10px] tracking-widest text-neutral-content/60'>Password</label>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-content/50" size={18} />
              <input type='password' name='password' required placeholder='••••••••' className='input w-full pl-12 bg-base-100 border-base-300 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium transition-all' />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <button type='submit' disabled={loading} className='btn btn-primary btn-block rounded-2xl h-auto py-4 font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:shadow-primary/40'>
              {loading ? <TbFidgetSpinner className='animate-spin' size={24} /> : 'Login'}
            </button>

            {/* --- Multi-Role Demo Login Buttons --- */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              <button
                type='button'
                onClick={() => fillDemoCredentials('user')}
                className='btn btn-outline border-base-300 hover:bg-base-300 hover:text-neutral rounded-2xl py-3 h-auto font-black uppercase tracking-widest text-[10px] group'
              >
                <User size={14} className="mr-2 group-hover:scale-110 transition-transform" />
                Demo User
              </button>
              <button
                type='button'
                onClick={() => fillDemoCredentials('admin')}
                className='btn btn-outline border-base-300 hover:bg-base-300 hover:text-neutral rounded-2xl py-3 h-auto font-black uppercase tracking-widest text-[10px] group'
              >
                <ShieldCheck size={14} className="mr-2 group-hover:scale-110 transition-transform text-accent" />
                Demo Admin
              </button>
            </div>
          </div>
        </form>

        <div className='flex items-center my-8'>
          <div className='flex-1 h-px bg-base-300'></div>
          <p className='px-4 text-[10px] font-black uppercase tracking-widest text-neutral-content/40'>Social Login</p>
          <div className='flex-1 h-px bg-base-300'></div>
        </div>

        <SocialLogin />

        <p className='text-center mt-8 text-sm font-medium text-neutral-content/60'>
          New to the circle?{' '}
          <Link to='/signup' state={from} className='text-primary font-black hover:underline underline-offset-4'>
            Join today
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;