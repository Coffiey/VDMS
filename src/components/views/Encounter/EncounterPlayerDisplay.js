import CombatPlayers from "./prep/CombatPlayer";
import { Outlet } from "react-router-dom";
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
