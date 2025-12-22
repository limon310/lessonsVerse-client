import { BsFillHouseAddFill, BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './MenuItem'
import { FaBookmark } from 'react-icons/fa'
import { MdBookmarkAdd } from "react-icons/md";
import { Heart, PlusCircle } from 'lucide-react';
const UserMenu = () => {

  return (
    <>
      {/* my lessons */}
      <MenuItem icon={FaBookmark} label='My Lessons' address='my-lessons' />
      {/* my favorite */}
      <MenuItem
        icon={Heart}
        label='My Favorites '
        address='my-favorite'
      />
      {/* add lesson */}
      <MenuItem
        icon={PlusCircle}
        label='Add Lesson'
        address='add-lesson'
      />
    </>
  )
}

export default UserMenu
