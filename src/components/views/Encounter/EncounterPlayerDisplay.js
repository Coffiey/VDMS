import CombatPlayers from "./prep/CombatPlayer";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import "../../../App.css";

const EncounterPlayerDisplay = () => {
  return (
    <>
      <CombatPlayers />
      <div className='Outlet'>
        <Outlet />
      </div>
    </>
  );
};

export default EncounterPlayerDisplay;
