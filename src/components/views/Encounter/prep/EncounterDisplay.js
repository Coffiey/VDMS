import { useState, useEffect } from "react";
import "../../../../App.css";
import "../../campaign/player.css";
import Enemy from "./Enemy";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const EncounterDisplay = () => {
  const [monsterObj, setMonsterObj] = useState(null);
  const [search, setSearch] = useState("");
  const [disableInput, setDisableInput] = useState(true);
  const [list, setList] = useState([]);
  const [dropdown, setDropdown] = useState([]);
  const [seeList, setSeeList] = useState(false);

  const [textState, setTextState] = useState(true);
  const [campaignText, setCampaignText] = useState("");
  const [encounterText, setEncounterText] = useState("");
  const [campaignObj, setCampaignObj] = useState(null);
  const [campaignSwitch, setCampaignSwitch] = useState(null);
  const [encounterFocus, setEncounterFocus] = useState(null);
  const [encounterSwitch, setEncounterSwitch] = useState(true);

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { campaign, encounter } = useParams();
  const params = useParams();

  useEffect(() => {
    axios
      .get(`/api/monster`)
      .then((response) => {
        setList(response.data);
        setDisableInput(false);
      })
      .catch(function (error) {});
  }, []);

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

  useEffect(() => {
    if (search === "") {
      setSeeList(false);
    } else {
      setSeeList(true);
      let monsterSearch = list.filter((object) => {
        return object["name"].toLowerCase().includes(search.toLowerCase());
      });
      setDropdown(monsterSearch);
    }
  }, [search]);

  return (
    <>
      <Enemy
        setSearch={setSearch}
        search={search}
        disableInput={disableInput}
        monsterObj={monsterObj}
        setMonsterObj={setMonsterObj}
        list={list}
        dropdown={dropdown}
        seeList={seeList}
        encounterFocus={encounterFocus}
      />
      <div className='DisplayMonster'>
        <div className='notesDiv'>
          <button
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

export default EncounterDisplay;
