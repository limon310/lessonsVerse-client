import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import LessonCard from '../../../components/Shared/LessonCard/LessonCard';

const UserLessonSection = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: myLessons = [], isLoading } = useQuery({
        queryKey: ['my-lessons'],
        queryFn: async () => {
            const res = await axiosSecure.get(`my-Publiclessons/${user?.email}`)
            return res.data;
        }
    })
    console.log(myLessons);

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 mt-5'>
                {myLessons.map(lesson => (
                    <LessonCard
                        key={lesson._id}
                        lesson={lesson}
                    />
                ))}
            </div>
        </div>
    );
};

export default UserLessonSection;