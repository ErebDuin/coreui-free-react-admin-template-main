import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const StudentList = React.lazy(() => import('./views/students/StudentList'))
const NewStudent = React.lazy(() => import('./views/students/NewStudent'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/studentList', name: 'Student List', element: StudentList },
  { path: '/newStudent', name: 'New Student', element: NewStudent },
]

export default routes
