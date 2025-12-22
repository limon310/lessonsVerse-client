import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import Container from '../../../components/Shared/Container';
import { Trash2 } from 'lucide-react';
import { RiHeartAdd2Fill, RiHeartAdd2Line } from "react-icons/ri";
import { VscOpenPreview } from "react-icons/vsc";
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast'

const ManageLessons = () => {

    const axiosSecure = useAxiosSecure();

    const [category, setCategory] = useState("");
    const [visibility, setVisibility] = useState("");
    const [flagged, setFlagged] = useState('');

    // lesson states
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['lesson-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/lessons/stats');
            return res.data;
        }
    });

    // filter
    const { data: allLessons = [], isLoading: allLessonsLoading, refetch } = useQuery({
        queryKey: ['adminLessons-filter', category, visibility, flagged],
        queryFn: async () => {
            const params = {};
            if (category) params.category = category;
            if (visibility) params.visibility = visibility;
            if (flagged !== '') {
                params.flagged = flagged;
            }
            const res = await axiosSecure.get('/admin/lessons-filter', { params })
            return res.data;
        }
    });
    // console.log(allLessons)

    // HANDLE DELETE LESSONS
    const handleDeleteLesson = (lesson) => {
        console.log("delete lesson button clicked");
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
                axiosSecure.delete(`/lesson/${lesson._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "lesson has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    // HANDLE MAKE FEATURE
    const handleMakeFeture = (id) => {
        // console.log("make featured", id);
        try {
            axiosSecure.patch(`/updateLesson/${id}/featured`)
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        toast.success("update featured");
                    }
                })
        } catch (err) {
            toast.error(err.message);
        }

    }

    // HANDLE REVIEW
    const handleMakeReview = (id) => {
        console.log("review button clicked", id);
        axiosSecure.patch(`/update-status/${id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success("status reviewed");
                }
            })
    }

    if (isLoading || allLessonsLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        // <Container>
        <div>
            {/* dynamic title */}
            <title>Manage Lessons</title>
            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div className="stat bg-base-100 shadow">
                    <div className="text-lg">Public Lessons</div>
                    <div className="text-2xl font-bold">{stats.publicLessons}</div>
                </div>

                <div className="stat bg-base-100 shadow">
                    <div className="text-lg">Private Lessons</div>
                    <div className="text-2xl font-bold">{stats.privateLessons}</div>
                </div>

                <div className="stat bg-base-100 shadow">
                    <div className="text-lg text-red-500">Flagged Lessons</div>
                    <div className="text-2xl font-bold">{stats.flaggedLessons}</div>
                </div>
            </div>
            <h2 className='text-3xl font-bold mb-2 text-purple-500'>Filter by: </h2>

            {/* filter */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-6">
                {/* Category */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option value="">All Categories</option>
                    <option value="Personal">Personal </option>
                    <option value="Growth">Growth</option>
                    <option value="Career">Career</option>
                    <option value="Relationships">Relationships</option>
                    <option value="Mindset">Mindset</option>
                    <option value="Mistakes_learned">Mistakes Learned</option>
                    <option value="Finance_Money">Finance Money</option>
                    <option value="Health_Wellness">Health Wellness</option>
                </select>

                {/* visibility */}
                <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option value="">All</option>
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                </select>
                {/* flagged */}
                <select
                    value={flagged}
                    onChange={(e) => setFlagged(e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option value="">All Lessons</option>
                    <option value="true">Flagged Lessons</option>
                    <option value="false">Unflagged Lessons</option>
                </select>
            </div>

            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr className='text-lg font-bold'>
                        <th>#</th>
                        <th>Title</th>
                        <th>Delete</th>
                        <th>Make Feature</th>
                        <th>Mark as reviewed</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        allLessons.map((lesson, index) => <tr key={lesson._id}>
                            <td>{index + 1}</td>
                            <td>{lesson.title}</td>
                            <td>
                                <button
                                    onClick={() => handleDeleteLesson(lesson)}
                                    className='btn cursor-pointer'>
                                    <Trash2 size={24} />
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleMakeFeture(lesson._id)}
                                    className='btn cursor-pointer'
                                >
                                    {
                                        lesson.isFeatured
                                            ? <p><RiHeartAdd2Fill size={24} /></p>
                                            : <RiHeartAdd2Line size={24} />
                                    }

                                </button>
                            </td>
                            <td>
                                <button className='btn cursor-pointer'
                                    onClick={() => handleMakeReview(lesson._id)}
                                > <VscOpenPreview size={24} />

                                </button>
                            </td>
                            <td>
                                view
                            </td>
                        </tr>)
                    }


                </tbody>
            </table>
        </div>
        // </Container>
    );
};

export default ManageLessons;