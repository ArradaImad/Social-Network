
import React from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

function App() {

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative">
      <Header/>
      <Outlet />
      <div className="grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" 
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
      </div>
    </div>
  );
}

export default App;
