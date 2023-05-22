import { useState, useEffect } from "react";
import axios from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import HomePlayer from "./HomePlayer";
import HomeEnemies from "./HomeEnemies";
import HomeCombat from "./HomeCombat";
import "../../../App.css";

const HomeDisplay = () => {
  // New stuff
  //old stuff

  const [monsterObj, setMonsterObj] = useState(null);
  const [search, setSearch] = useState("");
  const [disableInput, setDisableInput] = useState(true);
  const [list, setList] = useState([]);
  const [dropdown, setDropdown] = useState([]);
  const [seeList, setSeeList] = useState(false);
  const [name, setName] = useState(null);
  const [textState, setTextState] = useState(true);
  const [campaignText, setCampaignText] = useState("");
  const [encounterText, setEncounterText] = useState("");
  const [campaignObj, setCampaignObj] = useState(null);
  const [enemyList, setEnemyList] = useState([]);
  const [combatSwitch, setCombatSwitch] = useState(false);

  //stuff i added
  const [player, setPlayer] = useState([]);

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
      <HomePlayer
        player={player}
        setPlayer={setPlayer}
        combatSwitch={combatSwitch}
      />
      <div className='Outlet'>
        {!combatSwitch ? (
          <HomeEnemies
            setSearch={setSearch}
            search={search}
            disableInput={disableInput}
            monsterObj={monsterObj}
            setMonsterObj={setMonsterObj}
            dropdown={dropdown}
            seeList={seeList}
            setEnemyList={setEnemyList}
            enemyList={enemyList}
            setCombatSwitch={setCombatSwitch}
          />
        ) : (
          <HomeCombat
            setCombatSwitch={setCombatSwitch}
            player={player}
            enemyList={enemyList}
          />
        )}
        <div className='DisplayMonster'>
          <div className='notesDiv'></div>
          <Outlet context={{ monsterObj }} />
        </div>
      </div>
    </>
  );
};

export default HomeDisplay;
