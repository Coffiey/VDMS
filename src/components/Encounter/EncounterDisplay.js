import { useState } from "react";
import Players from "../campaign/Players";
import Enemy from "./Enemy";
import DisplayMonster from "./DisplayMonster";

const EncounterDisplay = () => {
  const [monsterObj, setmonsterObj] = useState(null);
  const [combatState, useCombatState] = useState(true);
  const [search, setSearch] = useState("");
  const [disableInput, setDisableInput] = useState(true);
  const [list, setList] = useState([]);
  const [dropdown, setDropdown] = useState([]);
  const [seeList, setSeeList] = useState(false);
  const [display, setDisplay] = useState(true);

  return (
    <>
      <Players />
      <Enemy
        combatState={combatState}
        setSearch={setSearch}
        search={search}
        disableInput={disableInput}
        monsterObj={monsterObj}
        setmonsterObj={setmonsterObj}
        list={list}
        dropdown={dropdown}
        seeList={seeList}
        display={display}
      />
      <div className='DisplayMonster'>
        <DisplayMonster
          setmonsterObj={setmonsterObj}
          monsterObj={monsterObj}
          combatState={combatState}
        />
      </div>
    </>
  );
};

export default EncounterDisplay;
