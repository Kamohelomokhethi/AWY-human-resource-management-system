import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DeleteMember from './pages/DeleteMember'
import SearchMember from './pages/SearchMember'
import Index from './pages/Index'
import Points from './pages/Points-overview'
import TrackDev from './pages/Track-dev'
import VehicleStatus from './pages/Vehicle-status'
import AddVehicle from './pages/Add-vehicle'
import SearchCar from './pages/Search-car'
import Training from './pages/Training-schedule'
import Addmember from './pages/Add-member'
import UpdateMember from './pages/UpdateMember'
import NavbarSidebar from './pages/navbar'

function App() {
  return (
    <NavbarSidebar>
      <Routes>
        <Route path='/AWY-human-resource-management-system/' element={<Index />} />
        <Route path='/home' element={<Index />} />
        <Route path='/add-member' element={<Addmember />} />
        <Route path='/updatemember' element={<UpdateMember />} />
        <Route path='/searchmember' element={<SearchMember />} />
        <Route path='/deletemember' element={<DeleteMember />} /> 
        <Route path='/track-dev' element={<TrackDev />} />
        <Route path='/training-Schedule' element={<Training />} />
        <Route path='/points-overview' element={<Points />} />
        <Route path='/vehicle-status' element={<VehicleStatus />} />
        <Route path='/add-vehicle' element={<AddVehicle />} />
        <Route path='/search-car' element={<SearchCar />} />
      </Routes>
    </NavbarSidebar>
  )
}

export default App
