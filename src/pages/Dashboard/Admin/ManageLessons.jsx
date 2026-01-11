import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { Trash2, Heart, Eye, Filter, ShieldAlert, Globe, Lock, Star } from 'lucide-react';
import { RiHeartAdd2Fill, RiHeartAdd2Line } from "react-icons/ri";
import { VscOpenPreview } from "react-icons/vsc";
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast'

const ManageLessons = () => {
    const axiosSecure = useAxiosSecure();
    const [category, setCategory] = useState("");
    const [visibility, setVisibility] = useState("");
    const [flagged, setFlagged] = useState('');

    const { data: stats = {}, isLoading: statsLoading } = useQuery({
        queryKey: ['lesson-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/lessons/stats');
            return res.data;
        }
    });

    const { data: allLessons = [], isLoading: allLessonsLoading, refetch } = useQuery({
        queryKey: ['adminLessons-filter', category, visibility, flagged],
        queryFn: async () => {
            const params = {};
            if (category) params.category = category;
            if (visibility) params.visibility = visibility;
            if (flagged !== '') params.flagged = flagged;
            const res = await axiosSecure.get('/admin/lessons-filter', { params })
            return res.data;
        }
    });

    const handleDeleteLesson = (lesson) => {
        Swal.fire({
            title: "Delete Lesson?",
            text: "This will permanently remove the lesson from the database.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete",
            customClass: {
                confirmButton: 'btn btn-error px-6 mx-2',
                cancelButton: 'btn btn-ghost px-6 mx-2'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/lesson/${lesson._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            toast.success("Lesson deleted permanently");
                        }
                    })
            }
        });
    }

    const handleMakeFeture = async (id) => {
        try {
            const res = await axiosSecure.patch(`/updateLesson/${id}/featured`);
            if (res.data.modifiedCount > 0) {
                refetch();
                toast.success("Featured status updated");
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    const handleMakeReview = (id) => {
        axiosSecure.patch(`/update-status/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success("Lesson marked as reviewed");
                }
            })
    }

    if (statsLoading || allLessonsLoading) return <LoadingSpinner />

    return (
        <div className="space-y-8 pb-10">
            <title>Admin | Manage Lessons</title>

            {/* 1. Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card bg-base-100 border border-base-300 shadow-sm">
                    <div className="card-body flex-row items-center gap-4">
                        <div className="p-4 bg-primary/10 text-primary rounded-2xl"><Globe size={28} /></div>
                        <div>
                            <div className="text-sm font-bold opacity-60">Public</div>
                            <div className="text-3xl font-black">{stats.publicLessons || 0}</div>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 border border-base-300 shadow-sm">
                    <div className="card-body flex-row items-center gap-4">
                        <div className="p-4 bg-accent/10 text-accent rounded-2xl"><Lock size={28} /></div>
                        <div>
                            <div className="text-sm font-bold opacity-60">Private</div>
                            <div className="text-3xl font-black">{stats.privateLessons || 0}</div>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 border-error/20 bg-error/5 shadow-sm">
                    <div className="card-body flex-row items-center gap-4">
                        <div className="p-4 bg-error text-white rounded-2xl"><ShieldAlert size={28} /></div>
                        <div>
                            <div className="text-sm font-bold text-error">Flagged</div>
                            <div className="text-3xl font-black text-error">{stats.flaggedLessons || 0}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Filter Toolbar */}
            <div className="card bg-base-100 border border-base-300 shadow-sm p-4">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-primary font-bold">
                        <Filter size={20} />
                        <span>Filter Repository:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="select select-bordered select-sm bg-base-200"
                        >
                            <option value="">All Categories</option>
                            {["Personal", "Growth", "Career", "Relationships", "Mindset", "Health_Wellness"].map(c => (
                                <option key={c} value={c}>{c.replace('_', ' ')}</option>
                            ))}
                        </select>

                        <select
                            value={visibility}
                            onChange={(e) => setVisibility(e.target.value)}
                            className="select select-bordered select-sm bg-base-200"
                        >
                            <option value="">Visibility (All)</option>
                            <option value="Public">Public Only</option>
                            <option value="Private">Private Only</option>
                        </select>

                        <select
                            value={flagged}
                            onChange={(e) => setFlagged(e.target.value)}
                            className="select select-bordered select-sm bg-base-200"
                        >
                            <option value="">Report Status (All)</option>
                            <option value="true">Flagged Only</option>
                            <option value="false">Safe Only</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* 3. Lessons Table */}
            <div className="card bg-base-100 border border-base-300 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-base-200/50">
                            <tr className="text-neutral-content uppercase text-[11px] tracking-widest">
                                <th className="pl-6">#</th>
                                <th>Lesson Title</th>
                                <th>Category / Status</th>
                                <th className="text-center">Moderation</th>
                                <th className="text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allLessons.map((lesson, index) => (
                                <tr key={lesson._id} className="hover:bg-base-200/40 transition-colors">
                                    <td className="pl-6 font-mono opacity-50">{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="font-bold text-neutral leading-tight">{lesson.title}</div>
                                            {lesson.isFeatured && <Star size={14} className="fill-warning text-warning" />}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-bold opacity-60 uppercase">{lesson.category}</span>
                                            <div className={`badge badge-sm font-bold ${lesson.visibility === 'Public' ? 'badge-primary' : 'badge-ghost'}`}>
                                                {lesson.visibility}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center space-x-2">
                                        <div className="tooltip" data-tip="Feature Lesson">
                                            <button
                                                onClick={() => handleMakeFeture(lesson._id)}
                                                className={`btn btn-circle btn-xs border-none transition-all ${lesson.isFeatured ? 'bg-pink-100 text-pink-600' : 'bg-base-200'}`}
                                            >
                                                {lesson.isFeatured ? <RiHeartAdd2Fill size={16} /> : <RiHeartAdd2Line size={16} />}
                                            </button>
                                        </div>
                                        <div className="tooltip" data-tip="Mark Reviewed">
                                            <button
                                                onClick={() => handleMakeReview(lesson._id)}
                                                className="btn btn-circle btn-xs bg-indigo-100 text-indigo-600 border-none hover:bg-indigo-600 hover:text-white"
                                            >
                                                <VscOpenPreview size={16} />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="text-right pr-6 space-x-2">
                                        {/* <button className="btn btn-sm btn-ghost hover:bg-primary/10 text-primary">
                                            <Eye size={18} />
                                        </button> */}
                                        <button
                                            onClick={() => handleDeleteLesson(lesson)}
                                            className="btn btn-sm btn-ghost hover:bg-error/10 text-error"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {allLessons.length === 0 && (
                    <div className="p-20 text-center opacity-40 italic font-medium">
                        No lessons match the selected filters.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageLessons;