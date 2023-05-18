import axios from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import ClassDrop from "./CharacterDropDowns/ClassDrop";
import RaceDrop from "./CharacterDropDowns/RaceDrop";
import "./player.css";

import { useState, useEffect } from "react";

const Players = () => {
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

  const location = useLocation();

  const { auth } = useAuth();
  const params = useParams();
  const campaignId = params.campaign;

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
    setName(undefined);
    setPlayerClass("choose");
    setRace("choose");
    setLevel(undefined);
    setMaxHp(undefined);
    setDex(undefined);
    setWis(undefined);
    setCon(undefined);
    setInt(undefined);
    setStr(undefined);
    setCha(undefined);
  };

  useEffect(() => {
    {
      let isMounted = true;
      const getPlayers = async () => {
        try {
          const response = await axiosPrivate.get(
            `/db/${auth.id}/${campaignId}/pc`
          );
          isMounted && setPlayer(response.data);
        } catch (err) {
          console.log(err);
        }
      };
      getPlayers();
      return () => {
        isMounted = false;
        resetInputs();
      };
    }
  }, [playerSwitch]);

  const postPlayerObject = async () => {
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
      const response = await axiosPrivate.post(
        `/db/${auth.id}/${campaignId}/pc`,
        playerObject
      );
      setPlayerSwitch(!playerSwitch);
    } catch (err) {
      console.error(err);
    }
  };

  const check = (item) => {
    const answer = window.confirm(
      `Are you sure you want to delete ${item.name}`
    );
    return answer;
  };

  const deletePlayerObject = async (item) => {
    const answer = check(item);
    if (answer) {
      try {
        await axiosPrivate.delete(
          `/db/${auth.id}/${campaignId}/pc?id=${item.id}`
        );
        setPlayerSwitch(!playerSwitch);
      } catch (err) {
        console.error(err);
      }
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
            <button
              onClick={() => {
                console.log(item);
                deletePlayerObject(item);
              }}
            >
              Delete Player
            </button>
          </div>
        );
      })}
      <div className='pc'>
        <div className='top'>
          <h2 className='pcName'>
            Name:{" "}
            <input
              className='txt'
              type='text'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </h2>
          <h2 className='pcHp'>
            hp:{" "}
            <input
              value={maxHp}
              type='number'
              className='statinput'
              onChange={(e) => {
                setMaxHp(e.target.value);
              }}
            ></input>
          </h2>
        </div>
        <div className='mid'>
          <h2 className='pcClass'>
            Class:{" "}
            {
              <button
                onClick={() => setViewClass(true)}
                disabled={disableButonClass}
              >
                {playerClass}
              </button>
            }
          </h2>
          {viewClass && (
            <ClassDrop
              classList={classList}
              setPlayerClass={setPlayerClass}
              setViewClass={setViewClass}
            />
          )}

          <h2 className='pcRace'>
            Race:{" "}
            <button
              onClick={() => setViewRace(true)}
              disabled={disableButonRace}
            >
              {race}
            </button>
          </h2>
          {viewRace && (
            <RaceDrop
              raceList={raceList}
              setRace={setRace}
              setViewRace={setViewRace}
            />
          )}
          <h2 className='pcRace'>
            Level:{" "}
            <input
              value={level}
              className='statinput'
              type='number'
              onChange={(e) => {
                setLevel(e.target.value);
              }}
            ></input>
          </h2>
        </div>

        <h2 className='pcSave'>Saving throws</h2>
        <div className='statCreate'>
          <p className='inputP'>
            DEX:{" "}
            <input
              value={dex}
              className='statinput'
              type='number'
              onChange={(e) => {
                setDex(e.target.value);
              }}
            ></input>
          </p>
          <p className='inputP'>
            WIS:{" "}
            <input
              value={wis}
              className='statinput'
              type='number'
              onChange={(e) => {
                setWis(e.target.value);
              }}
            ></input>
          </p>
          <p className='inputP'>
            CON:{" "}
            <input
              value={con}
              className='statinput'
              type='number'
              onChange={(e) => {
                setCon(e.target.value);
              }}
            ></input>
          </p>
          <p className='inputP'>
            INT:{" "}
            <input
              value={int}
              className='statinput'
              type='number'
              onChange={(e) => {
                setInt(e.target.value);
              }}
            ></input>
          </p>
          <p className='inputP'>
            STR:{" "}
            <input
              value={str}
              className='statinput'
              type='number'
              onChange={(e) => {
                setStr(e.target.value);
              }}
            ></input>
          </p>
          <p className='inputP'>
            CHA:{" "}
            <input
              value={cha}
              className='statinput'
              type='number'
              onChange={(e) => {
                setCha(e.target.value);
              }}
            ></input>
          </p>
        </div>
        <button
          className='createPlayer'
          disabled={disableCreate}
          onClick={postPlayerObject}
        >
          Create Player
        </button>
      </div>
    </div>
  );
};

export default Players;
