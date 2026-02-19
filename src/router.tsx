import {
  DollarSignIcon,
  LayoutDashboardIcon,
  NewspaperIcon
} from 'lucide-react'
import { Navigate, useRoutes } from 'react-router'
import Layout from './components/layout'
import { NavGroup } from './components/layout/types'
import { useAuth } from './context/auth/authContext'
import Login from './features/authentication/login'
import Register from './features/authentication/register'
import Kanban from './features/kanban'
import CreateKanban from './features/kanban/create'
import DetailKanban from './features/kanban/detail'
import EditKanban from './features/kanban/edit'
import { Payments } from './features/payment'
import Post from './features/posts'
import PostDetail from './features/posts/detail'

const privateRoutes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        title: 'General',
        children: [
          {
            title: 'Post',
            icon: NewspaperIcon,
            children: [
              {
                title: 'Post List',
                path: '/',
                element: <Post />
              },
              {
                hide: true,
                title: 'Post Detail',
                path: '/post/:postId',
                element: <PostDetail />
              }
            ]
          },
          {
            title: 'Payment',
            path: '/payment',
            icon: DollarSignIcon,
            element: <Payments />
          },
          {
            title: 'Kanban',
            icon: LayoutDashboardIcon,
            children: [
              {
                title: 'Kanban ',
                path: '/kanban',
                element: <Kanban />
              },
              {
                title: 'Kanban Create',
                path: '/kanban/create',
                element: <CreateKanban />
              },
              {
                hide: true,
                title: 'Kanban Detail',
                path: '/kanban/detail/:id',
                element: <DetailKanban />
              },
              {
                hide: true,
                title: 'Kanban Edit',
                path: '/kanban/edit/:id',
                element: <EditKanban />
              }
            ]
          }
        ]
      }
    ]
  }
]

const publicRoutes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  { path: '*', element: <Navigate to='/' replace /> }
]

// Preview mode: sandbox screenshots navigate with ?_preview=1.
// Show all routes so both private pages and public pages (login, register) render.
const isPreviewMode = new URLSearchParams(window.location.search).has('_preview')

const previewRoutes = [
  ...privateRoutes,
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> }
]

export const DashboardMenu = (): NavGroup[] => {
  return privateRoutes[0].children
}

export const RoutesApp = () => {
  const { state: authState } = useAuth()

  if (isPreviewMode) {
    return useRoutes(previewRoutes)
  }

  return useRoutes(authState.isAuthenticated ? privateRoutes : publicRoutes)
}