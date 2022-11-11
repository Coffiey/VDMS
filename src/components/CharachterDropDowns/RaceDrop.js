import { useEffect, useState } from "react";


const RaceDrop = (props) => {
  const {raceList, setRace, setViewRace} = props;

  return (
    <>
        <ul>
            {raceList.map((raceObj) => {
                return <li onClick={()=> {
                    setRace(raceObj.name)
                    setViewRace(false)
                }}>{raceObj.name}</li>
            })}
        </ul>
    </>
  )

}

export default RaceDrop