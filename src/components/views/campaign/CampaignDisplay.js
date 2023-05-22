import { useState, useEffect } from "react";
import "../../../App.css";
import Players from "./Players";
import EncounterList from "./EncounterList";
import EncounterNotes from "./EncounterNotes";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const CampaignDisplay = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const { auth } = useAuth();
  const parameter = useParams();
  const campaignId = parameter.campaign;

  const [textState, setTextState] = useState(true);
  const [campaignText, setCampaignText] = useState("");
  const [encounterText, setEncounterText] = useState("");
  const [name, setName] = useState("");
  const [campaignObj, setCampaignObj] = useState(null);
  const [campaignSwitch, setCampaignSwitch] = useState(null);
  const [encounterList, setEncounterList] = useState([]);
  const [encounterSwitch, setEncounterSwitch] = useState(true);
  const [encounterFocus, setEncounterFocus] = useState(null);

  useEffect(() => {
    const getCampaignById = async () => {
      try {
        const response = await axiosPrivate.get(
          `/db/${auth.id}/campaigns?id=${campaignId}`
        );
        setCampaignObj(response.data);
        setCampaignText(response.data.notes);
        console.log(response.data);
      } catch (err) {
        console.error(err);
        navigate("/profile", { replace: true });
      }
    };
    getCampaignById();
    console.log(campaignObj);
  }, [campaignSwitch]);

  return (
    <>
      <Players />
      <div className='Outlet'>
        <EncounterList
          campaignObj={campaignObj}
          name={name}
          setName={setName}
          encounterList={encounterList}
          setEncounterList={setEncounterList}
          encounterText={encounterText}
          textState={textState}
          setTextState={setTextState}
          setEncounterSwitch={setEncounterSwitch}
          encounterSwitch={encounterSwitch}
          setEncounterText={setEncounterText}
          setEncounterFocus={setEncounterFocus}
          encounterFocus={encounterFocus}
        />
        <div className='DisplayMonster'>
          <Outlet
            context={{
              name,
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
      </div>
    </>
  );
};

export default CampaignDisplay;
