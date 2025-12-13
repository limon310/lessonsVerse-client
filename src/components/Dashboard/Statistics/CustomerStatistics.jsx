// import { useQuery } from '@tanstack/react-query';
import { Pie, PieChart } from 'recharts';
// import useAuth from '../../../hooks/useAuth';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

const CustomerStatistics = () => {
  // const { user } = useAuth();
  // const axiosSecure = useAxiosSecure();
  // const { data: myLessons } = useQuery({
  //   queryKey: ['my-lessons', user?.email],
  //   queryFn: async () => {
  //     const res = axiosSecure.get(`/my-lessons/${user?.email}`)
  //     return res.data;
  //   }
  // })
  return (
    <div>
      <p>Customer Statistics Page</p>

      {/* <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 2 }} responsive>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={myLessons}
          cx="50%"
          cy="100%"
          outerRadius="120%"
          fill="#8884d8"
          label
          isAnimationActive={true}
        />
      </PieChart> */}
    </div>
  )
}

export default CustomerStatistics
