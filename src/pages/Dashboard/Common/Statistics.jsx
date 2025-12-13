import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'
import CustomerStatistics from '../../../components/Dashboard/Statistics/CustomerStatistics';
import useRole from '../../../hooks/useRole'
const Statistics = () => {
  const {role} = useRole();
  return (
    <div>
      {
        role === "admin" && <AdminStatistics />
      }
      {
        role === "customer" && <CustomerStatistics />
      }
    </div>
  )
}

export default Statistics
