import { useEffect, useState } from "react"

const Enemy = (props) => {
        const {setSearch, disableInput, monsterObj} = props;

    const [selected, setSelected] = useState(true);
    const [monster, setMonster] = useState(true);
    const [health, setHealth] = useState(0);
    const [Customhealth, setCustomhealth] = useState(0);

    return(
        <>
        {selected ? (<div>
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
            setHealth(JSON.stringify(monsterObj.hit_points))
            }}>defalt</button>
            </>
            ) : (
        <span>{health}</span>
        )}
        </p>
        </>)}
            <button
              onClick={()=>{
                setMonster()
                setSelected(false)
                }}>Create Monster</button>
        </div>) : (
            <div>
                <h1>{monsterObj.name}</h1>
                <p>HP: {health}</p>
                <h1>Conditons</h1>
                <p>Damage: <input
                   type="Number"></input><br/>
                   Heal: <input
                   type="Number"></input><br/>
                </p>
                <button>Delete Monster</button>
            </div>
        )}
        </>
            )
}

export default Enemy