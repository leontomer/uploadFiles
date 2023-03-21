import React from "react";
import Navbar from "./components/Navbar/Navbar";
import GetFile from "./components/GetFile/GetFile";
import UploadFile from "./components/Upload/UploadFile";
import Home from "./components/Home/Home";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app background">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/UploadFile" element={<UploadFile />} />
          <Route path="/GetFile" element={<GetFile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
