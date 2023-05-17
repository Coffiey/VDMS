import { useState } from "react";
import CombatPlayers from "../CombatPlayer";
import CombatArray from "../CombatArray";
import DisplayMonster from "../DisplayMonster";

const CombatDisplay = () => {
  const [monsterObj, setmonsterObj] = useState(null);
  return (
    <>
      <CombatPlayers />
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
