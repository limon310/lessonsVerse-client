import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { GiShieldDisabled } from 'react-icons/gi';
import { FaUserShield, FaSearch, FaUserCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Trash2, ShieldCheck, ShieldAlert } from 'lucide-react';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState('');

  const { refetch, data: users = [], isLoading } = useQuery({
    queryKey: ['users', searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`)
      return res.data;
    }
  })

  // SweetAlert Styling Helper
  const swalConfig = {
    customClass: {
      confirmButton: 'btn btn-primary px-6 mx-2',
      cancelButton: 'btn btn-ghost border border-base-300 px-6 mx-2'
    },
    buttonsStyling: false
  };

  const handleToggleAdmin = (user, makeAdmin) => {
    const role = makeAdmin ? "admin" : "user";
    Swal.fire({
      title: makeAdmin ? "Promote to Admin?" : "Demote to User?",
      text: `Are you sure you want to change ${user.displayName}'s role to ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: makeAdmin ? "Yes, Promote" : "Yes, Demote",
      ...swalConfig
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, { role })
          .then(res => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Success!",
                text: `User is now a ${role}`,
                icon: "success",
                ...swalConfig
              });
            }
          })
      }
    });
  }

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Delete Account?",
      text: "This action is permanent and cannot be undone!",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Delete Permanently",
      ...swalConfig
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/user/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({ title: "Deleted!", icon: "success", ...swalConfig });
            }
          })
      }
    });
  }

  return (
    <div className="space-y-6 pb-10">
      <title>Admin | Manage Users</title>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm">
        <div>
          <h2 className="text-3xl font-black text-neutral tracking-tight">User Directory</h2>
          <p className="text-neutral-content text-sm mt-1 font-medium">
            Manage {users.length} registered members and their access levels.
          </p>
        </div>

        {/* Professional Search Bar */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-neutral-content/50" />
          </div>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Search by name or email..."
            className="input input-bordered w-full pl-10 bg-base-200 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {/* Table Surface */}
      <div className="card bg-base-100 border border-base-300 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            {/* Table Head */}
            <thead className="bg-base-200/50">
              <tr className="text-neutral-content uppercase text-[11px] tracking-widest font-bold">
                <th className="py-4 pl-6">#</th>
                <th>Member Profile</th>
                <th>Role Status</th>
                <th className="text-center">Activity</th>
                <th className="text-right pr-6">Management Actions</th>
              </tr>
            </thead>

            <tbody className="text-neutral">
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id} className="hover:bg-base-200/40 transition-colors group">
                    <td className="pl-6 font-mono text-xs opacity-50">{index + 1}</td>

                    {/* User Info */}
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="mask mask-circle w-11 h-11 border-2 border-base-300 group-hover:border-primary transition-colors">
                            <img
                              src={user?.photoURL || "https://i.ibb.co/mJKnL6L/default-user.png"}
                              alt={user.displayName}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-sm leading-tight">{user.displayName}</div>
                          <div className="text-[11px] opacity-60 font-medium">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Role Badge */}
                    <td>
                      {user.role === "admin" ? (
                        <div className="badge badge-primary badge-sm font-bold gap-1 py-3 px-3">
                          <ShieldCheck size={12} /> ADMIN
                        </div>
                      ) : (
                        <div className="badge badge-ghost border-base-300 badge-sm font-bold gap-1 py-3 px-3">
                          USER
                        </div>
                      )}
                    </td>

                    {/* Activity Metric */}
                    <td className="text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-bold">{user.totalLessonsCreated || 0}</span>
                        <span className="text-[10px] uppercase opacity-50 font-black">Lessons</span>
                      </div>
                    </td>

                    {/* Action Buttons */}
                    <td className="text-right pr-6 space-x-2">
                      <div className="tooltip tooltip-top" data-tip={user.role === "admin" ? "Demote User" : "Promote to Admin"}>
                        {user.role === "admin" ? (
                          <button
                            onClick={() => handleToggleAdmin(user, false)}
                            className="btn btn-square btn-sm bg-orange-100 hover:bg-orange-500 text-orange-600 hover:text-white border-none transition-all"
                          >
                            <ShieldAlert size={18} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleToggleAdmin(user, true)}
                            className="btn btn-square btn-sm bg-indigo-100 hover:bg-indigo-600 text-indigo-600 hover:text-white border-none transition-all"
                          >
                            <FaUserShield size={16} />
                          </button>
                        )}
                      </div>

                      <div className="tooltip tooltip-top" data-tip="Delete Account">
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="btn btn-square btn-sm bg-red-100 hover:bg-red-600 text-red-600 hover:text-white border-none transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <div className="flex flex-col items-center opacity-40">
                      <FaUserCircle size={60} />
                      <p className="mt-4 text-xl font-bold">No users match your search.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;