import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { FaEye } from 'react-icons/fa6';
import ReportDetailsModal from '../../../components/Modal/ReportDetailsModal';
import { Trash2, AlertTriangle, ShieldAlert, FileWarning, ArrowRight } from 'lucide-react';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const ManageFlaggedLesson = () => {
    const axiosSecure = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);

    const closeModal = () => {
        setIsOpen(false);
        setSelectedLesson(null);
    };

    const openDetails = (lesson) => {
        setSelectedLesson(lesson);
        setIsOpen(true);
    };

    const { data: flaggedLessons = [], isLoading: flaggedLessonLoading, refetch } = useQuery({
        queryKey: ['flaggedLessons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/flagged-lessons');
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Confirm Removal?",
            text: "This flagged lesson and its associated reports will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Delete Content",
            background: 'oklch(var(--b1))',
            color: 'oklch(var(--bc))'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-flagged-lesson/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            toast.success("Flagged content removed");
                        }
                    })
            }
        });
    };

    if (flaggedLessonLoading) return <LoadingSpinner />;

    return (
        <div className="space-y-6 pb-10">
            <title>Admin | Moderation Queue</title>

            {/* Header & Stats Summary */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-error/5 border border-error/20 p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-error text-white rounded-xl shadow-lg shadow-error/20">
                        <ShieldAlert size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-neutral tracking-tight">Moderation Queue</h2>
                        <p className="text-sm font-medium text-error/80 uppercase tracking-wider">
                            {flaggedLessons.length} Lessons require review
                        </p>
                    </div>
                </div>
                <div className="hidden lg:flex items-center gap-3 text-xs font-bold text-neutral-content/60 bg-base-100 px-4 py-2 rounded-full border border-base-300">
                    <AlertTriangle size={14} className="text-warning" />
                    Review reports before taking destructive action.
                </div>
            </div>

            {/* Table Surface */}
            <div className="card bg-base-100 border border-base-300 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-base-200/50">
                            <tr className="text-neutral-content uppercase text-[11px] tracking-widest font-bold">
                                <th className="py-4 pl-6">#</th>
                                <th>Flagged Content</th>
                                <th>Report Severity</th>
                                <th>Reasoning</th>
                                <th className="text-right pr-6">Management</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flaggedLessons.length > 0 ? (
                                flaggedLessons.map((lesson, i) => (
                                    <tr key={lesson._id} className="hover:bg-error/[0.02] group transition-colors border-b border-base-200 last:border-0">
                                        <td className="pl-6 font-mono text-xs opacity-50">{i + 1}</td>

                                        <td>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-neutral group-hover:text-error transition-colors">
                                                    {lesson.lessonTitle}
                                                </span>
                                                <span className="text-[10px] font-mono opacity-50">ID: {lesson._id.slice(-8)}</span>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="flex items-center gap-2">
                                                <div className={`badge badge-md gap-2 font-bold py-3 ${lesson.reportCount > 5 ? 'badge-error' : 'badge-warning'
                                                    }`}>
                                                    <FileWarning size={12} />
                                                    {lesson.reportCount} Reports
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <button
                                                onClick={() => openDetails(lesson)}
                                                className="btn btn-ghost btn-xs text-primary font-bold gap-1 hover:bg-primary/10"
                                            >
                                                View Reports <ArrowRight size={14} />
                                            </button>
                                        </td>

                                        <td className="text-right pr-6">
                                            <div className="flex justify-center gap-2">
                                                {/* <div className="tooltip tooltip-left" data-tip="Inspect Content">
                                                    <button
                                                        onClick={() => openDetails(lesson)}
                                                        className="btn btn-square btn-sm bg-base-200 text-neutral hover:bg-primary hover:text-white border-none"
                                                    >
                                                        <FaEye size={18} />
                                                    </button>
                                                </div> */}
                                                <div className="tooltip tooltip-left" data-tip="Permanently Delete">
                                                    <button
                                                        onClick={() => handleDelete(lesson._id)}
                                                        className="btn btn-square btn-sm bg-error/10 text-error hover:bg-error hover:text-white border-none"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-24 text-center">
                                        <div className="flex flex-col items-center opacity-30">
                                            <ShieldAlert size={64} />
                                            <p className="mt-4 text-xl font-black uppercase tracking-widest">Inbox Zero</p>
                                            <p className="text-sm font-medium italic">No lessons are currently flagged for review.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Logic */}
            {selectedLesson && (
                <ReportDetailsModal
                    closeModal={closeModal}
                    isOpen={isOpen}
                    lesson={selectedLesson}
                />
            )}
        </div>
    );
};

export default ManageFlaggedLesson;