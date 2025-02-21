import React, { useEffect, useState } from 'react'; // Added useState import
import { Routes, Route, useLocation } from "react-router-dom";
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
import config from './config'; 

function App() {
  const location = useLocation();  // Access current location
  const isLoginPage = location.pathname === '/admin/login';
  const isDashboardPage = location.pathname === '/admin/dashboard';
  const[cars,setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      const response = await fetch(`${config.api.baseURL}${config.api.carsEndpoint}`);
      const data = await response.json();
      if (Array.isArray(data.cars)) {
        setCars(data.cars);
      } else {
        console.error("Cars data is not an array", data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (    
    <div>
      <ScrollToTop/>
      {!isLoginPage && !isDashboardPage && <Header cars={cars} />}   
      <Routes> 
        <Route index element={<Home />} />
        <Route path="signature-routes" element={<SignatureRoutes />} />
        <Route path="vehicle" element={<Vehicle />} />
        <Route path="about" element={<About />} />
        <Route path="for-corporate" element={<ForCorporate />} />        
        <Route path="/admin/login" element={<Login />} />        
        <Route path="/admin/dashboard" element={<Dashboard />} />
   
      </Routes> 
      {!isLoginPage && !isDashboardPage && <Footer cars={cars} />}
    </div>
  );
}

export default App;