import { Route, Routes } from 'react-router-dom';




import React from "react";
import Navigation from './Pages/Navigation';
import Dashboard from './Pages/Dashboard';
import Safety from './Pages/Safety';
import Power from './Pages/Power';
import Status from './Pages/Status';
import Communications from './Pages/Communications';
import LaunchDetails from './Pages/LaunchDetails';
import Head from './Head';



const Main = () => {
  return (
    <>
       <div >
        <Head/>
       </div>
      <div className='w-full px-2 flex-1 h-screen overflow-y-auto'>
        <Routes >
          <Route path="/" element={<Dashboard />} />
          <Route path="/Status" element={<Status />} />
          <Route path="/Navigation" element={<Navigation />} />
          <Route path="/Power" element={<Power />} />
          <Route path="/Communications" element={<Communications />} />
          <Route path="/Safety" element={<Safety />} />
          <Route path="/LaunchDetails/:launchId" element={<LaunchDetails/>} />

        </Routes>

      </div>
    </>
  )
};

export default Main;
