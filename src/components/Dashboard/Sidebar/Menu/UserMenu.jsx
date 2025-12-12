import { BsFillHouseAddFill, BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './MenuItem'
import { useState } from 'react'
import LessonDetailsModal from '../../../Modal/LessonDetailsModal'
import { FaBookmark } from 'react-icons/fa'
import { MdBookmarkAdd } from "react-icons/md";
const UserMenu = () => {
  // const [isOpen, setIsOpen] = useState(false)

  // const closeModal = () => {
  //   setIsOpen(false)
  // }

  return (
    <>
    {/* my lessons */}
      <MenuItem icon={FaBookmark } label='My Lessons' address='my-lessons' />
      <MenuItem
        icon={MdBookmarkAdd}
        label='Add Lesson'
        address='add-lesson'
      />
      <div
        // onClick={() => setIsOpen(true)}
        className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'
      >
        <GrUserAdmin className='w-5 h-5' />

        <span className='mx-4 font-medium'>Become A Seller</span>
      </div>

      {/* <LessonDetailsModal closeModal={closeModal} isOpen={isOpen} /> */}
    </>
  )
}

export default UserMenu
