import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import LessonCard from '../../../components/Shared/LessonCard/LessonCard';
import { useState } from 'react';

const UserLessonSection = ({isUserPremium}) => {
    const axiosSecure = useAxiosSecure();
    // const { user } = useAuth();
    const [sort, setSort] = useState("");
    const { data: myLessons = [], isLoading } = useQuery({
        queryKey: ['my-PublicLessons', sort],
        queryFn: async () => {
            const params = {};
            if(sort)params.sort = sort
            const res = await axiosSecure.get('my-Publiclessons', {params})
            return res.data;
        }
    })
    // console.log(myLessons);

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div>
            <div className='flex gap-3'>
            <h2 className='text-3xl font-bold text-pink-500'>Sort by: </h2>
            {/* sort */}
            {/* emotional_ton */}
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className='border px-3 py-2 rounded'
            >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
            </select>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 mt-5'>
                {myLessons.map(lesson => (
                    <LessonCard
                        key={lesson._id}
                        lesson={lesson}
                        isUserPremium={isUserPremium}
                    />
                ))}
            </div>
        </div>
    );
};

export default UserLessonSection;