import axios from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import "../campaign/player.css";

import { useState, useEffect } from "react";

const HomePlayer = (props) => {
  const { player, setPlayer, combatSwitch } = props;

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
    setDisableCreate(true);
  };

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
    setPlayer([...player, playerObject]);
    resetInputs();
  };

  const check = (item) => {
    const answer = window.confirm(
      `Are you sure you want to delete ${item.name}`
    );
    return answer;
  };

  const deletePlayerObject = async (item, index) => {
    console.log(index);
    const answer = check(item);
    if (answer) {
      player.splice(index, 1);
      console.log(player);
      setPlayer([...player]);
    }
  };

  return (
    <div className='CombatPlayer'>
      {player?.map((item) => {
        return (
          <div className='pc'>
            <div className='top'>
              <h2 className='pcName'>
                Name: <span id='pcName'>{item.name}</span>
              </h2>
              <h2 className='pcHp'>
                HP: <span className='hp'>{item.maxHp}</span>
              </h2>
            </div>

            <div className='mid'>
              <div className='levelDiv'>
                <h1 className='level'>Level {item.level}:</h1>
                <h2 className='pcClass'>{item.playerClass} </h2>
              </div>
              <div className='levelDiv'>
                <h1 className='level'>Race:</h1>
                <h2 className='pcClass'>{item.race}</h2>
              </div>
            </div>

            <div className='stats'>
              <p className='pcSave'>Saving Throws</p>
              <span className='statsNum'>
                DEX: <br />
                {item.dex > 0 && <span>+</span>}
                {item.dex}
              </span>
              <span className='statsNum'>
                INT: <br />
                {item.int > 0 && <span>+</span>}
                {item.int}
              </span>
              <span className='statsNum'>
                CHA: <br />
                {item.cha > 0 && <span>+</span>}
                {item.cha}
              </span>
              <span className='statsNum'>
                STR: <br />
                {item.str > 0 && <span>+</span>}
                {item.str}
              </span>
              <span className='statsNum'>
                CON: <br />
                {item.con > 0 && <span>+</span>}
                {item.con}
              </span>
              <span className='statsNum'>
                WIS: <br />
                {item.wis > 0 && <span>+</span>}
                {item.wis}
              </span>
            </div>
            <button
              className='PlayerDelete'
              onClick={() => {
                deletePlayerObject(item);
              }}
            >
              Delete Player
            </button>
          </div>
        );
      })}
      {!combatSwitch && (
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
                <ul className='raceList'>
                  <li
                    className='races'
                    onClick={() => setViewClass(true)}
                    disabled={disableButonClass}
                  >
                    {playerClass}
                  </li>
                  {viewClass &&
                    classList.map((classObj) => {
                      return (
                        <li
                          className='races'
                          onClick={() => {
                            setPlayerClass(classObj.name);
                            setViewClass(false);
                          }}
                        >
                          {classObj.name}
                        </li>
                      );
                    })}
                </ul>
              }
            </h2>
            <h2 className='pcClass'>
              Race:{" "}
              <ul className='raceList'>
                <ui
                  className='races'
                  onClick={() => setViewRace(true)}
                  disabled={disableButonRace}
                >
                  {race}
                </ui>
                {viewRace &&
                  raceList.map((raceObj) => {
                    return (
                      <li
                        className='races'
                        onClick={() => {
                          setRace(raceObj.name);
                          setViewRace(false);
                        }}
                      >
                        {raceObj.name}
                      </li>
                    );
                  })}
              </ul>
            </h2>
            <h2 className='Level'>
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
      )}
    </div>
  );
};

export default HomePlayer;