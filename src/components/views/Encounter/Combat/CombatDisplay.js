import { useState } from "react";
import CombatArray from "./CombatArray";
import DisplayMonster from "../prep/DisplayMonster";

const CombatDisplay = () => {
  const [monsterObj, setmonsterObj] = useState(null);
  return (
    <>
      <CombatArray
        setmonsterObj={setmonsterObj}
        monsterObj={monsterObj}
      />
      <div className='DisplayMonster'>
        <DisplayMonster
          setmonsterObj={setmonsterObj}
          monsterObj={monsterObj}
        />
      </div>
    </>
  );
};

export default CombatDisplay;
