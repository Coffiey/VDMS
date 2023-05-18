import { useState, useEffect } from "react";
import Enemy from "./Enemy";
import axios from "axios";
import DisplayMonster from "./DisplayMonster";

const EncounterDisplay = () => {
  const [monsterObj, setMonsterObj] = useState(null);
  const [combatState, useCombatState] = useState(true);
  const [search, setSearch] = useState("");
  const [disableInput, setDisableInput] = useState(true);
  const [list, setList] = useState([]);
  const [dropdown, setDropdown] = useState([]);
  const [seeList, setSeeList] = useState(false);
  const [display, setDisplay] = useState(true);

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
        combatState={combatState}
        setSearch={setSearch}
        search={search}
        disableInput={disableInput}
        monsterObj={monsterObj}
        setMonsterObj={setMonsterObj}
        list={list}
        dropdown={dropdown}
        seeList={seeList}
        display={display}
      />
      <div className='DisplayMonster'>
        <DisplayMonster
          setMonsterObj={setMonsterObj}
          monsterObj={monsterObj}
          combatState={combatState}
        />
      </div>
    </>
  );
};

export default EncounterDisplay;
