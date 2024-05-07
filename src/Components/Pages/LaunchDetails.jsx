import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineClose } from "react-icons/md";

const LaunchDetails = () => {
 const [launch, setLaunch] = useState(null);
 const navigate = useNavigate();
 const { launchId } = useParams();

 useEffect(() => {
  const fetchLaunchDetails = async () => {
   const response = await fetch(`https://api.spacexdata.com/v3/launches/${launchId}`);
   const data = await response.json();
   setLaunch(data);
  };

  fetchLaunchDetails();
 }, [launchId]);

 const handleClose = () => {
  navigate('/');
 };

 if (!launch) {
  return <div className="min-h-screen flex justify-center items-center ">Loading...</div>;
 }

 const { mission_name, launch_date_local, flight_number, details, links, launch_year, launch_date_unix } = launch;

 return (
  <div className="container mx-auto mt-16 bg-sky-50 p-2 rounded-lg shadow-md ">

    <MdOutlineClose className=" cursor-pointer float-end text-red-600 hover:text-gray-800" size={35} onClick={handleClose} />

    <div className="flex flex-col justify-start  w-full text-[16px] space-between">

        <div className="flex items-center flex-col ">
            <img src={links.mission_patch_small} alt={mission_name} className=" my-4 w-24" />
            <h2 className="text-xl font-bold mb-3">{mission_name}</h2>
        </div>

        <div className="flex flex-col">
            <p><span className="font-bold">Launch Date:</span>{new Date(launch_date_local).toLocaleDateString()}</p>
            <p><span className="font-bold">Flight Number:</span> {flight_number}</p>
            <p><span className="font-bold">Launch Year:</span> {launch_year}</p>
            <p><span className="font-bold">Launch Date Unix:</span> {launch_date_unix}</p>
            {details && <p><span className="font-bold">Details:</span> {details}</p>}
        </div>

    </div>

</div>

 );
};

LaunchDetails.propTypes = {
 launchId: PropTypes.string.isRequired
};

export default LaunchDetails;
