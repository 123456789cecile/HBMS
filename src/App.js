import React from "react";
import { Routes, Route} from "react-router-dom";

import Homepage from "./HomeFiles/Homepages";
import About from "./HomeFiles/About";
import AdminLogin from "./HomeFiles/AdminLogin";
import UserRegistration from "./HomeFiles/UserRegistration";
import UserLogin from "./HomeFiles/UserLogin";
import UserDashboard from "./HomeFiles/UserDashboard";
import AdminDashboard from "./HomeFiles/AdminDashboard";
import DoctorDashboard from "./HomeFiles/DoctorDashboard";
import DoctorLogin from "./HomeFiles/DoctorLogin";
import AddDoctor from "./HomeFiles/AddDoctor";
import { LanguageProvider } from "./LanguageContext";
import LanguageSelector from "./LanguageSelector";
import HospitalLocations from "./HomeFiles/HospitalLocations";
import AIChat from "./HomeFiles/AIChat";
import ThemeToggle from "./HomeFiles/themetoggle";

import "./App.css";

export default function App() {
  return (
    <LanguageProvider>
      <div>
        <h1>HMS</h1>
        <LanguageSelector />

        
<ThemeToggle />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/About" element={<About />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/UserLogin" element={<UserLogin />} />
          <Route path="/UserDashboard" element={<UserDashboard />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/DoctorDashboard" element={<DoctorDashboard />} />
          <Route path="/UserRegistration" element={<UserRegistration />} />
          <Route path="/DoctorLogin" element={<DoctorLogin />} />
          <Route path="/AddDoctor" element={<AddDoctor />} />
          <Route path="/HospitalLocations" element={<HospitalLocations />}/>
          <Route path="/AIChat" element={<AIChat />} />
          <Route path="/ThemeToggle" element={<ThemeToggle/>}/>
          
        </Routes>
      </div>
    </LanguageProvider>
    
  );
}