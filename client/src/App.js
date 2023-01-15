import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router';

import './App.css';
import HomePage from './Pages/Home/HomePage';
import FindMedicationPage from './Pages/FindMedication/FindMedicationPage';
import AboutUs from './Pages/About/AboutUs';
import LoginPage from './Pages/Login/LoginPage';
import DashboardPage from './Pages/Dashboard/DashboardPage';
import Pharmacies from './Pages/Pharmacies/Pharmacies';
import ContactUs from './Pages/Contact/ContactUs'
import Page404 from './Pages/404/Page404';
// import MonitorPage from './Pages/Monitoring/MonitorPage';
import Navbar from './Components/Navbar/Navbar';
import PharmacistTable from './Components/PharmacistTable/PharmacistTable';

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("http://localhost:8000/auth-sessions/authenticated", { credentials: 'include' })
    .then(r => {
      if (r.ok) {
        r.json().then(res => {
            if (res.success) {
                setUser(res.success)
            } else {
              setUser({})
            }
        })
      }
    })
  }, [])
  
  return (
    <>
      <Navbar user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/find-medication" element={<FindMedicationPage />} />
        <Route path="/pharmacies-network" element={<Pharmacies />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<LoginPage setUser={setUser}/>} />
        <Route path="/dashboard" element={<DashboardPage user={user}/>} />
        <Route path="/dashboard/pharmacies/:id" element={<PharmacistTable />} />
        <Route path="*" element={<Page404 />} />
        {/* <Route path="/monitoring" element={<MonitorPage />} /> */}
      </Routes>
    </>
  )
}

export default App;
