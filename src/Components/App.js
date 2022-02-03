
import React from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";


function App() {
  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full bg-slate-800 h-16 flex items-center">
        <div className="container mx-auto space-x-8 text-white ">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>
      <Outlet />
      <div>
      <div className="mt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
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
    </div>
  );
}

export default App;
