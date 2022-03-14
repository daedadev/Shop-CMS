import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import SideBar from "./components/SideBar";
import MainPage from "./pages/MainPage";
import InventoryPage from "./pages/InventoryPage";

export default function App() {
  return (
    <Router>
      <section className="flex  w-screen h-screen items-center justify-center bg-slate-300">
        <section className="flex flex-row h-5/6 xl:w-1280 w-11/12 bg-slate-300">
          <SideBar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
          </Routes>
        </section>
      </section>
    </Router>
  );
}
