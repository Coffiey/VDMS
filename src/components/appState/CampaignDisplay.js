import "./css/enemy.css";
import DropdownItem from "./DropdownItem";
import axios from "axios";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const CampaignDisplay = (props) => {
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
    // let isMounted = true;
    // const controller = new AbortController();
    // const getEnemy = async () => {
    //   try {
    //     const response = await axiosPrivate.get("/db/enemy", {
    //       signal: controller.signal,
    //     });
    //     isMounted && setMonsterArray(response.data);
    //   } catch (err) {
    //     console.error(err);
    //     navigate("/login", { state: { from: location }, replace: true });
    //     controller.abort();
    //   }
    // };
    // getEnemy();
    // reset();
    // return () => {
    //   isMounted = false;
    // };
  }, [monster]);

  const postEnemy = async (object) => {
    // const controller = new AbortController();
    // try {
    //   await axiosPrivate.post(`/db/enemy`, object, {
    //     signal: controller.signal,
    //   });
    //   setMonster(!monster);
    // } catch (err) {
    //   console.error(err);
    //   controller.abort();
    // }
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
    // if (monsterObj2) {
    //   setmonsterObj(monsterObj2);
    // }
  }, [monsterObj2]);

  useEffect(() => {
    // if (monsterArray.length !== 0) {
    //   let [item] = list.filter((monster) => {
    //     return monster.name === monsterArray[0].monsterName;
    //   });
    //   axios
    //     .get(`/api/monster/object?url=${item.url}`)
    //     .then((response) => {
    //       setmonsterObj(response.data);
    //     })
    //     .catch(function (error) {});
    // }
  }, [disableInput]);

  const navigateToCombat = () => {
    navigate("/combat", { replace: true });
  };
  return (
    <>
      <div className='Enemy'>
        <div className='combatBanner'>
          <button>Set Initative</button>
          <p>Initative Set</p>
          <button>Next Turn</button>
          <p>
            <strong>Round: 9</strong>
          </p>
          <button onClick={navigateToCombat}>Begin Combat</button>
        </div>
      </div>
    </>
  );
};

export default CampaignDisplay;
