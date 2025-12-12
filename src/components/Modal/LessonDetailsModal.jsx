import { Dialog, DialogTitle, DialogPanel } from '@headlessui/react'
import { FaEye } from 'react-icons/fa';
// import useAuth from '../../hooks/useAuth';
const LessonDetailsModal = ({ closeModal, isOpen, lesson }) => {
  const { title, category, emotional_ton, createdAt, privacy, authorInfo } = lesson;
  // const {user} = useAuth();
  // console.log(authorInfo);
  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-10 focus:outline-none '
      onClose={close}
    >
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel
            transition
            className='w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl'
          >
            <DialogTitle
              as='h3'
              className='text-lg font-medium text-center leading-6 text-gray-900'
            >
              Lesson Details!
            </DialogTitle>
            <div className='mt-2'>
              {/* Title */}
              <h1 className="text-3xl font-bold py-5">{title}</h1>
              {/* Category + Tone */}
              <div className="flex flex-wrap items-center gap-3 text-sm mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                  {category}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full">
                  {emotional_ton}
                </span>
              </div>
              <section className="bg-gray-50 p-4 rounded-xl border space-y-2 text-sm">
                <div className="flex justify-between">
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
              {/* 4. Stats Section */}
              <section className="flex items-center gap-6 text-gray-600 text-lg py-3">
                <span className="flex items-center gap-1">
                  ❤️ {0}
                </span>
                {/* <span className="flex items-center gap-1">
                        ❤️ {lesson?.likes || 0}
                      </span> */}

                <span className="flex items-center gap-1">
                  🔖 {lesson?.favorites || 0}
                </span>

                <span className="flex items-center gap-1">
                  <FaEye /> {100} Views
                </span>
              </section>
              {/* 3. Author Section */}
              <section className="p-5 rounded-xl border bg-white flex items-center gap-4">
                <img
                  referrerPolicy='no-referrer'
                  src={authorInfo?.image}
                  alt="author"
                  className="w-16 h-16 rounded-full object-cover border"
                />

                <div className="flex-1">
                  <p className="font-semibold text-lg">{authorInfo?.name}</p>
                  <p className="text-sm text-gray-500">Total Lessons: {authorInfo?.count || 0}</p>
                </div>
              </section>
            </div>


            <hr className='mt-8 ' />
            <div className='flex mt-2 justify-end'>
              <button
                type='button'
                className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                onClick={closeModal}
              >
                Ok
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default LessonDetailsModal
