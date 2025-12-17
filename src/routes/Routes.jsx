import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import AddLesson from '../pages/Dashboard/User/AddLesson'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'
import ManageOrders from '../pages/Dashboard/User/ManageOrders'
import MyLessons from '../pages/Dashboard/User/MyLessons'
import { createBrowserRouter } from 'react-router'
import PublicLessons from '../pages/PublicLessons/PublicLessons'
import PricingComparisonTable from '../pages/PricingComparisonTable/PricingComparisonTable'
import PaymentSuccess from '../pages/Payment/PaymentSuccess'
import LessonDetails from '../pages/LessonDetails/LessonDetails'
import UpdateLesson from '../pages/Dashboard/UpdateLesson/UpdateLesson'
import AdminRoute from './AdminRoute'
import UserRoute from './UserRoute'
import ManageLessons from '../pages/Dashboard/Admin/ManageLessons'
import MyFavorite from '../pages/Dashboard/User/MyFavorite'
import ManageFlaggedLesson from '../pages/Dashboard/Admin/ManageFlaggedLesson'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/public-lessons',
        Component: PublicLessons,
      },
      {
        path: '/upgrade-premium',
        element: <PrivateRoute>
          <PricingComparisonTable></PricingComparisonTable>
        </PrivateRoute>,
      },
      {
        path: '/payment-success',
        element: <PrivateRoute>
          <PaymentSuccess></PaymentSuccess>
        </PrivateRoute>,
      },
      {
        path: '/lesson-details/:id',
        element: <PrivateRoute>
          <LessonDetails></LessonDetails>
        </PrivateRoute>,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-lessons',
        element: (
          <PrivateRoute>
            <UserRoute>
              <MyLessons />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'add-lesson',
        element: (
          <PrivateRoute>
            <UserRoute>
              <AddLesson />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-favorite',
        element: (
          <PrivateRoute>
            <UserRoute>
              <MyFavorite />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'update-lesson',
        element: (
          <PrivateRoute>
            <UpdateLesson />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-lessons',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageLessons />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-flagged-lessons',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageFlaggedLesson />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-orders',
        element: <ManageOrders />,
      },
    ],
  },
])
