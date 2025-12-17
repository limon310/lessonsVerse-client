import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import Container from '../../../components/Shared/Container';
import { FaEye } from 'react-icons/fa6';
import { useState } from 'react';
import ReportDetailsModal from '../../../components/Modal/ReportDetailsModal';
import { Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

const ManageFlaggedLesson = () => {
    const axiosSecure = useAxiosSecure();
    let [isOpen, setIsOpen] = useState(false)
    const closeModal = () => {
        setIsOpen(false)
    }

    // get all flagged lessons
    const { data: flaggedLessons, isLoading: flaggedLessonLoading, refetch } = useQuery({
        queryKey: ['flaggedLessons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/flagged-lessons')
            return res.data;
        }
    })
    // console.log("all flagged lessons", flaggedLessons);

    // handle delete flagged lesson
    const handleDelete = (id) => {
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
                console.log("clicked delete button", id)
                axiosSecure.delete(`/delete-flagged-lesson/${id}`)
                    .then(res => {
                        refetch();
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

    if (flaggedLessonLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <Container>
            <div className='py-5'>
                <h2 className='text-3xl font-bold mb-5 text-pink-500'>Flagged Lessons</h2>
                {/* table */}
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Lesson Id</th>
                                <th>Total Report</th>
                                <th>Details</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                flaggedLessons.map((lesson, i) => <tr
                                    key={lesson._id}
                                    className="bg-base-200">
                                    <td>{i + 1}</td>
                                    <td>{lesson.lessonTitle
                                    }</td>
                                    <td>{lesson.reportCount}</td>
                                    <td>
                                        <button className='cursor-pointer'
                                            onClick={() => setIsOpen(true)}
                                        ><FaEye size={24} />
                                            <ReportDetailsModal
                                                closeModal={closeModal}
                                                isOpen={isOpen}
                                                lesson={lesson}
                                            ></ReportDetailsModal>
                                        </button>
                                    </td>
                                    <td>
                                        <button className='cursor-pointer'
                                            onClick={() => handleDelete(lesson._id)}
                                        ><Trash2 /></button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Container>
    );
};

export default ManageFlaggedLesson;