import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router';

import './App.css';
// import HomePage from './Pages-old/Home/HomePage';
// import AboutUs from './Pages-old/About/AboutUs';

import Home from './Pages/Home';
import OurStory from './Pages/OurStory';
import HowItWorks from './Pages/HowItWorks';
import OurTeam from './Pages/OurTeam';
import Navbar from './Components/Navbar/Navbar';

import FindMedicationPage from './Pages-old/FindMedication/FindMedicationPage';
import LoginPage from './Pages-old/Login/LoginPage';
import DashboardPage from './Pages-old/Dashboard/DashboardPage';
import Pharmacies from './Pages-old/Pharmacies/Pharmacies';
import ContactUs from './Pages-old/Contact/ContactUs'
import Page404 from './Pages-old/404/Page404';
// import MonitorPage from './Pages/Monitoring/MonitorPage';
import PharmacistTable from './Components/PharmacistTable/PharmacistTable';

import Footer from './Components/Footer/Footer';

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/auth-sessions/authenticated", { credentials: 'include' })
    .then(r => {
      if (r.ok) {
        r.json().then(res => {
            if (res.success) {
                setUser(res.success)
            } else {
              setUser(null)
            }
        })
      }
    })
  }, [])
  
  return (
    <>
      {/* <Navbar user={user} setUser={setUser}/> */}
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/our-story' element={<OurStory/>}/>
        <Route path='/how-it-works' element={<HowItWorks/>}/>
        <Route path='/our-team' element={<OurTeam/>}/>
        <Route path="/find-medication" element={<FindMedicationPage />} />
        <Route path="/contact" element={<ContactUs />} />
        {/* <Route path="/pharmacies-network" element={<Pharmacies />} /> */}
        {/* <Route path="/about" element={<AboutUs />} /> */}
        <Route path="/login" element={<LoginPage setUser={setUser}/>} />
        <Route path="/dashboard" element={<DashboardPage user={user}/>} />
        <Route path="/dashboard/pharmacies/:id" element={<PharmacistTable />} />
        <Route path="*" element={<Page404 />} />
        {/* <Route path="/monitoring" element={<MonitorPage />} /> */}
      </Routes>
      {/* <Footer/> */}
    </>
  )
}

export default App;
