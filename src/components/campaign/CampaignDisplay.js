import { useState } from "react";
import "../../App.css";
import CombatPlayers from "../Combat/CombatPlayer";
import CampaignList from "../profile/CampaignList";
import CombatLists from "../profile/CombatsList";

const CampaignDisplay = () => {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [campaignFocus, setCampaignFocus] = useState({});
  const [campaignList, setCampaignList] = useState([]);
  const [campaignSwitch, setCampaignSwitch] = useState(true);
  return (
    <>
      <CombatPlayers />
      <CampaignList
        text={text}
        setText={setText}
        setName={setName}
        name={name}
        setCampaignList={setCampaignList}
        campaignList={campaignList}
        setCampaignFocus={setCampaignFocus}
        setCampaignSwitch={setCampaignSwitch}
        campaignSwitch={campaignSwitch}
      />
      <div className='DisplayMonster'>
        <CombatLists
          text={text}
          setText={setText}
          campaignFocus={campaignFocus}
          setCampaignList={setCampaignList}
          campaignList={campaignList}
          setCampaignSwitch={setCampaignSwitch}
          campaignSwitch={campaignSwitch}
        />
      </div>
    </>
  );
};

export default CampaignDisplay;
