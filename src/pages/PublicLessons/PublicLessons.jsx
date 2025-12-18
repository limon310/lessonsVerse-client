import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import LessonCard from '../../components/Shared/LessonCard/LessonCard';
import useAuth from '../../hooks/useAuth';
import Container from '../../components/Shared/Container';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const LIMIT = 6;

const PublicLessons = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);

  // Fetch public lessons
  const { data: lessonsData = {}, isLoading: lessonsLoading, isFetching } = useQuery({
    queryKey: ['public-lessons', page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/public-lessons?page=${page}&limit=${LIMIT}`);
      return res.data;
    }
  });
  console.log("from public lesson page", lessonsData);
  const { lessons = [],
    total = 0,
    totalPages = 1 } = lessonsData;

  // Fetch logged-in user's details from DB
  const { data: userData = {}, isLoading: userLoading } = useQuery({
    queryKey: ['user', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`users/${user?.email}`);
      return res.data;
    }
  });

  const isUserPremium = userData?.isPremium;

  if (lessonsLoading || userLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <div>=
        <h2 className='text-3xl font-bold py-3'>Total Public lessons <span className='text-pink-500'>{total}</span></h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 mt-5'>
          {lessons.map(lesson => (
            <LessonCard
              key={lesson._id}
              lesson={lesson}
              isUserPremium={isUserPremium}
            />
          ))}
        </div>
        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages).keys()].map(num => {
              const pageNumber = num + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`px-4 py-2 border rounded
                    ${page === pageNumber
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-100'
                    }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>

            {isFetching && (
              <span className="ml-3 text-sm text-gray-500">
                Loading...
              </span>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default PublicLessons;