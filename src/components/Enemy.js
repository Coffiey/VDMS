import "./css/enemy.css"
import DropdownItem from "./DropdownItem";
import axios from "axios";
import { useEffect, useState } from "react"

const Enemy = (props) => {
    const {
        setSearch,
        disableInput,
        monsterObj,
        setmonsterObj,
        display,
        list,
        combatState,
        dropdown,
        seeList
         } = props;

    const [selected, setSelected] = useState(true);
    const [monster, setMonster] = useState(true);
    const [health, setHealth] = useState(0);
    const [monsterReference, setMonsterReference] = useState('');
    const [Customhealth, setCustomhealth] = useState(0);
    const [monsterArray, setMonsterArray] = useState([]);
    const [updateMonsterArray, setUpdateMonsterArray] = useState([]);
    const [damage, setDamage] = useState(0);
    const [heal, setHeal] = useState(0);

    const createMon = (monster, health, index, Reference) => {
        const obj = {
            monsterName: monster,
            health: health,
            index,
            monsterReference: Reference
        }
        return obj
    }

    useEffect(() => {
        axios.get('/api/enemy')
        .then((response) => {
            return response.data
        }).then((data) => {
            console.log(data)
            setMonsterArray(data)
        })
        .catch((error) =>{
          console.log(error);
        });
    },[])

    useEffect(()=>{
        if (monsterArray.length !== 0) {
           let [item] = list.filter((monster) => {
              return monster.name === monsterArray[0].monsterName
            })
            axios.get(`/api/monster/object?url=${item.url}`)
            .then((response) => {
                setmonsterObj(response.data) 
            })
            .catch(function (error) {
              console.log(error);
            });
        }
    }, [disableInput])
    const postEnemy = (object) => {
        console.log(object)
        return axios
           .post('/api/enemy', object)
           .then((response)=> {
             console.log(response)
           })
           .catch((err) => console.log(err))
       }

     const  newMonsterAray = (damage, info) => {
        return monsterArray.map((item)=>{
            if (monsterArray.indexOf(item) === monsterArray.indexOf(info)) {
                console.log(item)
                item.health += damage
                console.log(item)
                return item
            } else {
                return item
            }
        })
        
     }


    return(
        <>
        {combatState && (<div>{display && (<div className="enemyDiv">
           {monsterReference === '' ? <h1>Create an enemy</h1>:<h1>{monsterReference}</h1>}
           {monsterObj !== null && <h2>{monsterObj.name}</h2>}
            <p>Serach: <input 
       type="text"
       disabled={disableInput}
       onChange={(e) => {
        setSearch(e.target.value)
        }}
        ></input>
        {seeList && (

            <ul>
              <DropdownItem
              combatState={combatState}
                dropdown={dropdown}
                setmonsterObj={setmonsterObj}
                setSearch={setSearch}
              />
            </ul>
          ) }
          </p>
    {monsterObj !== null && (
        <>
        <p>HP: {!health ? (
            <>
        <input 
        type="number"
        onChange={(e) => {
            setCustomhealth(e.target.value)
        }}
        ></input>
        <button
        onClick={()=>{
            setHealth(Customhealth)
        }}>custom</button>
        <button
        onClick={()=>{
            setHealth(monsterObj.hit_points)
            }}>defalt</button>
            </>
            ) : (
        <span>{health}</span>
        )}
        </p>
        </>)}
        <p>Set Name:
        <input
        onChange={(e) => {
            setMonsterReference(e.target.value)
        }}
        />
            <button
            disabled={!health}
              onClick={()=>{
                setMonster()
                setMonsterArray([...monsterArray, (createMon(monsterObj.name, health,monsterObj.index,
                    monsterReference))])
                postEnemy(createMon(
                    monsterObj.name,
                    health,
                    monsterObj.index,
                    monsterReference
                    ))

                }}>Create Monster</button></p>
        </div>)}</div>)}


        <div>{monsterArray.map((info)=>{
            return (
                <div className="enemyDiv">
                    <div className="enemyTop">
                    <h1>{info.monsterReference}</h1>
                    <h6 className="enemyName">{info.monsterName}</h6>
                    <h1 className="enemyHp">HP: <span className="health">{info.health}</span></h1>
                    </div>
                    <div className="enemyBot">
                    <p onClick={()=> console.log(newMonsterAray(damage, info))}>Damage: <input
                      onChange={(e) => {
                        setHeal(Number(e.target.value))
                    }}
                      type="Number"></input></p>
                    <p>Heal: <input
                       type="Number"></input>
                    </p>
                    </div>
                </div>)
        })
    }</div>
        </>
        )
}

export default Enemy