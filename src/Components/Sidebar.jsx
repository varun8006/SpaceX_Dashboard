// Importing necessary modules and components
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { GiMissileLauncher } from "react-icons/gi";

import logo from '../project.png';
import { HiStatusOnline } from "react-icons/hi";
import { TbNavigationNorth } from "react-icons/tb";
import { ImPower } from "react-icons/im";
import { GiSatelliteCommunication } from "react-icons/gi";
import { MdOutlineHealthAndSafety } from "react-icons/md";

// SidebarLink component for individual links in the sidebar
const SidebarLink = ({ to, icon, label, isActive }) => (
  <div className={`px-2 py-3 flex items-center hover:bg-[#2D2D68] ${isActive ? "text-white bg-[#2D2D68]" : ""}`}>
    <NavLink to={to} className="flex items-center w-full text-xs">
      <span className="flex items-center">
        {icon }
        <span className="text-xs ml-4">{label}</span>
      </span>
    </NavLink>
    
  </div>
);

// Sidebar component to display the sidebar navigation
const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="h-full bg-[#001F54] text-white">
      {/* Sidebar header */}
      <div className="flex items-center px-2 gap-2 py-2">
        <img src={logo} alt="brand logo" width={50} />
        <span className="font-bold">SpaceX</span>
      </div>
      {/* Sidebar links */}
      <div className="text-gray-400 flex flex-col space-y-1 relative p-2">
        <SidebarLink to="/" icon={<GiMissileLauncher size={25}/>} label="All Launches" isActive={location.pathname === "/"} />
        <SidebarLink to="/Status" icon={<HiStatusOnline size={25}/>} label="Status Overview" isActive={location.pathname === "/Status"} />
        <SidebarLink to="/Navigation" icon={<TbNavigationNorth size={25}/>} label="Navigation" isActive={location.pathname === "/Navigation"} />
        <SidebarLink to="/Power" icon={<ImPower size={25}/>} label="Power" isActive={location.pathname === "/Power"} />
        <SidebarLink to="/Communications" icon={<GiSatelliteCommunication size={25}/>} label="Communications" isActive={location.pathname === "/Communications"} />
        <SidebarLink to="/Safety" icon={<MdOutlineHealthAndSafety size={25}/>} label="Safety and Alerts" isActive={location.pathname === "/Safety"} />
      </div>
    </div>
  );
};

export default Sidebar;
