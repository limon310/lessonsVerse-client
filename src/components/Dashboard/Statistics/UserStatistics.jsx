import { useQuery } from '@tanstack/react-query';
import { Area, AreaChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import { BookOpen, Star, PlusCircle, Activity, ArrowUpRight, Clock, ChevronRight } from "lucide-react";
import { Link } from 'react-router';

const UserStatistics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Queries
  const { data: totalLesson = {}, isLoading: l1 } = useQuery({
    queryKey: ['lesson-count', user?.email],
    queryFn: async () => (await axiosSecure.get(`/users/lessons/count/${user?.email}`)).data
  });

  const { data: totalSaveLesson = {}, isLoading: l2 } = useQuery({
    queryKey: ['save-count', user?.email],
    queryFn: async () => (await axiosSecure.get('/users/saveLesson/count')).data
  });

  const { data: latestLessons = [], isLoading: l3 } = useQuery({
    queryKey: ['recent-lessons', user?.email],
    queryFn: async () => (await axiosSecure.get('/recent/lessons')).data
  });

  const { data: monthlyAnalytics = [], isLoading: l4 } = useQuery({
    queryKey: ['analytics-chart', user?.email],
    queryFn: async () => (await axiosSecure.get('/users/lessons/analytics/monthly')).data
  });

  if (l1 || l2 || l3 || l4) return <LoadingSpinner />;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 bg-base-100 min-h-screen text-neutral">
      <title>Analytics | {user?.displayName}</title>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-neutral">Performance Overview</h1>
          <p className="text-neutral-content font-medium opacity-80">Welcome back, {user?.displayName}. Here's your lesson activity.</p>
        </div>
        <Link
          to="/dashboard/add-lesson"
          className="btn btn-primary rounded-2xl px-6 normal-case shadow-lg shadow-primary/20"
        >
          <PlusCircle size={18} /> New Lesson
        </Link>
      </div>

      {/* 1. Metric Cards using Base-200 and Semantic Icons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Created", val: totalLesson.totalCreatedLessons, icon: BookOpen, accent: "text-primary", bg: "bg-primary/10" },
          { label: "Community Saves", val: totalSaveLesson.totalSaveLessons, icon: Star, accent: "text-accent", bg: "bg-accent/10" },
          { label: "Active Momentum", val: "84%", icon: Activity, accent: "text-success", bg: "bg-success/10" },
        ].map((card, i) => (
          <div key={i} className="group bg-base-200 border border-base-300 rounded-[2rem] p-6 transition-all hover:shadow-xl hover:border-primary/30">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-2xl ${card.bg} ${card.accent}`}>
                <card.icon size={24} />
              </div>
              <ArrowUpRight className="text-base-300 group-hover:text-neutral transition-colors" />
            </div>
            <div className="mt-4">
              <h3 className="text-4xl font-black text-neutral">{card.val}</h3>
              <p className="text-[10px] font-black text-neutral-content uppercase tracking-widest mt-1">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Chart Section & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Composed Area Chart with Theme Gradients */}
        <div className="lg:col-span-3 bg-base-200 border border-base-300 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-black text-neutral tracking-tight">Engagement Flow</h2>
            <div className="badge badge-outline border-base-300 text-neutral-content font-bold px-4 py-3">Monthly View</div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyAnalytics}>
                <defs>
                  <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(var(--p))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(var(--p))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(var(--b3))" />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'oklch(var(--nc))', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'oklch(var(--nc))', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: 'oklch(var(--b2))', borderRadius: '16px', border: '1px solid oklch(var(--b3))', color: 'oklch(var(--n))' }}
                />
                <Area
                  type="monotone"
                  dataKey="totalLessons"
                  stroke="oklch(var(--p))"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorPrimary)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Center - Uses Secondary (Slate) and Accent (Emerald) */}
        <div className="space-y-6">
          <div className="bg-neutral rounded-[2.5rem] p-8 text-neutral-content shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2 text-base-100">Growth Goal</h3>
              <p className="text-base-300 text-sm mb-6 font-medium">Create a new lesson to keep your momentum streak alive.</p>
              <Link to="/dashboard/add-lesson" className="btn btn-primary w-full rounded-2xl font-bold border-none">
                Get Started
              </Link>
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-base-200 border border-base-300 rounded-[2.5rem] p-6">
            <h3 className="font-black text-neutral-content mb-4 px-2 uppercase text-[10px] tracking-widest">Navigation</h3>
            <div className="flex flex-col gap-1">
              <Link to="/dashboard/my-lessons" className="flex items-center justify-between p-4 hover:bg-base-300 rounded-2xl transition-colors group">
                <span className="font-bold text-neutral">My Library</span>
                <ChevronRight size={18} className="text-base-300 group-hover:text-primary transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/dashboard/my-favorite" className="flex items-center justify-between p-4 hover:bg-base-300 rounded-2xl transition-colors group">
                <span className="font-bold text-neutral">Favorites</span>
                <ChevronRight size={18} className="text-base-300 group-hover:text-accent transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Recent Activity using Success/Error accents */}
      <div className="bg-base-200 border border-base-300 rounded-[2.5rem] p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-base-300 rounded-xl text-primary"><Clock size={20} /></div>
            <h2 className="text-xl font-black text-neutral">Recent Activity</h2>
          </div>
          <Link to="/dashboard/my-lessons" className="text-sm font-bold text-primary hover:underline">View All</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {latestLessons.map((lesson) => (
            <div key={lesson._id} className="flex items-center justify-between p-4 rounded-3xl bg-base-100 border border-base-300 hover:border-primary/50 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-base-200 rounded-2xl flex items-center justify-center shadow-sm font-black text-primary">
                  {lesson.title.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-neutral group-hover:text-primary transition-colors">{lesson.title}</h4>
                  <p className="text-xs text-neutral-content font-medium opacity-70 italic">Published to community</p>
                </div>
              </div>
              <Link to={`/lesson-details/${lesson._id}`} className="btn btn-ghost btn-circle btn-sm text-neutral-content hover:text-primary">
                <ArrowUpRight size={18} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserStatistics;