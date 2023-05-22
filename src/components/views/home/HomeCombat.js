import axios from "axios";
import "../Encounter/Combat/combatArray.css";
import "../Encounter/prep/enemy.css";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const HomeCombat = (props) => {
  const { setmonsterObj, monsterObj, setCombatSwitch, player, enemyList } =
    props;

  const [combatArray, SetCombatArray] = useState([]);
  const [sorted, setSorted] = useState(true);
  const [monsterUrl, setMonsterUrl] = useState(null);
  const [round, setRound] = useState(1);
  const [turn, setTurn] = useState(0);

  const [hpChange, setHpchange] = useState(0);

  useEffect(() => {
    if (combatArray[0]?.monsterName) {
      setMonsterUrl(combatArray[0].url);
    } else {
    }
  }, [combatArray]);

  useEffect(() => {
    if (player.length > 0 && enemyList.length > 0) {
      const combat = player.concat(enemyList);
      const combat2 = JSON.parse(JSON.stringify(combat));
      SetCombatArray(combat2);
      setHpchange(
        combatArray.map((x) => {
          return "";
        })
      );
    }
  }, [player, enemyList]);

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
          if (object.maxHp) {
            if (object.maxHp - Number(hpChange[index]) < 0) {
              object.maxHp = 0;
              return object;
            }
            object.maxHp -= Number(hpChange[index]);
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
        let [playerobj] = player.filter((x) => x.name === object.name);
        let [monster] = enemyList.filter(
          (x) => x.monsterReference === object.monsterReference
        );

        if (i === index) {
          if (typeof object?.maxHp === "number") {
            if (object.maxHp + Number(hpChange[index]) > playerobj.maxHp) {
              object.maxHp = playerobj.maxHp;
              return object;
            }
            object.maxHp += Number(hpChange[index]);
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
      } else {
        setTurn(1);
      }
    }
  };

  const setIntiative = () => {
    const check = combatArray.every((item) => {
      return typeof item.initative === "number";
    });
    console.log(check);
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
    }
  };

  const resetIntiative = () => {
    setSorted(true);
  };
  const navigateToPrep = () => {
    //add a swtich effect
  };

  return (
    <div className='Enemy'>
      <div className='combatBanner'>
        {sorted ? (
          <button
            className='bannerButton'
            id='setInitative'
            onClick={setIntiative}
          >
            Set Initative
          </button>
        ) : (
          <img
            className='listTitle'
            src='/demoCombat.png'
          />
        )}
        {!sorted && (
          <p className='rounds'>
            <strong>Round: {round}</strong>
          </p>
        )}
        {!sorted && (
          <button
            className='bannerButton'
            onClick={nextTurn}
          >
            Next Turn
          </button>
        )}
        <button
          className='bannerButton'
          id='endCombat'
          onClick={() => setCombatSwitch(false)}
        >
          End Combat
        </button>
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
                <p>{object.playerClass}</p>
                <p>{object.race}</p>

                {object.maxHp > 0 ? (
                  <h1 className='enemyHp'>
                    HP: <span className='health'>{object.maxHp}</span>
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
                  {object.maxHp > 0 && (
                    <button
                      onClick={() => {
                        damageClick(index);
                      }}
                    >
                      hit:
                    </button>
                  )}
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
                  {object.health > 0 && (
                    <button
                      onClick={() => {
                        damageClick(index);
                      }}
                    >
                      hit:
                    </button>
                  )}
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

export default HomeCombat;
