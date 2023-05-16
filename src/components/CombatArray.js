import axios from "axios";
import "./css/combatArray.css";
import "./css/enemy.css";

import { useEffect, useState } from "react";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const CombatArray = (props) => {
  const { setmonsterObj, monsterObj } = props;

  const [playerArray, setPlayerArray] = useState([]);
  const [monsterArray, setMonsterArray] = useState([]);
  const [combatArray, SetCombatArray] = useState([]);
  const [sorted, setSorted] = useState(true);
  const [monsterUrl, setMonsterUrl] = useState(null);
  const [round, setRound] = useState(1);
  const [turn, setTurn] = useState(0);

  const [hpChange, setHpchange] = useState(0);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (combatArray[0]?.monsterName) {
      setMonsterUrl(combatArray[0].url);
    } else {
    }
  }, [combatArray]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getPlayers = async () => {
      try {
        const response = await axiosPrivate.get("/db/pc", {
          signal: controller.signal,
        });
        isMounted && setPlayerArray(response.data);
      } catch (err) {
        console.log(err);
      }
      controller.abort();
    };
    getPlayers();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getEnemy = async () => {
      try {
        const response = await axiosPrivate.get("/db/enemy", {
          signal: controller.signal,
        });
        isMounted && setMonsterArray(response.data);
      } catch (err) {
        console.error(err);
        controller.abort();
      }
    };
    getEnemy();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (playerArray.length > 0 && monsterArray.length > 0) {
      const combat = playerArray.concat(monsterArray);
      const combat2 = JSON.parse(JSON.stringify(combat));
      SetCombatArray(combat2);
      setHpchange(
        combatArray.map((x) => {
          return "";
        })
      );
    }
  }, [playerArray, monsterArray]);

  useEffect(() => {
    if (combatArray.length !== 0) {
      setHpchange(
        combatArray.map((x) => {
          return "";
        })
      );
    }
  }, [combatArray]);

  useEffect(() => {
    if (monsterUrl) {
      axios
        .get(`/api/monster/object?url=${monsterUrl}`)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setmonsterObj(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [monsterUrl]);

  useEffect(() => {
    if (turn === combatArray.length && combatArray.length !== 0) {
      setRound(round + 1);
    }
  }, [turn]);

  const handleChange = (event, index) => {
    setHpchange(
      hpChange.map((x, i) => {
        if (i === index) {
          return event.target.value;
        }
      })
    );
  };

  const addIntiative = (event, index) => {
    SetCombatArray(
      combatArray.map((x, i) => {
        if (i === index) {
          x.initative = Number(event.target.value);
          return x;
        } else {
          return x;
        }
      })
    );
  };

  const damageClick = (index) => {
    SetCombatArray(
      combatArray.map((object, i) => {
        if (i === index) {
          if (object.max_hp) {
            if (object.max_hp - Number(hpChange[index]) < 0) {
              object.max_hp = 0;
              return object;
            }
            object.max_hp -= Number(hpChange[index]);
            return object;
          }
          if (object.health) {
            if (object.health - Number(hpChange[index]) < 0) {
              object.health = 0;
              return object;
            }
            object.health -= Number(hpChange[index]);
            return object;
          }
        } else {
          return object;
        }
      })
    );
    setHpchange(
      hpChange.map((x, i) => {
        if (i === index) {
          return "";
        }
      })
    );
  };

  const healClick = (index) => {
    SetCombatArray(
      combatArray.map((object, i) => {
        let [player] = playerArray.filter((x) => x.name === object.name);
        let [monster] = monsterArray.filter(
          (x) => x.monsterReference === object.monsterReference
        );
        console.log(player);
        console.log(monster);
        if (i === index) {
          if (typeof object?.max_hp === "number") {
            if (object.max_hp + Number(hpChange[index]) > player.max_hp) {
              object.max_hp = player.max_hp;
              return object;
            }
            object.max_hp += Number(hpChange[index]);
            return object;
            // }
          }
          if (typeof object?.health === "number") {
            if (object.health + Number(hpChange[index]) > monster.health) {
              object.health = monster.health;
              return object;
            }
            object.health += Number(hpChange[index]);
            return object;
            // }
          }
        } else {
          return object;
        }
      })
    );
    setHpchange(
      hpChange.map((x, i) => {
        if (i === index) {
          return "";
        }
      })
    );
  };

  const nextTurn = () => {
    let obj = combatArray.shift();
    combatArray.push(obj);
    SetCombatArray([...combatArray]);
    if (!sorted) {
      if (turn < combatArray.length) {
        setTurn(turn + 1);
        console.log(turn);
      } else {
        setTurn(1);
      }
    }
  };

  const setIntiative = () => {
    const check = combatArray.every((item) => {
      return typeof item.initative === "number";
    });
    if (check) {
      let combat = combatArray.sort((a, b) => {
        if (a.initative > b.initative) {
          return -1;
        }
        if (a.initative < b.initative) {
          return 1;
        }
        return 0;
      });
      SetCombatArray([...combat]);
      setSorted(false);
      if (combatArray[0].monsterName) {
        console.log("Its a monster");
      } else {
        console.log("its a player");
      }
    }
  };

  const resetIntiative = () => {
    setSorted(true);
  };
  const navigateToGame = () => {
    console.log("click");
    navigate("/game", { replace: true });
  };

  return (
    <div className='Enemy'>
      <div className='combatBanner'>
        {sorted ? (
          <button onClick={setIntiative}>Set Initative</button>
        ) : (
          <p onClick={resetIntiative}>Initative Set</p>
        )}
        <button onClick={nextTurn}>Next Turn</button>
        {sorted ? (
          <p>intiative Order</p>
        ) : (
          <p>
            <strong>Round: {round}</strong>
          </p>
        )}
        <button onClick={navigateToGame}>End Combat</button>
      </div>
      {combatArray.map((object, index) => {
        if (object.name) {
          return (
            <div
              className='playerDiv'
              id={index}
            >
              <div className='enemyTop'>
                {sorted ? (
                  <input
                    placeholder='initative'
                    onChange={(e) => {
                      addIntiative(e, index);
                    }}
                  ></input>
                ) : (
                  <h3>
                    Initative: <br />
                    {object.initative}
                  </h3>
                )}
                <h1 className='enemyName'>{object.name}</h1>
                <p>{object.player_class}</p>
                <p>{object.race}</p>

                {object.max_hp > 0 ? (
                  <h1 className='enemyHp'>
                    HP: <span className='health'>{object.max_hp}</span>
                  </h1>
                ) : (
                  <h1>You Dead</h1>
                )}
              </div>
              <div className='enemyBot'>
                <div className='stats'>
                  <p className='pcSave'>Saving Throws</p>
                  <span className='statsNum'>
                    DEX: <br />+{object.dex}
                  </span>
                  <span className='statsNum'>
                    INT: <br />+{object.int}
                  </span>
                  <span className='statsNum'>
                    CHA: <br />+{object.cha}
                  </span>
                  <span className='statsNum'>
                    STR: <br />+{object.str}
                  </span>
                  <span className='statsNum'>
                    CON: <br />+{object.con}
                  </span>
                  <span className='statsNum'>
                    WIS: <br />+{object.wis}
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      damageClick(index);
                    }}
                  >
                    hit:
                  </button>
                  <button
                    onClick={() => {
                      healClick(index);
                    }}
                  >
                    heal:
                  </button>
                  <input
                    type='Number'
                    name='message'
                    onChange={(e) => {
                      handleChange(e, index);
                    }}
                    value={hpChange[index]}
                  ></input>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div
              className='enemyDiv'
              id={index}
            >
              <div className='enemyTop'>
                {sorted ? (
                  <input
                    placeholder='initative'
                    onChange={(e) => {
                      addIntiative(e, index);
                    }}
                  ></input>
                ) : (
                  <h3>
                    Initative: <br />
                    {object.initative}
                  </h3>
                )}
                <h1>{object.monsterReference}</h1>
                <h6 className='enemyName'>{object.monsterName}</h6>
                {object.health > 0 ? (
                  <h1 className='enemyHp'>
                    HP: <span className='health'>{object.health}</span>
                  </h1>
                ) : (
                  <h1>Dead</h1>
                )}
              </div>
              <div className='enemyBot'>
                <div>
                  <button
                    onClick={() => {
                      damageClick(index);
                    }}
                  >
                    hit:
                  </button>
                  <button
                    onClick={() => {
                      healClick(index);
                    }}
                  >
                    heal:
                  </button>
                  <input
                    type='Number'
                    name='message'
                    onChange={(e) => {
                      handleChange(e, index);
                    }}
                    value={hpChange[index]}
                  ></input>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default CombatArray;
