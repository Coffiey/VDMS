import { useEffect } from "react";
import CombatPlayers from "./prep/CombatPlayer";
import { Outlet } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

const EncounterPlayerDisplay = () => {
  const { campaign, encounter } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/profile/${campaign}/${encounter}/prep`);
  }, []);

  return (
    <>
      <CombatPlayers />
      <Outlet />
    </>
  );
};

export default EncounterPlayerDisplay;
