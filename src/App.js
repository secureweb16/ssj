import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import './assets/css/App.css';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SignatureRoutes from './pages/SignatureRoutes';
import Vehicle from './pages/Vehicle';
import About from './pages/About';
import ForCorporate from './pages/ForCorporate';
import Login from './pages/admin/login';
import Dashboard from './pages/admin/dashboard/Dashboard';


function App() {
  const location = useLocation();  // Access current location

  // Check if the current route is "/admin/login"
  const isLoginPage = location.pathname === '/admin/login';
  const isDashboardPage = location.pathname === '/admin/dashboard';
  return (    
    <div>
      <ScrollToTop/>
      {!isLoginPage && !isDashboardPage && <Header />}   
      <Routes> 
        <Route index element={<Home />} />
        <Route path="signature-routes" element={<SignatureRoutes />} />
        <Route path="vehicle" element={<Vehicle />} />
        <Route path="about" element={<About />} />
        <Route path="for-corporate" element={<ForCorporate />} />        
        <Route path="/admin/login" element={<Login />} />        
        <Route path="/admin/dashboard" element={<Dashboard />} />
   
      </Routes> 
      {!isLoginPage && !isDashboardPage && <Footer />}
    </div>
  );
}

export default App;