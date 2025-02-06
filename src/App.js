import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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





function App() {
  return (    
    <BrowserRouter>
      <ScrollToTop/>
      <Header />      
      <Routes> 
        <Route index element={<Home />} />
        <Route path="signature-routes" element={<SignatureRoutes />} />
        <Route path="vehicle" element={<Vehicle />} />
        <Route path="about" element={<About />} />
        <Route path="for-corporate" element={<ForCorporate />} />        
      </Routes> 
      <Footer />
    </BrowserRouter>
  );
}

export default App;