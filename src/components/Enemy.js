import axios from "axios";
import { useEffect, useState } from "react"

const Enemy = (props) => {
        const {setSearch, disableInput, monsterObj} = props;

    const [selected, setSelected] = useState(true);
    const [monster, setMonster] = useState(true);
    const [health, setHealth] = useState(0);
    const [Customhealth, setCustomhealth] = useState(0);
    const [monsterArray, setMonsterArray] = useState([]);

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

    const postEnemy = (object) => {
        return axios
           .post('/api/enemy', object)
           .then((response)=> {
             console.log(response)
           })
           .catch((err) => console.log(err))
       }


    return(
        <>
        <div>{monsterArray.length !== 0 && monsterArray.map((info)=>{
            return (
                <div>
                    <h1>{info.monsterName}</h1>
                    <p>HP: {info.health}</p>
                    <p>Damage: <input
                       type="Number"></input><br/>
                       Heal: <input
                       type="Number"></input><br/>
                    </p>
                    <button>Delete Monster</button>
                </div>)
        })
    }</div>
        
        {selected && (<div>
           {monsterObj === null ? <h1>Pick a monster</h1> : <h1>{monsterObj.name}</h1>} 
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