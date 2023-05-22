import "../../../App.css";
import "./player.css";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useParams, useOutletContext } from "react-router-dom";

const CombatLists = (props) => {
  const {
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
    name,
  } = useOutletContext();

  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const { auth } = useAuth();
  const userId = auth?.id;
  const params = useParams();

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
        await axiosPrivate.put(`/db/${userId}?id=${params.campaign}`, {
          campaignName: campaignObj.campaignName,
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
          `/db/${userId}/${campaignObj.id}?id=${encounterFocus.id}`,
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
  //textState true means its the campaing and false is encounters
  return (
    <div className='textDiv'>
      {!params["*"].includes("notes") ? (
        <div className='notesDiv'>
          <button
            className='notesButton'
            onClick={() => setTextState(true)}
          >
            Campaign Notes
          </button>
          {textState ? (
            <p className='textTitle'>
              Campaign: <strong>{campaignObj?.campaignName}</strong>
            </p>
          ) : encounterFocus ? (
            <p className='textTitle'>
              Encounter: <strong>{encounterFocus?.encounterName}</strong>
            </p>
          ) : (
            <p className='textTitle'>
              Encounter: <strong>{name}</strong>
            </p>
          )}
          <button
            className='notesButton'
            onClick={() => setTextState(false)}
          >
            Encounter Notes
          </button>
        </div>
      ) : (
        <>
          {textState ? (
            <p className='textTitle'>
              Campaign: <strong>{campaignObj?.campaignName}</strong>
            </p>
          ) : (
            <p className='textTitle'>
              Encounter: <strong>{encounterFocus?.encounterName}</strong>
            </p>
          )}
        </>
      )}
      {textState ? (
        <>
          <textarea
            className='textInfo'
            onBlur={putCampaign}
            onChange={addText}
            value={campaignText}
          ></textarea>
        </>
      ) : (
        <>
          <textarea
            className='textInfo'
            onBlur={putEncounter}
            onChange={addText}
            value={encounterText}
          ></textarea>
        </>
      )}
    </div>
  );
};

export default CombatLists;
