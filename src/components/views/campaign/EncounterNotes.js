import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";

const CombatLists = (props) => {
  const {
    name,
    textState,
    setTextState,
    campaignText,
    setCampaignText,
    encounterText,
    setEncounterText,
    campaign,
    setCampaignSwitch,
    campaignSwitch,
    encounterFocus,
    encounterSwitch,
    setEncounterSwitch,
  } = props;

  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const { auth } = useAuth();
  const userId = auth?.id;
  const campaignId = Number(location.pathname.slice(9));

  const addText = (e) => {
    if (textState) {
      setCampaignText(e.target.value);
    } else {
      setEncounterText(e.target.value);
    }
  };

  const putCampaign = async () => {
    if (userId) {
      try {
        await axiosPrivate.put(`/db/${userId}?id=${campaignId}`, {
          campaignName: campaign.campaignName,
          notes: campaignText,
        });
        setCampaignSwitch(!campaignSwitch);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const putEncounter = async () => {
    if (encounterFocus) {
      try {
        await axiosPrivate.put(
          `/db/${userId}/${campaign.id}?id=${encounterFocus.id}`,
          {
            encounterName: encounterFocus.encounterName,
            notes: encounterText,
          }
        );
        setEncounterSwitch(!encounterSwitch);
      } catch (err) {
        console.error(err);
      }
    }
  };
  //textState treu means its the campaing and false is encounters
  return (
    <>
      <div>
        <button onClick={() => setTextState(true)}>Campaign Notes</button>
        <button onClick={() => setTextState(false)}>Encounter Notes</button>
      </div>
      {}
      {textState ? (
        <>
          <p>Campaign: {campaign?.campaignName}</p>
          <textarea
            onBlur={putCampaign}
            onChange={addText}
            value={campaignText}
          ></textarea>
        </>
      ) : (
        <>
          {encounterFocus?.encounterName ? (
            <p>Encounter: {encounterFocus.encounterName}</p>
          ) : name?.length > 0 ? (
            <p>Encounter: {name}</p>
          ) : (
            <p>Create A Encounter</p>
          )}
          <textarea
            onBlur={putEncounter}
            onChange={addText}
            value={encounterText}
          ></textarea>
        </>
      )}
    </>
  );
};

export default CombatLists;
