import axios from "axios";
import { useEffect, useState } from "react";

const DropdownItem = (props) => {
  const { dropdown, setSearch, setMonsterID, setMonsterName } = props;

  return dropdown.map((monster) => {
    return (
      <li>
        <p
          className='monsterButton'
          onClick={() => {
            setMonsterName(monster.name);
            setMonsterID(monster.url);
            setSearch("");
          }}
        >
          {monster.name}
        </p>
      </li>
    );
  });
};

export default DropdownItem;
