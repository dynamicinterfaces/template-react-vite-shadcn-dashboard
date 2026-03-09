import {
  DollarSignIcon,
  LayoutDashboardIcon,
  NewspaperIcon,
  BarChart3Icon,
  CalculatorIcon,
} from 'lucide-react'
import { Navigate, useRoutes } from 'react-router'
import Layout from './components/layout'
import { NavGroup } from './components/layout/types'
import { useAuth } from './context/auth/authContext'
import Login from './features/authentication/login'
import Register from './features/authentication/register'
import GoogleCallbackPage from './pages/GoogleCallbackPage'
import WelcomePage from './pages/WelcomePage'
import Kanban from './features/kanban'
import CreateKanban from './features/kanban/create'
import DetailKanban from './features/kanban/detail'
import EditKanban from './features/kanban/edit'
import { Payments } from './features/payment'
import FinancialsDashboard from './features/financials'
import AccountingDashboard from './features/accounting'
import IncomeStatement from './features/accounting/income-statement'
import CashFlowStatement from './features/accounting/cash-flow'
import ARAgingPage from './features/accounting/ar-aging'
import AnalyticsPage from './features/analytics'
import SalesPage from './features/sales'
import PeoplePage from './features/people'
import OperationsPage from './features/operations'
import IntelligencePage from './features/intelligence'
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
            title: 'Financials',
            path: '/financials',
            icon: BarChart3Icon,
            element: <FinancialsDashboard />
          },
          {
            title: 'Accounting',
            icon: CalculatorIcon,
            children: [
              {
                title: 'Overview',
                path: '/accounting',
                element: <AccountingDashboard />
              },
              {
                title: 'Income Statement',
                path: '/accounting/income-statement',
                element: <IncomeStatement />
              },
              {
                title: 'Cash Flow',
                path: '/accounting/cash-flow',
                element: <CashFlowStatement />
              },
              {
                title: 'AR Aging',
                path: '/accounting/ar-aging',
                element: <ARAgingPage />
              },
            ]
          },
          {
            title: 'Analytics',
            path: '/analytics',
            icon: BarChart3Icon,
            element: <AnalyticsPage />
          },
          {
            title: 'Sales',
            path: '/sales',
            icon: DollarSignIcon,
            element: <SalesPage />
          },
          {
            title: 'People',
            path: '/people',
            icon: Users2Icon,
            element: <PeoplePage />
          },
          {
            title: 'Operations',
            path: '/operations',
            icon: ActivityIcon,
            element: <OperationsPage />
          },
          {
            title: 'Intelligence',
            path: '/intelligence',
            icon: BrainIcon,
            element: <IntelligencePage />
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
  {
    path: '/auth/google/callback',
    element: <GoogleCallbackPage />
  },
  { path: '*', element: <Navigate to='/login' replace /> }
]

// Preview mode: sandbox screenshots navigate with ?_preview=1.
// Show all routes so both private pages and public pages (login, register) render.
const isPreviewMode = new URLSearchParams(window.location.search).has('_preview')

const previewRoutes = [
  ...privateRoutes,
  { path: '/financials', element: <FinancialsDashboard /> },
  { path: '/accounting', element: <AccountingDashboard /> },
  { path: '/accounting/income-statement', element: <IncomeStatement /> },
  { path: '/accounting/cash-flow', element: <CashFlowStatement /> },
  { path: '/accounting/ar-aging', element: <ARAgingPage /> },
  { path: '/analytics', element: <AnalyticsPage /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/auth/google/callback', element: <GoogleCallbackPage /> },
  { path: '/welcome', element: <WelcomePage /> },
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