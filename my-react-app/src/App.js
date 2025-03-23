import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



// Components
import Header from "./components/Header";
// import Footer from "./components/Footer";




// Pages
import Home from "./pages/Home";
import Event from "./pages/Event";
import About from "./pages/About"
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Event" element={<Event />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
