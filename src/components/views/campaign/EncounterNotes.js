import "../../../App.css";
import "./player.css";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useParams, useOutletContext } from "react-router-dom";

const CombatLists = () => {
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
      {/* <button
            id={
              params["*"].includes("notes") && textState
                ? null
                : "campaign-notes"
            }
            className='notesTabs'
            onClick={() => {
              setTextState(true);
              navigate("notes");
            }}
          >
            <img
              className='buttonImg'
              src='/campaign.png'
            />
          </button>
          <button
            id={
              params["*"].includes("notes") && !textState
                ? null
                : "encounter-notes"
            }
            className='notesTabs'
            onClick={() => {
              setTextState(false);
              navigate("notes");
            }}
          >
            <img
              className='buttonImg'
              src='/Encounter.png'
            />
          </button>
          <button
            id={params["*"].includes("notes") ? "stat-block" : null}
            className='notesTabs'
            onClick={() => {
              if (params["*"].includes("combat")) {
                navigate(`/profile/${campaign}/${encounter}/combat`);
              } else {
                navigate(`/profile/${campaign}/${encounter}`);
              }
            }}
          >
            <img
              className='buttonImg'
              src='/Stat-Block.png'
            />
          </button> */}
      {!params["*"].includes("notes") ? (
        <div className='notesDiv'>
          <button
            id={textState ? null : "campaign-notes"}
            className='notesTabs'
            onClick={() => {
              setTextState(true);
            }}
          >
            <img
              className='buttonImg'
              src='/campaign.png'
            />
          </button>
          <button
            id={!textState ? null : "encounter-notes"}
            className='notesTabs'
            onClick={() => {
              setTextState(false);
            }}
          >
            <img
              className='buttonImg'
              src='/Encounter.png'
            />
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
