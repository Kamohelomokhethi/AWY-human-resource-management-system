import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Points from './pages/Points-overview'
import TrackDev from './pages/Track-dev'
import AddVehicle from './pages/Add-vehicle'
import Training from './pages/Training-schedule'
import Addmember from './pages/Add-member'
import NavbarSidebar from './pages/navbar'
import Members from './pages/Members'
import Vehicles from './pages/Vehicles'

function App() {
  return (
    <NavbarSidebar>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/home' element={<Index />} />
        <Route path='/add-member' element={<Addmember />} />
        <Route path='/members' element={<Members />} />
        <Route path='/track-dev' element={<TrackDev />} />
        <Route path='/training-Schedule' element={<Training />} />
        <Route path='/points-overview' element={<Points />} />
        <Route path='/add-vehicle' element={<AddVehicle />} />
        <Route path='/vehicles' element={<Vehicles />} />
        
      </Routes>
    </NavbarSidebar>
  )
}

export default App
