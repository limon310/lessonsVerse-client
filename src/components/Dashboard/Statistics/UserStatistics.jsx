import { useQuery } from '@tanstack/react-query';
import { Bar, BarChart, Legend } from 'recharts';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import { BookOpen, Star, PlusCircle, ChartBar } from "lucide-react";
import {  XAxis, YAxis, Tooltip } from "recharts";
import { Link } from 'react-router';

const UserStatistics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // count total lesson created
  const { data: totalLesson, isLoading: totalLessonLoading } = useQuery({
    queryKey: ['my-lessons', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/lessons/count/${user?.email}`)
      return res.data;
    }
  })
  // console.log("total lesson created", totalLesson);

  // count total save lessons
  const { data: totalSaveLesson, isLoading: saveLessonLoading } = useQuery({
    queryKey: ['total-saveLesson', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/saveLesson/count/${user?.email}`)
      return res.data;
    }
  })
  // console.log("total save lesson", totalSaveLesson)

  // get recent lessons created by user
  const { data: latestLessons = [], isLoading: recentLessonsLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ['recentLessons', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/recent/lessons/${user?.email}`)
      return res.data;
    }
  })
  // console.log("recent lessons", latestLessons);

  // chard analytics most created lesson a user in a month
  const { data: totalCreatedLessonAmonth, isLoading: totalCreatedLessonLoading } = useQuery({
    queryKey: ['monthlyCreated-lessons'],
    queryFn: async () => {
      const res = await axiosSecure.get(`users/lessons/analytics/monthly-total/${user?.email}`)
      return res.data;
    }
  })
  // console.log("total created lessons in a month", totalCreatedLessonAmonth);

  const { data: monthlyAnalytics = [], isLoading: analyticsLoading } = useQuery({
    queryKey: ['monthly-lesson-analytics', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/lessons/analytics/monthly/${user?.email}`
      );
      return res.data;
    }
  });
  // console.log(monthlyAnalytics)

  if (totalLessonLoading || saveLessonLoading || recentLessonsLoading || analyticsLoading || totalCreatedLessonLoading ) {
    return <LoadingSpinner></LoadingSpinner>
  }
  return (
    <div className="p-6 space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4 hover:scale-105 transition-transform">
          <BookOpen className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Total Lessons</p>
            <h3 className="text-2xl font-semibold">{totalLesson.totalCreatedLessons}</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4 hover:scale-105 transition-transform">
          <Star className="w-8 h-8 text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500">Saved Lessons</p>
            <h3 className="text-2xl font-semibold">{totalSaveLesson.totalSaveLessons}</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4 hover:scale-105 transition-transform">
          <ChartBar className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-sm text-gray-500">This Month Activity</p>
            <h3 className="text-2xl font-semibold">{totalCreatedLessonAmonth.totalLessons}</h3>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recently Added Lessons */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recently Added Lessons</h2>
          <ul className="space-y-3">
            {latestLessons.map((lesson) => (
              <li
                key={lesson._id}
                className="flex justify-between items-center text-sm bg-gray-50 p-3 rounded hover:bg-gray-100 transition"
              >
                <span>{lesson.title}</span>
                <Link to={`/lesson-details/${lesson._id}`} className="px-3 py-1 text-sm border rounded hover:bg-blue-500 hover:text-white transition">
                  View
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            <Link to="/dashboard/add-lesson" className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              <PlusCircle size={16} /> Create Lesson
            </Link>
            <Link to="/dashboard/my-lessons" className="w-full text-center px-3 py-2 border rounded hover:bg-gray-200 transition">My Lessons</Link>
            <Link to="/dashboard/my-favorite" className="w-full text-center px-3 py-2 border rounded hover:bg-gray-200 transition">My Favorites</Link>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="bg-white rounded-2xl shadow p-8">
        <h2 className="text-2xl font-semibold mb-8 text-center">Monthly Contributions</h2>
        <div className="h-64">
            <BarChart
            style={{ width: '100%', maxWidth: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
            data={monthlyAnalytics}>
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalLessons" fill="#8884d8" activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[10, 10, 0, 0]} />
            </BarChart>

        </div>
      </div>
    </div>
  )
}

export default UserStatistics
