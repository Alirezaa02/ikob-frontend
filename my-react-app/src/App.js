import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from './App.css';


// Components
// import Header from "./components/Header";
// import Footer from "./components/Footer";



// Pages
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
