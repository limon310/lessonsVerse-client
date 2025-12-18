import { FaUserAlt, FaBook, FaFlag } from 'react-icons/fa'
import { BsFillHouseDoorFill } from 'react-icons/bs'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import React from 'react';
import { useMemo } from 'react';

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();

  // get total users, public lessons, flagged lessons
  const { data: total = [], isLoading: total_usr_lesson_flag_Loading } = useQuery({
    queryKey: ['total_users_publicLessons_flaggedLessons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/stats/users-lessons-flagged')
      return res.data;
    }
  })
  // console.log("from admin dashboard", total);

  //to days lesson
  const { data: todaysLesson = [], isLoading: todaysLessonCount } = useQuery({
    queryKey: ['todaysLessonCount'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/lessons/today/count')
      return res.data;
    }
  })
  // console.log("to days lesson count", todaysLesson)

  //top contributor
  const { data: topContributor = [], isLoading: topContributorLoading } = useQuery({
    queryKey: ['topContributor'],
    queryFn: async () => {
      const res = await axiosSecure.get('/top-contributors-week')
      return res.data;
    }
  })
  // console.log("top contributor", topContributor)

  // lessons and user growth growth
  const { data, isLoading: adminGrowthLoading } = useQuery({
    queryKey: ['adminGrowth'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/growth')
      return res.data;
    }
  })
  console.log("lesson and user growth", data)

  const chartData = React.useMemo(() => {
    if (!data) return [];

    const map = {};

    // lessons
    data.lessonGrowth.forEach(item => {
      map[item.date] = {
        date: item.date,
        lessons: item.count,
        users: 0
      };
    });

    // users
    data.userGrowth.forEach(item => {
      if (!map[item.date]) {
        map[item.date] = {
          date: item.date,
          lessons: 0,
          users: item.count
        };
      } else {
        map[item.date].users = item.count;
      }
    });

    return Object.values(map);
  }, [data]);

  if (total_usr_lesson_flag_Loading || topContributorLoading || todaysLessonCount || adminGrowthLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  return (
    <div>
      <div className='mt-12'>
        {/* small cards */}
        <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grow'>
          {/* Users Card */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40`}
            >
              <FaUserAlt className='w-6 h-6 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                Total User
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                {total.totalUsers}
              </h4>
            </div>
          </div>
          {/* total lesson card */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
            >
              <FaBook className='w-6 h-6 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                Public Lessons
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                {total.totalUsers}
              </h4>
            </div>
          </div>
          {/* Total Flagged lessons */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
            >
              <FaFlag className='w-6 h-6 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                Flagged Lessons
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                {total.totalFlaggedLessons}
              </h4>
            </div>
          </div>
          {/* To day new lessons */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-pink-600 to-pink-400 text-white shadow-pink-500/40`}
            >
              <BsFillHouseDoorFill className='w-6 h-6 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                Todays Lessons
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                {todaysLesson.todayLessons}
              </h4>
            </div>
          </div>
        </div>

        {/* table for top contributor */}
        <div className="overflow-x-auto">
          <h2 className="text-2xl font-bold text-gray-800 text-center py-4">
            Top Contributors of the Week
          </h2>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Lessons</th>
                <th>Creator Id</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {
                topContributor.map((user, i) => <tr key={user.creatorId}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={user.image || "https://img.daisyui.com/images/profile/demo/2@94.webp"}
                            alt="user avatar" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm opacity-50">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-ghost badge-sm">{user.totalLessons}</span>
                  </td>
                  <td>
                    <span className="badge badge-ghost badge-sm">{user.creatorId}</span>
                  </td>
                </tr>)
              }
            </tbody>
          </table>
        </div>
          
          {/* chart analytics */}

        <div className="w-full h-[360px] bg-white rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-4 text-center py-5">
            Growth Overview (Lessons & Users)
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />

              <Bar
                dataKey="lessons"
                name="Lessons"
                radius={[6, 6, 0, 0]}
              />

              <Bar
                dataKey="users"
                name="Users"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}

export default AdminStatistics
