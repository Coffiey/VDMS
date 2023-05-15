import axios from "axios";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

import ClassDrop from "./CharacterDropDowns/ClassDrop";
import RaceDrop from "./CharacterDropDowns/RaceDrop";
import "./css/player.css";
import "../App.css";

import { useState, useEffect } from "react";

const CombatPlayers = (props) => {
  const { display, combatState } = props;

  const [name, setName] = useState(undefined);
  const [playerClass, setPlayerClass] = useState("choose");
  const [race, setRace] = useState("choose");
  const [level, setLevel] = useState(undefined);
  const [maxHp, setMaxHp] = useState(undefined);
  const [dex, setDex] = useState(undefined);
  const [wis, setWis] = useState(undefined);
  const [con, setCon] = useState(undefined);
  const [int, setInt] = useState(undefined);
  const [str, setStr] = useState(undefined);
  const [cha, setCha] = useState(undefined);
  const [disableCreate, setDisableCreate] = useState(true);

  const [viewClass, setViewClass] = useState(false);
  const [viewRace, setViewRace] = useState(false);
  const [disableButonClass, setDisableButonClass] = useState(true);
  const [disableButonRace, setDisableButonRace] = useState(true);

  const [classList, setClassList] = useState(null);
  const [raceList, setRaceList] = useState(null);

  const [player, setPlayer] = useState([]);
  const [playerSwitch, setPlayerSwitch] = useState(true);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get("/api/classes")
      .then((response) => {
        setClassList(response.data);
        setDisableButonClass(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/races")
      .then((response) => {
        setRaceList(response.data);
        setDisableButonRace(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (
      name &&
      playerClass !== "please Select" &&
      race !== "please Select" &&
      level &&
      maxHp &&
      dex &&
      int &&
      cha &&
      str &&
      con &&
      wis
    ) {
      setDisableCreate(false);
    }
  }, [name, playerClass, race, level, maxHp, dex, int, cha, str, con, wis]);

  const resetInputs = () => {
    setName("");
    setPlayerClass("choose");
    setRace("choose");
    setLevel("");
    setMaxHp("");
    setDex("");
    setWis("");
    setCon("");
    setInt("");
    setStr("");
    setCha("");
  };

  //get request
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getPlayers = async () => {
      try {
        const response = await axiosPrivate.get("/db/pc", {
          signal: controller.signal,
        });
        isMounted && setPlayer(response.data);
      } catch (err) {
        navigate("/login", { state: { from: location }, replace: true });
      }
      controller.abort();
    };
    getPlayers();
    return () => {
      isMounted = false;
      resetInputs();
    };
  }, [playerSwitch]);

  //post request
  const postPlayerObject = async () => {
    const controller = new AbortController();
    const playerObject = {
      name,
      playerClass,
      race,
      level: Number(level),
      maxHp: Number(maxHp),
      dex: Number(dex),
      int: Number(int),
      cha: Number(cha),
      str: Number(str),
      con: Number(con),
      wis: Number(wis),
    };

    try {
      await axiosPrivate.post(`/db/pc`, playerObject, {
        signal: controller.signal,
      });
      setPlayerSwitch(!playerSwitch);
    } catch (err) {
      console.error(err);
      controller.abort();
    }
  };

  return (
    <div className='Player'>
      {player.map((item) => {
        return (
          <div className='pc'>
            <div className='top'>
              <h2 className='pcName'>{item.name}</h2>
              <h2 className='pcHp'>
                HP: <span className='hp'>{item.max_hp}</span>
              </h2>
            </div>

            <div className='mid'>
              <div className='levelDiv'>
                <h1 className='level'>Level {item.level}:</h1>
                <h2 className='pcClass'>{item.player_class} </h2>
              </div>
              <h2 className='pcRace'>{item.race}</h2>
            </div>

            <div className='stats'>
              <p className='pcSave'>Saving Throws</p>
              <span className='statsNum'>
                DEX: <br />+{item.dex}
              </span>
              <span className='statsNum'>
                INT: <br />+{item.int}
              </span>
              <span className='statsNum'>
                CHA: <br />+{item.cha}
              </span>
              <span className='statsNum'>
                STR: <br />+{item.str}
              </span>
              <span className='statsNum'>
                CON: <br />+{item.con}
              </span>
              <span className='statsNum'>
                WIS: <br />+{item.wis}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CombatPlayers;
