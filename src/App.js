import { createBrowserRouter, RouterProvider ,useRouteError} from 'react-router-dom';

import './App.css';

// Layoutlar
import MainLayout from './MainLayout/MainLayout';
import HelpLayout from './MainLayout/HelpLayout';
import CourseLayout from './MainLayout/CourseLayout';

// Sayfalar
import HomePage from './pages/Home';
import AboutPage from './pages/about';
import Courses, { CoursesLoader } from './pages/courses';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/Faq';
import CourseDetailPagee, { CourseDetailsLoader } from './pages/courseDetailPage2';
import Todolist from './todolist';
import AuthPage from './pages/LogReg';
import CreateAccountPage from './pages/createaccountPage';
import AdminPage from './pages/admin';
import NotAuthorized from './pages/NotAuthorized';
import CourseList from './pages/CourseList';
import CourseCreate from './pages/CourseCreate';

// Korumalı rota bileşeni
import ProtectedRoute from './Components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'home', element: <HomePage />, loader: CoursesLoader },
      { path: 'about', element: <AboutPage /> },
      {
        path: 'courses',
        id: 'courses-loader',
        loader: CoursesLoader,
        element: <CourseLayout />,
        children: [
          { index: true, element: <CourseList /> },
          { path: ':courseId', element: <CourseDetailPagee />, loader: CourseDetailsLoader },
       
        ]
      },
      {path:'login',element:<AuthPage />},
      { path: 'todolist', element: <Todolist /> },
      { path: 'Account', element: <CreateAccountPage /> },
      { path: 'AuthPage', element: <AuthPage /> },
      {path:"/courses/:id", element:<CourseDetailPagee />},
      // Admin paneli ve kurs oluşturma alanları
      {
        path: 'admin',
        element: (
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        ),
        children: [
          { path: 'courses', element: <CourseList /> },
          { path: 'courses/create', element: <CourseCreate /> }
        ]
      },

      {
        path: 'HelpLayout',
        element: <HelpLayout />,
        children: [
          { path: 'contact', element: <ContactPage /> },
          { path: 'Faq', element: <FaqPage /> },
        ]
      },
      {
        path: 'unauthorized',
        element: <NotAuthorized />
      }
    ]
  }
]);



function App() {
  return <RouterProvider router={router} />;
}

export default App;
