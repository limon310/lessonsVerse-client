import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import LessonCard from '../../../components/Shared/LessonCard/LessonCard';
import Container from '../../../components/Shared/Container';

const AuthorProfile = () => {
    const { creatorId } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: authorLessons = [], isLoading } = useQuery({
        queryKey: ['all-lessons-by-thisAuthor', creatorId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/author-lessons?creatorId=${creatorId}`);
            return res.data;
        }
    })
    // console.log("author lessons", authorLessons);
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    const author = authorLessons[0].authorInfo;

    return (
        <Container>
            <div>
                {/* dynamic title */}
                <title>Author Profile</title>
                <div className="author-card flex justify-center items-center bg-white p-6 rounded-lg shadow mb-8">
                    <img
                        src={author.image}
                        alt={author.name}
                        className="w-24 h-24 rounded-full object-cover mr-6"
                    />
                    <div>
                        <h1 className="text-2xl font-bold">{author.name}</h1>
                        <p className="text-gray-600">{author.email}</p>
                        <p className="text-gray-700 mt-1">Total Lessons: {authorLessons.length}</p>
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 mt-5'>
                    {authorLessons.map(lesson => (
                        <LessonCard
                            key={lesson._id}
                            lesson={lesson}
                        // isUserPremium={isUserPremium}
                        />
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default AuthorProfile;