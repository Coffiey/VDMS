import "./enemy.css";
import DropdownItem from "./DropdownItem";
import axios from "axios";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
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
              <h1 className='encounterItem'>Create an enemy</h1>
            ) : (
              <h1 className='encounterItem'>{monsterReference}</h1>
            )}
            {monsterName !== "" ? (
              <>
                <h2
                  className='encounterItem'
                  id='nameClick'
                  onClick={() => reset()}
                >
                  {monsterObj?.name}
                </h2>
                <p className='enemyItem'>
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
                        className='encounterButton'
                        id='customButton'
                        onClick={() => {
                          setHealth(Customhealth);
                        }}
                      >
                        custom
                      </button>
                      <button
                        id='defaultButton'
                        className='encounterButton'
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
                <p className='enemyItem'>
                  Set Name:
                  <input
                    value={monsterReference}
                    onChange={(e) => {
                      setMonsterReference(e.target.value);
                    }}
                  />
                  <button
                    className='encounterButton'
                    disabled={!health}
                    onClick={postEnemy}
                  >
                    Create Monster
                  </button>
                </p>
              </>
            ) : (
              <>
                <p className='encounterItem'>
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
                    <ul className='DropListWrap'>
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
                  <h6 className='enemyName'>{info?.monsterName}</h6>
                </div>
                <div className='enemyBot'>
                  <h1 className='monsterRef'>{info?.monsterReference}</h1>
                  <button
                    className='deleteMonster'
                    onClick={() => deleteEnemy(info)}
                  >
                    Delete Monster
                  </button>
                  <h1 className='enemyHp'>
                    HP: <span className='health'>{info.health}</span>
                  </h1>
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
