import axios from "axios";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "../../campaign/player.css";
import "../../../../App.css";

import { useState, useEffect } from "react";

const CombatPlayers = () => {
  const [player, setPlayer] = useState([]);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const { auth } = useAuth();
  const params = useParams();
  const campaignId = params.campaign;
  //get request
  useEffect(() => {
    let isMounted = true;
    const getPlayers = async () => {
      try {
        const response = await axiosPrivate.get(
          `/db/${auth.id}/${campaignId}/pc`
        );
        isMounted && setPlayer(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPlayers();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className='Player'>
      {player.map((item) => {
        return (
          <div className='pc'>
            <div className='top'>
              <h2 className='pcName'>{item.name}</h2>
              <h2 className='pcHp'>
                HP: <span className='hp'>{item.max_hp}</span>
              </h2>
            </div>

            <div className='mid'>
              <div className='levelDiv'>
                <h1 className='level'>Level {item.level}:</h1>
                <h2 className='pcClass'>{item.player_class} </h2>
              </div>
              <h2 className='pcRace'>{item.race}</h2>
            </div>

            <div className='stats'>
              <p className='pcSave'>Saving Throws</p>
              <span className='statsNum'>
                DEX: <br />+{item.dex}
              </span>
              <span className='statsNum'>
                INT: <br />+{item.int}
              </span>
              <span className='statsNum'>
                CHA: <br />+{item.cha}
              </span>
              <span className='statsNum'>
                STR: <br />+{item.str}
              </span>
              <span className='statsNum'>
                CON: <br />+{item.con}
              </span>
              <span className='statsNum'>
                WIS: <br />+{item.wis}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CombatPlayers;
