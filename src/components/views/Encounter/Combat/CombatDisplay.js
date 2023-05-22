import { useState, useEffect } from "react";
import "../../../../App.css";
import "../../campaign/player.css";
import useAuth from "../../../hooks/useAuth";
import CombatArray from "./CombatArray";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const CombatDisplay = () => {
  const [monsterObj, setmonsterObj] = useState(null);
  const { campaign, encounter } = useParams();
  const params = useParams();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [textState, setTextState] = useState(true);
  const [campaignText, setCampaignText] = useState("");
  const [encounterText, setEncounterText] = useState("");
  const [campaignObj, setCampaignObj] = useState(null);
  const [campaignSwitch, setCampaignSwitch] = useState(null);
  const [encounterFocus, setEncounterFocus] = useState(null);
  const [encounterSwitch, setEncounterSwitch] = useState(true);

  useEffect(() => {
    const getCampaignById = async () => {
      try {
        const response = await axiosPrivate.get(
          `/db/${auth.id}/campaigns?id=${campaign}`
        );
        setCampaignObj(response.data);
        setCampaignText(response.data.notes);
      } catch (err) {
        console.error(err);
        navigate("/profile", { replace: true });
      }
    };
    getCampaignById();
  }, [campaignSwitch]);

  useEffect(() => {
    let isMounted = true;
    const getEncounterById = async () => {
      try {
        const response = await axiosPrivate.get(
          `/db/${auth.id}/${campaign}/${encounter}`
        );
        setEncounterFocus(response.data);
        setEncounterText(response.data.notes);
      } catch (err) {
        console.error(err);
      }
    };
    getEncounterById();
    return () => {
      isMounted = false;
    };
  }, [encounterSwitch]);

  return (
    <>
      <CombatArray
        setmonsterObj={setmonsterObj}
        monsterObj={monsterObj}
      />
      <div className='DisplayMonster'>
        <div className='notesDiv'>
          <button
            className='notesButton'
            onClick={() => {
              setTextState(true);
              navigate("notes");
            }}
          >
            Campaign Notes
          </button>
          <button
            className='notesButton'
            onClick={() => {
              if (params["*"].includes("combat")) {
                navigate(`/profile/${campaign}/${encounter}/combat`);
              } else {
                navigate(`/profile/${campaign}/${encounter}`);
              }
            }}
          >
            Stat Block
          </button>
          <button
            className='notesButton'
            onClick={() => {
              setTextState(false);
              navigate("notes");
            }}
          >
            Encounter Notes
          </button>
        </div>
        <Outlet
          context={{
            monsterObj,
            textState,
            setTextState,
            campaignText,
            setCampaignText,
            encounterText,
            setEncounterText,
            campaignObj,
            setCampaignSwitch,
            campaignSwitch,
            encounterFocus,
            encounterSwitch,
            setEncounterSwitch,
          }}
        />
      </div>
    </>
  );
};

export default CombatDisplay;
