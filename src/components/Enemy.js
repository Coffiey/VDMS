import "./css/enemy.css";
import DropdownItem from "./DropdownItem";
import axios from "axios";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Enemy = (props) => {
  const {
    setSearch,
    search,
    disableInput,
    monsterObj,
    setmonsterObj,
    display,
    list,
    combatState,
    dropdown,
    seeList,
    setList,
  } = props;

  const [monster, setMonster] = useState(true);
  const [health, setHealth] = useState(0);
  const [monsterReference, setMonsterReference] = useState("");
  const [Customhealth, setCustomhealth] = useState(0);
  const [monsterArray, setMonsterArray] = useState([]);
  const [monsterObj2, setMonsterObj2] = useState(0);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const reset = () => {
    setSearch("");
    setmonsterObj(null);
    setHealth(0);
    setMonsterReference("");
    setCustomhealth(0);
    setMonsterObj2(0);
    setMonsterArray([]);
  };
  const createMon = (monster, health, index, Reference, url) => {
    const obj = {
      monsterName: monster,
      health: health,
      index,
      monsterReference: Reference,
      url,
    };
    return obj;
  };

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
        navigate("/login", { state: { from: location }, replace: true });
        controller.abort();
      }
    };
    getEnemy();
    reset();
    return () => {
      isMounted = false;
    };
  }, [monster]);

  const postEnemy = async (object) => {
    const controller = new AbortController();
    try {
      await axiosPrivate.post(`/db/enemy`, object, {
        signal: controller.signal,
      });
      setMonster(!monster);
    } catch (err) {
      console.error(err);
      controller.abort();
    }
  };

  const deleteEnemy = async (index) => {
    const controller = new AbortController();
    try {
      await axiosPrivate.delete(
        `/db/enemy?monsterReference=${index.monsterReference}`,
        {
          signal: controller.signal,
        }
      );
      setMonster(!monster);
    } catch (err) {
      console.error(err);
      controller.abort();
    }
  };

  useEffect(() => {
    if (monsterObj2) {
      setmonsterObj(monsterObj2);
    }
  }, [monsterObj2]);

  useEffect(() => {
    if (monsterArray.length !== 0) {
      let [item] = list.filter((monster) => {
        return monster.name === monsterArray[0].monsterName;
      });
      axios
        .get(`/api/monster/object?url=${item.url}`)
        .then((response) => {
          setmonsterObj(response.data);
        })
        .catch(function (error) {});
    }
  }, [disableInput]);

  return (
    <>
      <div className='Enemy'>
        {combatState && (
          <div>
            {display && (
              <div className='enemyDiv'>
                {monsterReference === "" ? (
                  <h1>Create an enemy</h1>
                ) : (
                  <h1>{monsterReference}</h1>
                )}
                {monsterObj !== null ? (
                  <>
                    <h2 onClick={() => setmonsterObj(null)}>
                      {monsterObj.name}
                    </h2>
                    <p>
                      HP:{" "}
                      {!health ? (
                        <>
                          <input
                            type='number'
                            onChange={(e) => {
                              setCustomhealth(e.target.value);
                            }}
                          ></input>
                          <button
                            onClick={() => {
                              setHealth(Customhealth);
                            }}
                          >
                            custom
                          </button>
                          <button
                            onClick={() => {
                              setHealth(monsterObj.hit_points);
                            }}
                          >
                            defalt
                          </button>
                        </>
                      ) : (
                        <span>{health}</span>
                      )}
                    </p>
                    <p>
                      Set Name:
                      <input
                        value={monsterReference}
                        onChange={(e) => {
                          setMonsterReference(e.target.value);
                        }}
                      />
                      <button
                        disabled={!health}
                        onClick={() => {
                          setMonster();
                          setMonsterArray([
                            ...monsterArray,
                            createMon(
                              monsterObj?.name,
                              health,
                              monsterObj?.index,
                              monsterReference,
                              monsterObj?.url
                            ),
                          ]);
                          postEnemy(
                            createMon(
                              monsterObj?.name,
                              health,
                              monsterObj?.index,
                              monsterReference,
                              monsterObj?.url
                            )
                          );
                        }}
                      >
                        Create Monster
                      </button>
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Serach:{" "}
                      <input
                        value={search}
                        type='text'
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                      ></input>
                      {seeList && (
                        <ul>
                          <DropdownItem
                            setList={setList}
                            combatState={combatState}
                            dropdown={dropdown}
                            setMonsterObj2={setMonsterObj2}
                            setSearch={setSearch}
                          />
                        </ul>
                      )}
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        <div>
          {monsterArray.map((info, index) => {
            return (
              <div className='enemyDiv'>
                <div className='enemyTop'>
                  <h1>{info.monsterReference}</h1>
                  <h6 className='enemyName'>{info.monsterName}</h6>
                  <h1 className='enemyHp'>
                    HP: <span className='health'>{info.health}</span>
                  </h1>
                </div>
                <div className='enemyBot'>
                  {/* <button onClick={() => console.log(info)}>
                    Edit Monster
                  </button> */}
                  <button onClick={() => deleteEnemy(info)}>
                    Delete Monster
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Enemy;
