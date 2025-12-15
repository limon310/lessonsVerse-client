import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import LessonCard from '../../components/Shared/LessonCard/LessonCard';
import useAuth from '../../hooks/useAuth';
import Container from '../../components/Shared/Container';
const PublicLessons = () => {

  const { user } = useAuth();

  // Fetch public lessons
  const { data: public_lessons = [], isLoading: lessonsLoading } = useQuery({
    queryKey: ['public-lessons'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/public-lessons');
      return res.data;
    }
  });

  // Fetch logged-in user's details from DB
  const { data: userData = {}, isLoading: userLoading } = useQuery({
    queryKey: ['user', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/users/${user?.email}`);
      return res.data;
    }
  });

  const isUserPremium = userData?.isPremium;

  if (lessonsLoading || userLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <div>
        <h2 className='text-3xl font-bold py-3'>Total Public lessons <span className='text-pink-500'>{public_lessons.length}</span></h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 mt-5'>
          {public_lessons.map(lesson => (
            <LessonCard
              key={lesson._id}
              lesson={lesson}
              isUserPremium={isUserPremium}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PublicLessons;
