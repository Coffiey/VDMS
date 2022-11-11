import { useEffect, useState } from "react";


const ClassDrop = (props) => {
    const {classList, setPlayerClass, setViewClass} = props;

      return (
        <>
            <ul>
                {classList.map((classObj) => {
                    return <li onClick={()=> {
                        setPlayerClass(classObj.name)
                        setViewClass(false)
                    }}>{classObj.name}</li>
                })}
            </ul>
        </>
      )
}

export default ClassDrop