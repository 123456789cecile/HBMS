import { Routes, Route, Link } from "react-router-dom";
import homepage from './HomeFiles/Homepages';
import about from './HomeFiles/About';
import AdminLogin from './HomeFiles/AdminLogin';
import UserRegistration from './HomeFiles/UserRegistration';

import { Component } from "react";
 export default function Tasks(){
        return ( <div><h1>my class component</h1>
        <nav>
            <Link to="/">HOME</Link> |{""}
            <Link to="/about">about</Link> |{""}
            <Link to="/AdminLogin">AdminLogin</Link> |{""}
            <Link to="/UserRegistration">UserRegistration</Link>
        </nav>
        <Routes>
            <Route path="/" element={HomeFiles}/>
            <Route path="/about" element={about}/>
            <Route path="/homepage" element={homepage}/>
            <Route path="/AdminLogin" element={AdminLogin}/>
            <Route path="/UserRegistration" element={UserRegistration}/>
            </Routes>
            </div>
            )
    }
 