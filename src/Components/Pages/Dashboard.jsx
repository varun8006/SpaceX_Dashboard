import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import LaunchDetails from "./LaunchDetails";

const Dashboard = () => {
  const [launchData, setLaunchData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const [selectedLaunch, setSelectedLaunch] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(`https://api.spacexdata.com/v3/launches?limit=200&page=${page}`);
      const data = await response.json();
      setLaunchData((prevLaunches) => [...prevLaunches, ...data]);
      setLoading(false);
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    observer.current = new IntersectionObserver(handleObserver, options);

    if (observer.current) {
      observer.current.observe(document.querySelector(".end-of-list"));
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const handleCardClick = (launch) => {
    setSelectedLaunch(launch);
    navigate(`/LaunchDetails/${launch.flight_number}`);
  };

  return (
    <>
      <div className="container mx-auto mt-[90px]">
        <h1 className="text-xl font-bold mb-2">All Launches</h1>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 text-[16px] mt-2 cursor-pointer ">
          {launchData.map((launch) => (
            <div key={launch.flight_id} className="bg-sky-50 p-4 rounded-lg shadow-md hover:bg-[#2D2D67] hover:text-white transition duration-500 ease-in-out transform" onClick={() => handleCardClick(launch)}>
              <h3 className="flex items-center font-bold gap-2 justify-between text-[#ff7676]">
                <span className="text-[16px]">Mission Name - </span>
                <span className="text-[14px] ">{launch.mission_name}</span>
              </h3>
              <h3 className="flex items-center mt-2 gap-2 justify-between">
                <div className="flex items-center">
                  <span className="">Launch Date - </span>
                  <span className="font-bold">{new Date(launch.launch_date_local).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <span className="">Flight No - </span>
                  <span className="font-bold">{launch.flight_number}</span>
                </div>
              </h3>
              <div className="flex justify-between items-center gap-1 mt-3">
                {launch.details && (
                  <p className="">
                    Details- {launch.details.length > 100 ? `${launch.details.slice(0, 100)} ...` : launch.details}
                  </p>
                )}
                <img src={launch.links.mission_patch_small} alt={launch.mission_name} className="w-16" />
              </div>
            </div>
          ))}
          {loading && (
            <div className="fixed top-10 left-[620px] bottom-0 flex justify-center items-center text-3xl animate-pulse">
            🚀 
            </div>
          )}
          <div className="end-of-list" style={{ visibility: loading ? "visible" : "hidden" }}></div>
        </div>
        {selectedLaunch && <LaunchDetails launch={selectedLaunch} onClose={() => setSelectedLaunch(null)} />}
      </div>
    </>
  );
};

export default Dashboard;
