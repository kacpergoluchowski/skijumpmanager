import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import StartPage from './pages/StartPage.jsx'
import CountrySelectionPage from './pages/CountrySelectionPage.jsx'
import Home from './pages/Home.jsx'
import Calendar from './pages/Caledar.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />
  },
  {
    path: '/select-country',
    element: <CountrySelectionPage />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/calendar',
    element: <Calendar />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
