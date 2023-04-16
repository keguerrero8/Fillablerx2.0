import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router';

import './App.css';
import Banner from './Components/Banner/Banner'
import Home from './Pages/Home';
import HowItWorks from './Pages/HowItWorks';
import Navbar from './Components/Navbar/Navbar';
import ContactUs from './Pages/ContactUs'
import FindMedication from './Pages/FindMedication';
import Page404 from './Pages/Page404';
import LoginPage from './Pages/Login/LoginPage';
import DashboardPage from './Pages/DashboardPage';
import PharmacistTable from './Components/PharmacistTable/PharmacistTable';
import PharmacyEnrollment from './Components/PharmacyEnrollmentForm/PharmacyEnrollment';
import SplashPage from './Pages/SplashPage';
import Footer from './Components/Footer/Footer';

import Privacy from './Components/Documents/PrivacyPolicy/Privacy';
import Terms from './Components/Documents/TermsOfUse/Terms';

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
      <Banner/>
      <Navbar user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/how-it-works' element={<HowItWorks />}/>
        <Route path="/find-medication" element={<FindMedication user={user}/>} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<LoginPage setUser={setUser}/>} />
        <Route path="/dashboard" element={<DashboardPage user={user}/>} />
        <Route path="/dashboard/pharmacies/:id" element={<PharmacistTable />} />
        <Route path="/dashboard/pharmacies/enrollment/:id" element={<PharmacyEnrollment />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms-of-use" element={<Terms />} />
        <Route path="/pharmacy-enrolled" element={<SplashPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App;
