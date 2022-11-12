import "./css/enemy.css"
import axios from "axios";
import { useEffect, useState } from "react"

const Enemy = (props) => {
        const {setSearch, disableInput, monsterObj, setMonsterObj, display, list} = props;

    const [selected, setSelected] = useState(true);
    const [monster, setMonster] = useState(true);
    const [health, setHealth] = useState(0);
    const [Customhealth, setCustomhealth] = useState(0);
    const [monsterArray, setMonsterArray] = useState([]);
    const [updateMonsterArray, setUpdateMonsterArray] = useState([]);
    const [damage, setDamage] = useState(0);
    const [heal, setHeal] = useState(0);

    const createMon = (monster, health) => {
        const obj = {monsterName: monster,
            health: health}
        return obj
    }

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

    useEffect(()=>{
        if (monsterArray.length !== 0) {
           let [item] = list.filter((monster) => {
              return monster.name === monsterArray[0].monsterName
            })
            axios.get(`/api/monster/object?url=${item.url}`)
            .then((response) => {
                setMonsterObj(response.data) 
            })
            .catch(function (error) {
              console.log(error);
            });
        }
    }, [disableInput])
    const postEnemy = (object) => {
        return axios
           .post('/api/enemy', object)
           .then((response)=> {
             console.log(response)
           })
           .catch((err) => console.log(err))
       }

    //  const  newMonsterAray = (damage, info) => {
    //     let newArray = monsterArray.map((item)=>{
    //         if (monsterArray.indexOf(item) === monsterArray.indexOf(info)) {
    //             item.health += damage
    //         }
    //     })
    //     return newArray
    //  }


    return(
        <>
        <div>{monsterArray.map((info)=>{
            return (
                <div className="enemyDiv">
                    <div className="enemyTop">
                    <h1 className="enemyName">{info.monsterName}</h1>
                    <h1 className="enemyHp">HP: <span className="health">{info.health}</span></h1>
                    </div>
                    <div className="enemyBot">
                    <p onClick={async ()=>{
                        // console.log(monsterArray[monsterArray.indexOf(info)])
                        // newMonsterAray(damage, info)
                        // // setMonsterArray(newMonsterAray(damage, info))
                        // console.log(newMonsterAray(damage, info))
                    }}>Damage: <input
                    onChange={(e)=>{
                        setDamage(Number(e.target.value))
                    }}
                       type="Number"></input></p>
                    <p onClick={()=>console.log(heal)}>Heal: <input
                    onChange={(e)=>{
                        setHeal(Number(e.target.value))
                    }}
                       type="Number"></input>
                    </p>
                    </div>
                </div>)
        })
    }</div>
        
        {display && (<div className="enemyDiv">
           <h1>Create an enemy</h1>
           {monsterObj !== null && <h2>{monsterObj.name}</h2>}
            <input 
       type="text"
       disabled={disableInput}
       onChange={(e) => {
        setSearch(e.target.value)
        }}
        ></input>
    {monsterObj !== null && (
        <>
        <p>HP: {!health ? (
            <>
        <input 
        type="number"
        onChange={(e) => {
            setCustomhealth(e.target.value)
        }}
        ></input><br/>
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
            <button
            disabled={!health}
              onClick={()=>{
                setMonster()
                setMonsterArray([...monsterArray, (createMon(monsterObj.name, health))])
                postEnemy(createMon(monsterObj.name, health))
                setHealth(0)
                // setSelected(false)
                }}>Create Monster</button>
        </div>)}
        </>
        )
}

export default Enemy