import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router';

import './App.css';
import Home from './Pages/Home';
import OurStory from './Pages/OurStory';
import HowItWorks from './Pages/HowItWorks';
import OurTeam from './Pages/OurTeam';
import Navbar from './Components/Navbar/Navbar';
//need to get the metatags in for each of these pages for SEO
import ContactUs from './Pages/ContactUs'
import FindMedication from './Pages/FindMedication';
import Page404 from './Pages/Page404';
import LoginPage from './Pages/Login/LoginPage';
import DashboardPage from './Pages/Dashboard/DashboardPage';
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
      <Navbar user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/our-story' element={<OurStory/>}/>
        <Route path='/how-it-works' element={<HowItWorks/>}/>
        <Route path='/our-team' element={<OurTeam/>}/>
        <Route path="/find-medication" element={<FindMedication />} />
        <Route path="/contact-us" element={<ContactUs />} />
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
