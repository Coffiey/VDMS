import axios from "axios";

import ClassDrop from "./CharachterDropDowns/ClassDrop";
import RaceDrop from "./CharachterDropDowns/RaceDrop";

import { useState, useEffect } from "react";

const Players = (props) => {
    const {} = props

    const [name, setName] = useState(undefined)
    const [playerClass, setPlayerClass] = useState("please Select")
    const [race, setRace] = useState("please Select")
    const [level, setLevel] = useState(undefined)
    const [maxHp, setMaxHp] = useState(undefined)
    const [dex, setDex] = useState(undefined)
    const [wis, setWis] = useState(undefined)
    const [con, setCon] = useState(undefined)
    const [int, setInt] = useState(undefined)
    const [str, setStr] = useState(undefined)
    const [cha, setCha] = useState(undefined)
    const [disableCreate, setDisableCreate] = useState(true)

    const [viewClass, setViewClass] = useState(false)
    const [viewRace, setViewRace] = useState(false)
    const [disableButonClass, setDisableButonClass] = useState(true)
    const [disableButonRace, setDisableButonRace] = useState(true)

    const [classList, setClassList] = useState(null)
    const [raceList, setRaceList] = useState(null)
    const [damage, setDamage] = useState('')

    const [player, setPlayer] = useState([])


    useEffect(()=>{
        axios.get('/api/pc')
        .then((response) => {
            return response.data
        }).then((data) => {
            setPlayer(data)
        })
        .catch((error) =>{
          console.log(error);
        });
    },[])


    useEffect(() =>{
        axios.get('/api/classes')
        .then((response) => {
            setClassList(response.data)
            setDisableButonClass(false)
        })
        .catch(function (error) {
          console.log(error);
        });
      },[])

      useEffect(() =>{
        axios.get('/api/races')
        .then((response) => {
            setRaceList(response.data)
            setDisableButonRace(false)
        })
        .catch(function (error) {
          console.log(error);
        });
      },[])


    useEffect(() => {
        if (
            name &&
            playerClass !== "please Select" &&
            race !== "please Select" &&
            level &&
            maxHp && 
            dex &&
            int &&
            cha &&
            str &&
            con &&
            wis
        ) {
            setDisableCreate(false)
        }
    },[
        name,
      playerClass,
      race,
      level,
      maxHp,
      dex,
      int,
      cha,
      str,
      con,
      wis
    ])

    const createPlayerObject = () => {
       return {
        name,
      playerClass,
      race,
      level: Number(level),
      maxHp: Number(maxHp),
      dex: Number(dex),
      int: Number(int),
      cha: Number(cha),
      str: Number(str),
      con: Number(con),
      wis: Number(wis)
    }
}

const postPlayerObject = (object) => {
 return axios
    .post('/api/pc', object)
    .then((response)=> {
      console.log(response)
    })
    .catch((err) => console.log(err))
}


    return  (
    <>
    {player.map((item) => {
        return (<>
        <h1>{item.name}</h1>
        <h2>HP: {item.max_hp}</h2>
        <h2>Class: {item.player_class}</h2>
        <h2>Race: {item.race}</h2>
        <h2>Saving Throws</h2>
        <div>
        <span>DEX: +{item.dex}</span>
        <span>INT: +{item.int}</span>
        <span>CHA: +{item.cha}</span>
        <span>STR: +{item.str}</span>
        <span>CON: +{item.con}</span>
        <span>WIS: +{item.wis}</span>
        </div>
        </>)}
        )}





    <div>
    <h1>Create New Player</h1>
    <h2>Character name: <input type="type" onChange={(e) => {setName(e.target.value)}}></input></h2>
    <h2>Class: {<button 
        onClick={() => setViewClass(true)}
        disabled={disableButonClass}
    >{playerClass}</button>}</h2>
    {viewClass && <ClassDrop 
                    classList={classList}
                    setPlayerClass={setPlayerClass}
                    setViewClass={setViewClass}
                    />}

    <h2>Race: <button 
                onClick={() => setViewRace(true)}
                disabled={disableButonRace}
                >{race}</button></h2>
    {viewRace && <RaceDrop
                    raceList={raceList}
                    setRace={setRace}
                    setViewRace={setViewRace}/>}

    <h2>Level: <input type="type" onChange={(e) => {setLevel(e.target.value)}}></input></h2>
    <h2>Max hp: <input type="number" onChange={(e) => {setMaxHp(e.target.value)}}></input></h2>
    <h2>Saving throws</h2>
    <p> DEX:<input type="number" onChange={(e) => {setDex(e.target.value)}}></input>
        WIS:<input type="number" onChange={(e) => {setWis(e.target.value)}}></input>
        CON:<input type="number" onChange={(e) => {setCon(e.target.value)}}></input>
        INT:<input type="number" onChange={(e) => {setInt(e.target.value)}}></input>
        STR:<input type="number" onChange={(e) => {setStr(e.target.value)}}></input>
        CHA:<input type="number" onChange={(e) => {setCha(e.target.value)}}></input>
    </p>
    <button
    disabled={disableCreate}
    onClick={()=>{
        postPlayerObject(createPlayerObject())
        setPlayer([...player, createPlayerObject()])
    }}
    >Create Player</button>
</div>
        
</>
    )
}
    
    export default Players