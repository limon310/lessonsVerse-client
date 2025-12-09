import { Link, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useForm } from "react-hook-form"
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure'

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'
  // const axiosSecure = useAxiosSecure();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const handleSignUp = async data => {
    const { name, image, email, password } = data
    const imageFile = image[0]
    const formData = new FormData()
    formData.append('image', imageFile)

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_SECRET_API_KEY
        }`,
        formData
      )
      const imageURL = data?.data?.display_url;


      //1. User Registration
      const result = await createUser(email, password)

      //3. Save username & profile photo
      await updateUserProfile(name, imageURL)

      navigate(from, { replace: true })
      toast.success('Signup Successful')

      console.log(result)
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  // const handleSignUp = (data) => {
  //   // console.log("after register", data.photo[0]);
  //   const profileImg = data.image[0];
  //   createUser(data.email, data.password)
  //     .then(result => {
  //       console.log(result.user);
  //       // store the image and get the photo url
  //       const formData = new FormData();
  //       formData.append("image", profileImg);
  //       const image_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_SECRET_API_KEY}`;

  //       axios.post(image_URL, formData)
  //         .then(res => {
  //           // console.log("after post", res.data.data.url);
  //           const photoURL = res.data.data.url

  //           const userInfo = {
  //             displayName: data.name,
  //             photoURL: photoURL,
  //             email: data.email
  //           }
  //           axiosSecure.post('/users', userInfo)
  //             .then(res => {
  //               if (res.data.insertedId) {
  //                 console.log("user created in database", res.data);
  //               }
  //             })
  //           const userProfile = {
  //             displayName: data.name,
  //             photoURL: photoURL,
  //           }
  //           updateUserProfile(userProfile)
  //             .then(() => {
  //               console.log("updated successfully");
  //               navigate(location?.state || "/");
  //             })
  //             .catch(err => {
  //               console.log(err);
  //             })
  //         })

  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      await signInWithGoogle()

      navigate(from, { replace: true })
      toast.success('Signup Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-gray-400'>Welcome to PlantNet</p>
        </div>
        <form
          onSubmit={handleSubmit(handleSignUp)}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && <span className='text-red-500 text-sm'>name is required</span>}
            </div>
            {/* Image */}
            <div>
              <label
                htmlFor='image'
                className='block mb-2 text-sm font-medium text-gray-700'
              >
                Profile Image
              </label>
              <input
                type='file'
                id='image'
                accept='image/*'
                className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
              file:bg-lime-50 file:text-lime-700
              hover:file:bg-lime-100
                bg-gray-100 border border-dashed border-lime-300 rounded-md cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 py-2'
                {...register("image", { required: true })}
              />
              <p className='mt-1 text-xs text-gray-400'>
                PNG, JPG or JPEG (max 2MB)
              </p>
              {
                errors.image?.type === "required" && <span className='text-red-500 text-sm'>image is required</span>
              }
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                id='email'
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
                {...register("email", { required: true })}
              />
              {errors.email && <span className='text-red-500 text-sm'>email is required</span>}
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                autoComplete='new-password'
                id='password'
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/
                })}
              />
              {errors.password?.type === "pattern" && <p className='text-red-500 text-sm'>Password must include uppercase, lowercase, number, and be at least 6 characters.</p>}
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-lime-500 w-full rounded-md py-3 text-white'
            >Sign Up
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-lime-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default SignUp

