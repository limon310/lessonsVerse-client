import React, { useEffect, useState } from 'react';
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
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [emotion, setEmotion] = useState('');
  const [sort, setSort] = useState('newest');
  const [searchInput, setSearchInput] = useState('');

  // Fetch public lessons
  const { data: lessonsData = {}, isLoading: lessonsLoading, isFetching } = useQuery({
    queryKey: ['public-lessons', search, page, category, emotion, sort],
    queryFn: async () => {
      const res = await axiosSecure.get(`/public-lessons`, {
        params: {
          page,
          limit: LIMIT,
          search,
          category,
          emotion,
          sort
        }
      });
      return res.data;
    }
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchInput]);

  // ?page=${page}&limit=${LIMIT}&search=${search}&category=${category}&emotion=${emotion}&sort=${sort}
  // console.log("from public lesson page", lessonsData);
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

  // Reset page when filter/search changes
  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setPage(1);
  };

  if (lessonsLoading || userLoading) {
    return <LoadingSpinner />;
  }

  const handleEmotion = (e) => {
    setEmotion(e.target.value);
  }

  return (
    <Container>
      <div>
        <h2 className='text-3xl font-bold py-3'>Total Public lessons <span className='text-pink-500'>{total}</span></h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-6">
          {/* Search */}
          <input
            type="text"
            placeholder="Search lessons..."
            value={searchInput}
            onChange={handleFilterChange(setSearchInput)}
            className="border px-3 py-2 rounded"
          />

          {/* Category */}
          <select
            value={category}
            onChange={handleFilterChange(setCategory)}
            className="border px-3 py-2 rounded"
          >
            <option value="">All Categories</option>
            <option value="Personal ">Personal </option>
            <option value="Growth">Growth</option>
            <option value="Career">Career</option>
            <option value="Relationships">Relationships</option>
            <option value="Mindset">Mindset</option>
            <option value="Mistakes_learned">Mistakes Learned</option>
            <option value="Finance_Money">Finance Money</option>
            <option value="Health_Wellness">Health Wellness</option>
          </select>

          {/* Emotion */}
          <select
            value={emotion}
            onChange={handleFilterChange(setEmotion)}
            className="border px-3 py-2 rounded"
          >
            <option value="">All Emotions</option>
            <option value="Motivational">Motivational</option>
            <option value="Sad">Sad</option>
            <option value="Realization">Realization</option>
            <option value="Gratitude">Gratitude</option>
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={handleFilterChange(setSort)}
            className="border px-3 py-2 rounded"
          >
            <option value="newest">Newest</option>
            <option value="mostSaved">Oldest</option>
          </select>

          {/* Result Count */}
          <div className="flex items-center font-medium">
            Total: <span className="ml-2 text-pink-500">{total}</span>
          </div>
        </div>

          {/* lesson card grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 mt-5'>
          {lessons.map(lesson => (
            <LessonCard
              key={lesson._id}
              lesson={lesson}
              isUserPremium={isUserPremium}
            />
          ))}
        </div>
        {/* Pagination */}
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