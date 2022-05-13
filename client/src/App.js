import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import SideBar from "./components/SideBar/SideBar";
import MainPage from "./pages/MainPage";
import InventoryPage from "./pages/InventoryPage";
import SoldPage from "./pages/SoldPage";
import UserPage from "./pages/UserPage";
import StatsPage from "./pages/StatsPage";
import MobileSideBar from "./components/SideBar/MobileSideBar";

export default function App() {
  return (
    <Router>
      <section className="flex w-screen h-screen items-center justify-center bg-slate-400">
        <section className="flex flex-row md:h-5/6 h-full xl:w-1280 md:w-11/12 w-full bg-slate-400">
          <SideBar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/sold" element={<SoldPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </section>
      </section>
      <MobileSideBar />
    </Router>
  );
}
