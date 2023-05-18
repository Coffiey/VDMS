import "./classDrop.css";

import { useEffect, useState } from "react";

const RaceDrop = (props) => {
  const { raceList, setRace, setViewRace } = props;

  return (
    <>
      <ul className='list'>
        {raceList.map((raceObj) => {
          return (
            <li
              className='classes'
              onClick={() => {
                setRace(raceObj.name);
                setViewRace(false);
              }}
            >
              {raceObj.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default RaceDrop;
