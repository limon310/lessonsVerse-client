import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import LessonCard from '../../Shared/LessonCard/LessonCard';
import useAuth from '../../../hooks/useAuth';
import Container from '../../Shared/Container';

const FeatureLesson = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // Fetch logged-in user's details from DB
    const { data: userData = {}, isLoading: userLoading } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    });

    const isUserPremium = userData?.isPremium;

    const { data: featuredLessons = [], isLoading } = useQuery({
        queryKey: ['featuredLesson'],
        queryFn: async () => {
            const res = await axiosSecure.get('/featured-lesson')
            return res.data;
        }
    })
    console.log(featuredLessons || userLoading);

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <Container>
        <div className='py-10'>
            <h2 className='text-3xl font-bold text-center text-purple-500 mb-8'>Featured Lesson</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {
                featuredLessons.map(lesson => <LessonCard
                    key={lesson._id}
                    lesson={lesson}
                    isUserPremium={isUserPremium}
                ></LessonCard>)
            }
            </div>
        </div>
        </Container>
    );
};

export default FeatureLesson;