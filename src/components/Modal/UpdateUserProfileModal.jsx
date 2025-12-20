
import { useForm } from 'react-hook-form';
import { imageUpload } from '../../utils';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const UpdateUserProfileModal = ({ user, close }) => {
  const { updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // handle update user info
  const handleUpdate = async data => {
    // console.log(data)
    const { name, image } = data
    let imageURL = user?.photoURL;
    if (image && image.length > 0) {
      const imageFile = image[0];
      imageURL = await imageUpload(imageFile); 
    }
    const updateInfo = {
      displayName: name,
      photoURL: imageURL
    }
    updateUserProfile(updateInfo)
      .then(() => {
        // console.log(result);
        toast.success("profile update successfully");
        close();
      }).catch(error => {
        // console.log(error.messate);
        toast.error(error.message);
      })
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">

        <h3 className="text-lg font-semibold">Edit Profile</h3>
        <form onSubmit={handleSubmit(handleUpdate)}>
          {/* name */}
          <div>
            <label htmlFor='Name' className='block mb-2 text-sm'>
              Name
            </label>
            <input
              type='text'
              id='name'
              defaultValue={user?.displayName}
              className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
              data-temp-mail-org='0'
              {...register("name", { required: true })}
            />
            {errors.name?.type === "required" && <span className='text-red-500 text-sm'>name is required</span>}
          </div>
          {/* email */}
          <div>
            <label htmlFor='email' className='block mb-2 text-sm mt-2'>
              Email address
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
          {/* image */}
          <div>
            <label
              htmlFor='image'
              className='block mb-2 text-sm font-medium text-gray-700 mt-2'
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
            />
            <p className='mt-1 text-xs text-gray-400'>
              PNG, JPG or JPEG (max 2MB)
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={close} className="btn btn-ghost">
              Cancel
            </button>
            <button type='submit' className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserProfileModal;