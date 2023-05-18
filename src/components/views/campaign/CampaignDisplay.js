import { useState, useEffect } from "react";
import "../../../App.css";
import Players from "./Players";
import EncounterList from "./EncounterList";
import EncounterNotes from "./EncounterNotes";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const CampaignDisplay = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const { auth } = useAuth();
  const campaignId = Number(location.pathname.slice(9));

  const [textState, setTextState] = useState(true);
  const [campaignText, setCampaignText] = useState("");
  const [encounterText, setEncounterText] = useState("");
  const [name, setName] = useState("");
  const [campaign, setCampaign] = useState(null);
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
        setCampaign(response.data);
        setCampaignText(response.data.notes);
        console.log(response.data);
      } catch (err) {
        console.error(err);
        navigate("/profile", { replace: true });
      }
    };
    getCampaignById();
    console.log(campaign);
  }, [campaignSwitch]);

  return (
    <>
      <Players />
      <EncounterList
        campaign={campaign}
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
        <EncounterNotes
          campaignText={campaignText}
          setCampaignText={setCampaignText}
          encounterText={encounterText}
          setEncounterText={setEncounterText}
          setEncounterList={setEncounterList}
          setCampaignSwitch={setCampaignSwitch}
          campaign={campaign}
          textState={textState}
          setTextState={setTextState}
          name={name}
          encounterFocus={encounterFocus}
          setEncounterSwitch={setEncounterSwitch}
          encounterSwitch={encounterSwitch}
        />
      </div>
    </>
  );
};

export default CampaignDisplay;
