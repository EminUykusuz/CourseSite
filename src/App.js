import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
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
import CourseDetailPage, { CourseDetailsLoader } from './pages/courseDetailPage';
import Todolist from './todolist';
import CourseCreatePage from './pages/courseCreate';
import CourseEditPage from './pages/courseEdit';
import CourseFormPage from './pages/courseForm';
import AuthPage from './pages/LogReg';
import CreateAccountPage from './pages/createaccountPage';
import AdminPage from './pages/admin';
import NotAuthorized from './pages/NotAuthorized';

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
          { index: true, element: <Courses /> },
          { path: 'create', element: <CourseCreatePage /> },
          { path: ':courseId/edit', element: <CourseEditPage /> },
          { path: 'form', element: <CourseFormPage /> },
        ]
      },
      { path: 'courses/:courseId', element: <CourseDetailPage />, loader: CourseDetailsLoader },
      { path: 'todolist', element: <Todolist /> },
      { path: 'Account', element: <CreateAccountPage /> },
      { path: 'AuthPage', element: <AuthPage /> },
      {
        path: 'admin',
        element: (
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        )
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
