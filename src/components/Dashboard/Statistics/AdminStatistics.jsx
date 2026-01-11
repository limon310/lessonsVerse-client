import { FaUserAlt, FaBook, FaFlag, FaCrown } from 'react-icons/fa'
import { FiBookOpen, FiTrendingUp } from "react-icons/fi";
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import {
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, AreaChart, Area
} from "recharts";
import React, { useMemo } from 'react';

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();

  // Queries (Kept the same logic)
  const { data: total = {}, isLoading: totalLoading } = useQuery({
    queryKey: ['total_users_publicLessons_flaggedLessons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/stats/users-lessons-flagged')
      return res.data;
    }
  })

  const { data: todaysLesson = {}, isLoading: todaysLoading } = useQuery({
    queryKey: ['createdLesson-today'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/lessons/today/count')
      return res.data;
    }
  })

  const { data: topContributor = [], isLoading: topContributorLoading } = useQuery({
    queryKey: ['topContributor'],
    queryFn: async () => {
      const res = await axiosSecure.get('/top-contributors-week')
      return res.data;
    }
  })

  const { data, isLoading: growthLoading } = useQuery({
    queryKey: ['adminGrowth'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/growth-chart')
      return res.data;
    }
  })

  const chartData = useMemo(() => {
    if (!data) return [];
    const map = {};
    data.lessonGrowth?.forEach(item => {
      map[item.date] = { date: item.date, lessons: item.count, users: 0 };
    });
    data.userGrowth?.forEach(item => {
      if (!map[item.date]) {
        map[item.date] = { date: item.date, lessons: 0, users: item.count };
      } else {
        map[item.date].users = item.count;
      }
    });
    return Object.values(map).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [data]);

  if (totalLoading || topContributorLoading || todaysLoading || growthLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-10 pb-12 animate-in fade-in duration-500">
      <title>Admin Dashboard | Statistics</title>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral tracking-tight">Analytics Dashboard</h1>
          <p className="text-neutral-content">Tracking platform engagement and user acquisition.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-base-200 border border-base-300 rounded-full text-sm font-semibold text-neutral">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
          </span>
          Live Stats
        </div>
      </div>

      {/* 1. Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Users", val: total.totalUsers, icon: FaUserAlt, color: "text-primary", bg: "bg-primary/10" },
          { label: "Public Lessons", val: total.totalUsers, icon: FaBook, color: "text-accent", bg: "bg-accent/10" },
          { label: "Flagged Content", val: total.totalFlaggedLessons, icon: FaFlag, color: "text-error", bg: "bg-error/10" },
          { label: "Created Today", val: todaysLesson.todayLessons, icon: FiBookOpen, color: "text-secondary", bg: "bg-secondary/10" }
        ].map((stat, i) => (
          <div key={i} className="card bg-base-100 border border-base-300 shadow-sm transition-all hover:scale-[1.02]">
            <div className="card-body p-6 flex-row items-center gap-4">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-content/60">{stat.label}</p>
                <h4 className="text-2xl font-black text-neutral">{(stat.val || 0).toLocaleString()}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* 2. Modern Area Growth Chart */}
        <div className="xl:col-span-2 card bg-base-100 border border-base-300 shadow-xl overflow-hidden">
          <div className="bg-base-200/50 px-8 py-6 border-b border-base-300 flex justify-between items-center">
            <h2 className="font-bold text-lg text-neutral">Growth Performance</h2>
            <div className="flex gap-4 text-xs font-bold">
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-primary"></span> Lessons</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-accent"></span> Users</div>
            </div>
          </div>
          <div className="p-6">
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLessons" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(var(--color-primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(var(--color-primary))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(var(--color-accent))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(var(--color-accent))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(var(--color-base-300))" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: 'oklch(var(--color-neutral-content))', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(val) => new Date(val).toLocaleDateString("en-US", { day: "2-digit", month: "short" })}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fill: 'oklch(var(--color-neutral-content))', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'oklch(var(--color-base-100))',
                      border: '1px solid oklch(var(--color-base-300))',
                      borderRadius: '16px',
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="lessons"
                    stroke="oklch(var(--color-primary))"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorLessons)"
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="oklch(var(--color-accent))"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorUsers)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 3. Top Contributors Leaderboard */}
        <div className="card bg-base-100 border border-base-300 shadow-xl overflow-hidden">
          <div className="bg-base-200/50 p-6 border-b border-base-300 flex items-center gap-2">
            <div className="p-2 bg-warning/20 rounded-lg"><FaCrown className="text-warning" /></div>
            <h2 className="text-lg font-bold text-neutral">Top Contributors</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <tbody>
                {topContributor.map((user, i) => (
                  <tr key={user.creatorId} className="hover:bg-base-200 transition-colors border-b border-base-200 last:border-0">
                    <td className="w-12 text-center">
                      {i < 3 ? <span className="text-xl">{['🥇', '🥈', '🥉'][i]}</span> : <span className="text-neutral-content font-bold">{i + 1}</span>}
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-10 h-10 rounded-full ring ring-base-300 ring-offset-base-100">
                            <img src={user.image || "https://img.daisyui.com/images/profile/demo/2@94.webp"} alt="avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-sm text-neutral">{user.name}</div>
                          <div className="text-[10px] text-neutral-content truncate w-24">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-black text-primary">{user.totalLessons}</span>
                        <span className="text-[9px] uppercase font-bold text-neutral-content">Lessons</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminStatistics;
