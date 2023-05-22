import { useState, useEffect } from "react";
import "../../../App.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import MockPlayers from "./MockPlayers";
import CampaignList from "./CampaignList";
import CombatLists from "./CombatsList";

const ProfileDisplay = () => {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [campaignFocus, setCampaignFocus] = useState(null);
  const [campaignList, setCampaignList] = useState([]);
  const [campaignSwitch, setCampaignSwitch] = useState(true);
  const [player, setPlayer] = useState([]);

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  useEffect(() => {
    if (campaignFocus) {
      let isMounted = true;
      const getPlayers = async () => {
        try {
          const response = await axiosPrivate.get(
            `/db/${auth.id}/${campaignFocus.id}/pc`
          );
          isMounted && setPlayer(response.data);
        } catch (err) {
          console.log(err);
        }
      };
      getPlayers();
      return () => {
        isMounted = false;
      };
    } else {
      setPlayer([]);
    }
  }, [campaignFocus]);

  return (
    <>
      <MockPlayers player={player} />
      <div className='Outlet'>
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
          campaignFocus={campaignFocus}
        />
        <div className='DisplayMonster'>
          <CombatLists
            name={name}
            text={text}
            setText={setText}
            campaignFocus={campaignFocus}
            setCampaignList={setCampaignList}
            campaignList={campaignList}
            setCampaignSwitch={setCampaignSwitch}
            campaignSwitch={campaignSwitch}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileDisplay;
