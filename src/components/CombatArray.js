import axios from "axios";

import { useEffect, useState } from "react";

const CombatArray = () => {
    
    
const [playerArray,setPlayerArray] = useState([]);
    const [monsterArray,setMonsterArray] = useState([]);
    
    useEffect(()=>{
        axios.get('/api/pc')
        .then((response) => {
            return response.data
        }).then((data) => {
            console.log(data)
        })
        .catch((error) =>{
            console.log(error);
        });
    },[])
   
    return <div>FUCK YOU</div>
}

export default CombatArray