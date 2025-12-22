import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { GiShieldDisabled } from 'react-icons/gi';
import { FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Trash2 } from 'lucide-react';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState('');
  // get users
  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users', searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`)
      return res.data;
    }
  })
  // handle user

  const handleMakeAdmin = user => {
    const roleInfo = { role: "admin" };
    Swal.fire({
      title: "Are you sure?",
      text: "Set Admin this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Set Admin!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
          .then(res => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Set Admin!",
                text: "user has been set admin successfully",
                icon: "success"
              });
            }
          })

      }
    });
  }

  const handleRemoveAdmin = user => {
    const roleInfo = { role: "user" };
    Swal.fire({
      title: "Are you sure?",
      text: "Remove Admin this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove Admin!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
          .then(res => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Remove Admin!",
                text: "Admin has been Remove as user",
                icon: "success"
              });
            }
          })

      }
    });
  }

  // handle delete user
  const handleDeleteUser = (id) => {
    console.log("delte button clicked", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/user/${id}`)
          .then(res => {
            console.log(res.data);
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          })
      }
    });
  }
  return (
    <div>
      {/* dynamic title */}
      <title>Manage Users</title>
      <h2 className='text-4xl font-bold'>Manage Users: {users.length}</h2>
      <input
        onChange={(e) => setSearchText(e.target.value)}
        type="search"
        placeholder="search users"
        className="input my-6" />
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                #
              </th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Total Lessons</th>
              <th>Admin Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              users.map((user, index) => <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user?.photoURL}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {user.email}
                </td>
                <td>
                  {user.role}
                </td>
                <td>
                  {user.totalLessonsCreated}
                </td>
                <td>
                  {
                    user.role === "admin"
                      ? <button
                        onClick={() => handleRemoveAdmin(user)}
                        className="btn bg-red-500"><GiShieldDisabled /></button>
                      : <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn bg-green-500"><FaUserShield /></button>
                  }
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className='btn ms-2 hover:bg-red-500'> <Trash2 size={24} /></button>
                </td>
              </tr>)
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;