import axios from "axios";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "./combatPlayer.css";
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
    <div className='CombatPlayer'>
      {player.length > 0 ? (
        player.map((item) => {
          return (
            <div className='pc'>
              <div className='top'>
                <h2 className='pcName'>
                  Name: <span id='pcName'>{item.name}</span>
                </h2>
                <h2 className='pcHp'>
                  HP: <span className='hp'>{item.max_hp}</span>
                </h2>
              </div>

              <div className='mid'>
                <div className='levelDiv'>
                  <h1 className='level'>Level {item.level}:</h1>
                  <h2 className='pcClass'>{item.player_class} </h2>
                </div>
                <div className='levelDiv'>
                  <h1 className='level'>Race:</h1>
                  <h2 className='pcClass'>{item.race}</h2>
                </div>
              </div>

              <div className='stats'>
                <p className='pcSave'>Saving Throws</p>
                <span className='statsNum'>
                  DEX: <br />
                  {item.dex > 0 && <span>+</span>}
                  {item.dex}
                </span>
                <span className='statsNum'>
                  INT: <br />
                  {item.int > 0 && <span>+</span>}
                  {item.int}
                </span>
                <span className='statsNum'>
                  CHA: <br />
                  {item.cha > 0 && <span>+</span>}
                  {item.cha}
                </span>
                <span className='statsNum'>
                  STR: <br />
                  {item.str > 0 && <span>+</span>}
                  {item.str}
                </span>
                <span className='statsNum'>
                  CON: <br />
                  {item.con > 0 && <span>+</span>}
                  {item.con}
                </span>
                <span className='statsNum'>
                  WIS: <br />
                  {item.wis > 0 && <span>+</span>}
                  {item.wis}
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <h1 className='title'>No Players Added Yet</h1>
      )}
    </div>
  );
};

export default CombatPlayers;
