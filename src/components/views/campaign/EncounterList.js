import "../Encounter/prep/enemy.css";
import "../../../App.css";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";

const EncounterList = (props) => {
  const {
    encounterSwitch,
    setEncounterSwitch,
    setTextState,
    encounterText,
    setEncounterText,
    name,
    setName,
    encounterList,
    setEncounterList,
    encounterFocus,
    campaign,
    setEncounterFocus,
  } = props;
  const { auth } = useAuth();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const id = auth?.id;
  const parameter = useParams();
  const campaignId = parameter.campaign;

  useEffect(() => {
    let isMounted = true;
    const getEncounter = async () => {
      try {
        const response = await axiosPrivate.get(`/db/${id}/${campaignId}`);
        let sorted = await response.data.sort((a, b) => {
          if (a.id > b.id) {
            return -1;
          }
          if (a.id < b.id) {
            return 1;
          }
          return 0;
        });
        setEncounterList(sorted);
      } catch (err) {
        console.error(err);
      }
    };
    getEncounter();
    return () => {
      isMounted = false;
    };
  }, [encounterSwitch]);

  const postEncounter = async () => {
    if (id && name.length > 0) {
      try {
        await axiosPrivate.post(`/db/${id}/${campaignId}`, {
          encounterName: name,
          notes: encounterText,
        });
        setEncounterSwitch(!encounterSwitch);
        setName("");
        setEncounterText("");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const addName = (e) => {
    setName(e.target.value);
  };

  const setNotes = (object) => {
    setEncounterFocus(object);
    setEncounterText(object.notes);
    setTextState(false);
  };

  const check = async () => {
    const answer = window.confirm(
      "Are you sure you want to delete this encounter"
    );
    return answer;
  };

  const deleteEncounter = async (object) => {
    const checked = await check();
    if (checked) {
      try {
        await axiosPrivate.delete(`/db/${id}/${campaignId}?id=${object.id}`);
        setEncounterSwitch(!encounterSwitch);
      } catch (err) {
        console.error(err);
      }
    }
  };
  //to fix
  const navigateToEncounters = (object) => {
    if (object) {
      auth.campaign = { id: object.id, name: object.campaignName };
      navigate(`/profile/${campaignId}/${object.id}`);
    } else {
      if (encounterFocus) {
        auth.campaign = { id: object.id, name: object.campaignName };
        navigate(`/profile/${campaignId}/${encounterFocus.id}`);
      } else {
        window.alert("please select a Campaign");
      }
    }
  };

  return (
    <>
      <div className='Enemy'>
        <div className='combatBanner'>
          <p>
            <strong>Round: 9</strong>
          </p>
          {campaign && <p>{campaign.campaignName}</p>}
          <button onClick={() => navigateToEncounters(false)}>
            Go to encounters
          </button>
        </div>
        <div
          className='enemyDiv'
          onClick={() => {
            setTextState(false);
            setEncounterText("");
            setEncounterFocus(null);
          }}
        >
          {name?.length > 0 ? <h1>{name}</h1> : <h1>Create A Encounter</h1>}
          <p>
            Give it a Name{" "}
            <input
              onChange={addName}
              value={name}
            ></input>
          </p>
          <button onClick={postEncounter}>+</button>
        </div>
        {encounterList &&
          encounterList.map((encounter) => {
            return (
              <div
                className='enemyDiv'
                onClick={() => setNotes(encounter)}
                onDoubleClick={() => navigateToEncounters(encounter)}
              >
                <h1>{encounter.encounterName}</h1>
                <p>Add some Campaign notes on the left</p>
                <p>
                  Delete Campaign:{" "}
                  <button onClick={() => deleteEncounter(encounter)}>
                    Delete
                  </button>
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default EncounterList;
