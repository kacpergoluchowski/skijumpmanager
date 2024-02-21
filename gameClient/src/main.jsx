import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import StartPage from './pages/StartPage.jsx'
import CountrySelectionPage from './pages/CountrySelectionPage.jsx'
import Home from './pages/Home.jsx'
import Calendar from './pages/Caledar.jsx'
import NationalList from './pages/NationalList.jsx'
import Teams from './pages/Teams.jsx'
import Competitions from './pages/Competitions.jsx'
import Tournaments from './pages/Tournaments.jsx'
import GrandPrixInfo from './pages/GrandPrixInfo.jsx'
import WorldCupInfo from './pages/WorldCupInfo.jsx'
import FourHillsInfo from './pages/FourHillsInfo.jsx'
import Training from './pages/Training.jsx'

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
  },
  {
    path: "/nationalList",
    element: <NationalList />
  },
  {
    path: "/teams",
    element: <Teams />
  },
  {
    path: "/competitions",
    element: <Competitions />
  },
  {
    path: "/tournaments",
    element: <Tournaments />
  },
  {
    path: "/grandPrixInfo",
    element: <GrandPrixInfo />
  },
  {
    path: "/worldCupInfo",
    element: <WorldCupInfo />
  },
  {
    path: "/fhtInfo",
    element: <FourHillsInfo />
  },
  {
    path: "/training",
    element: <Training />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
