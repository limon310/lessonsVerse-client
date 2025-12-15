import { BsFillHouseAddFill, BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './MenuItem'
import { FaBookmark } from 'react-icons/fa'
import { MdBookmarkAdd } from "react-icons/md";
const UserMenu = () => {

  return (
    <>
      {/* my lessons */}
      <MenuItem icon={FaBookmark} label='My Lessons' address='my-lessons' />
      <MenuItem
        icon={MdBookmarkAdd}
        label='Add Lesson'
        address='add-lesson'
      />
      <MenuItem
        icon={MdBookmarkAdd}
        label='My Favorites '
        address='my-favorite'
      />
    </>
  )
}

export default UserMenu
