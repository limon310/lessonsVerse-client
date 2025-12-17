import { FaBook, FaFlag, FaUserCog,  } from 'react-icons/fa'
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={FaBook} label='Manage Lessons' address='manage-lessons' />
      <MenuItem icon={FaFlag} label='Flagged Lessons' address='manage-flagged-lessons' />
    </>
  )
}

export default AdminMenu
