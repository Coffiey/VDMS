import "./enemy.css";
import DropdownItem from "./DropdownItem";
import axios from "axios";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Enemy = (props) => {
  const {
    setSearch,
    search,
    disableInput,
    monsterObj,
    setMonsterObj,
    dropdown,
    seeList,
    encounterFocus,
  } = props;

  const [monster, setMonster] = useState(true);
  const [monsterName, setMonsterName] = useState("");
  const [monsterID, setMonsterID] = useState();
  const [health, setHealth] = useState(0);
  const [monsterReference, setMonsterReference] = useState("");
  const [Customhealth, setCustomhealth] = useState(0);
  const [monsterArray, setMonsterArray] = useState([]);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const { campaign, encounter } = useParams();
  const userId = auth.id;

  const reset = () => {
    setSearch("");
    setHealth(0);
    setMonsterReference("");
    setCustomhealth(0);
    setMonsterName("");
  };

  const createMon = () => {
    const obj = {
      monsterName: monsterName,
      health,
      index: monsterObj?.index,
      monsterReference,
      url: monsterObj?.url,
    };
    return obj;
  };

  useEffect(() => {
    let isMounted = true;
    const getEnemy = async () => {
      try {
        const response = await axiosPrivate.get(
          `/db/${userId}/${campaign}/${encounter}/enemy`
        );
        isMounted && setMonsterArray(response.data);
        changeObj(response.data[0]);
      } catch (err) {
        console.error(err);
      }
    };
    getEnemy();
    reset();
    return () => {
      isMounted = false;
    };
  }, [monster]);

  const postEnemy = async (object) => {
    const monsterDB = createMon();
    console.log(monsterDB);
    try {
      await axiosPrivate.post(
        `/db/${userId}/${campaign}/${encounter}/enemy`,
        monsterDB
      );
      setMonster(!monster);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(encounterFocus);

  const check = async (index) => {
    const answer = window.confirm(
      `Are you sure you want to delete ${index.monsterReference}`
    );
    return answer;
  };

  const deleteEnemy = async (index) => {
    const checked = await check(index);
    if (checked) {
      try {
        await axiosPrivate.delete(
          `/db/${userId}/${campaign}/${encounter}/enemy?id=${index.id}`
        );
        setMonster(!monster);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (monsterID) {
      axios
        .get(`/api/monster/object?url=${monsterID}`)
        .then((response) => {
          setMonsterObj(response.data);
        })
        .catch(function (error) {});
    }
  }, [monsterID]);

  const changeObj = (info) => {
    setMonsterID(info.url);
  };

  return (
    <>
      <div className='Enemy'>
        <div className='combatBanner'>
          <img
            className='listTitle'
            id='encounterImg'
            onClick={() => navigate(`/profile/${campaign}`)}
            src='/Encounter.png'
          />
          {encounterFocus && (
            <p className='listAnswer'>{encounterFocus.encounterName}</p>
          )}
          <button
            className='bannerButton'
            onClick={() => navigate(`/profile/${campaign}/${encounter}/combat`)}
          >
            Begin Combat
          </button>
        </div>
        <div>
          <div className='enemyDiv'>
            {monsterReference === "" ? (
              <h1>Create an enemy</h1>
            ) : (
              <h1>{monsterReference}</h1>
            )}
            {monsterName !== "" ? (
              <>
                <h2 onClick={() => reset()}>{monsterObj?.name}</h2>
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
                    onClick={postEnemy}
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
                    hidden={disableInput}
                  ></input>
                  {seeList && (
                    <ul>
                      <DropdownItem
                        dropdown={dropdown}
                        setSearch={setSearch}
                        setMonsterID={setMonsterID}
                        setMonsterName={setMonsterName}
                      />
                    </ul>
                  )}
                </p>
              </>
            )}
          </div>
        </div>

        <div>
          {monsterArray.map((info, index) => {
            return (
              <div
                className='enemyDiv'
                onClick={() => changeObj(info)}
              >
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
