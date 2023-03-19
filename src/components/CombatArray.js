import axios from "axios";

import { useEffect, useState } from "react";

const CombatArray = (props) => {

const {setmonsterObj, monsterObj} = props

    const [playerArray,setPlayerArray] = useState([]);
    const [monsterArray,setMonsterArray] = useState([]);
    const [combatArray, SetCombatArray] = useState([]);
    const [sorted, setSorted] = useState(true);
    const [monsterRef, setMonsterRef] = useState('');

    const [hpChange, setHpchange] = useState(0);

    const handleChange = (event, index) => {
        setHpchange(hpChange.map((x, i)=>{
            if(i === index) {
                return event.target.value
            }
        }));
      };

      
    const addIntiative = (event ,index) => {
        SetCombatArray(combatArray.map((x, i) => {
            if (i === index) {
                x.initative = Number(event.target.value)
                return x
            } else {
                return x
            }
        }))
        console.log(combatArray)
    }

      const damageClick = (index) => {
        SetCombatArray(combatArray
            .map((object,i) => {
            if(i === index) {
                if (object.max_hp) {
                     object.max_hp -= Number(hpChange[index])
                     return object
                }
                if (object.health) {
                    object.health -= Number(hpChange[index])
                    return object
                }
            } else {
                return object
            }
        })
        )
        setHpchange(hpChange.map((x, i)=>{
            if(i === index) {
                return ''
            }
        }));
      };

      const healClick = (index) => {
        SetCombatArray(combatArray
            .map((object,i) => {
            if(i === index) {
                if (object.max_hp) {
                     object.max_hp += Number(hpChange[index])
                     return object
                }
                if (object.health) {
                    object.health += Number(hpChange[index])
                    return object
                }
            } else {
                return object
            }
        })
        )
        setHpchange(hpChange.map((x, i)=>{
            if(i === index) {
                return ''
            }
        }));
      };

    useEffect(()=>{
        axios.get('/api/pc')
        .then((response) => {
            return response.data
        }).then((data) => {
            setPlayerArray(data)
        })
        .catch((error) =>{
            console.log(error);
        });
    },[])

    useEffect(()=>{
        if (playerArray.length > 0 && monsterArray.length > 0) {
            SetCombatArray([...playerArray,...monsterArray])               
        }
        if (combatArray.length > 0 ) {
            setHpchange(combatArray.map((x)=>{
                return ''
            }))

        }


    },[playerArray,monsterArray])

    useEffect(() => {
        axios.get('/api/enemy')
        .then((response) => {
            return response.data
        }).then((data) => {
            setMonsterArray(data)
        })
        .catch((error) =>{
          console.log(error);
        });
    },[])
   

   const setIntiative = () => {
    combatArray.sort((a,b)=> {
        if (a.initative > b.initative) {
            return -1
        }
        if (a.initative < b.initative) {
            return 1
        }
        return 0
    })
    SetCombatArray([...combatArray])
    setSorted(false)
   }


    return (<>
    <div>
      {sorted ? (
        <button
        onClick={setIntiative}
      >Set Initative</button>
      ) : (
        <button
            onclick={()=>{
                setMonsterRef("cultist")
            }}
        >Next Turn</button>
      )}
    </div>
    {combatArray.map((object, index)=>{
        if (object.name) {
            return (
            <div className="playerDiv" id={index}>
              <div className="enemyTop">
                {sorted ? (<input
                    placeholder="initative"
                    onChange={(e)=>{
                        addIntiative(e, index)
                    }}
                ></input>) : (<h3>Initative: <br/>{object.initative}</h3>)}
                <h1 className="enemyName">{object.name}</h1>
                <p>{object.player_class}</p>
                <p>{object.race}</p>
                
                {object.max_hp > 0 ? <h1 className="enemyHp">HP: <span className="health">{object.max_hp}</span></h1> : <h1>You Dead</h1>}
              </div>
            <div className="enemyBot">
            <div className="stats">
            <p className="pcSave">Saving Throws</p>
            <span className="statsNum">DEX: <br/>+{object.dex}</span>
            <span className="statsNum">INT: <br/>+{object.int}</span>
            <span className="statsNum">CHA: <br/>+{object.cha}</span>
            <span className="statsNum">STR: <br/>+{object.str}</span>
            <span className="statsNum">CON: <br/>+{object.con}</span>
            <span className="statsNum">WIS: <br/>+{object.wis}</span>
          </div>
              <div>
                <button
                    onClick={() => {
                        damageClick(index)
                    }}
                >hit:</button>
                <button
                    onClick={() => {
                        healClick(index)
                    }}
                >heal:</button>
                <input
                  type="Number"
                  name="message"
                  onChange={(e)=>{handleChange(e, index)}}
                  value={hpChange[index]}
                ></input>
              </div>
            </div>
            </div>
            )
        } else {
            return (
            <div className="enemyDiv" id={index}>
                <div className="enemyTop">
                {sorted ? (<input
                    placeholder="initative"
                    onChange={(e)=>{
                        addIntiative(e, index)
                    }}
                ></input>) : (<h3>Initative: <br/>{object.initative}</h3>)}
                  <h1>{object.monsterReference}</h1>
                  <h6 className="enemyName">{object.monsterName}</h6>
                  {object.health > 0 ? <h1 className="enemyHp">HP: <span className="health">{object.health}</span></h1> : <h1>Dead</h1>}
                </div>
              <div className="enemyBot">
                <div>
                <button
                    onClick={() => {
                        damageClick(index)
                    }}
                >hit:</button>
                <button
                    onClick={() => {
                        healClick(index)
                    }}
                >heal:</button>
                <input
                  type="Number"
                  name="message"
                  onChange={(e)=>{handleChange(e, index)}}
                  value={hpChange[index]}
                ></input>
              </div>
            </div>
            </div>)
        }
    })}
    </>)
}

export default CombatArray