import axios from 'axios';
import { useEffect, useState } from "react"

const DropdownItem = (props) => {
const {dropdown, setMonsterObj, setSearch} = props

const [monsterID, setMonsterID]=useState()

useEffect(()=>{
        axios.get(`/api/monster/object?url=${monsterID}`)
    .then((response) => {
        setMonsterObj(response.data) 
    })
    .catch(function (error) {
      console.log(error);
    });
},[monsterID])

return dropdown.map((monster) => {
    return <li><button 
                    className="monsterButton"
                    onClick={()=> {
                        setMonsterID(monster.url)
                        setSearch("")
                    }}>{monster.name}</button></li>
})
}

export default DropdownItem