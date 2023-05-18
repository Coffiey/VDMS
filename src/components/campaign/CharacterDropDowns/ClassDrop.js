import "../../css/classDrop.css";

import { useEffect, useState } from "react";

const ClassDrop = (props) => {
  const { classList, setPlayerClass, setViewClass } = props;

  return (
    <>
      <ul className='list'>
        {classList.map((classObj) => {
          return (
            <li
              className='classes'
              onClick={() => {
                setPlayerClass(classObj.name);
                setViewClass(false);
              }}
            >
              {classObj.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ClassDrop;
