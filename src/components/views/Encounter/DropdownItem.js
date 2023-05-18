import axios from "axios";
import { useEffect, useState } from "react";

const DropdownItem = (props) => {
  const { dropdown, setMonsterObj2, setSearch } = props;

  const [monsterID, setMonsterID] = useState();

  useEffect(() => {
    // if (monsterID) {
    //   axios
    //     .get(`/api/monster/object?url=${monsterID}`)
    //     .then((response) => {
    //       setMonsterObj2(response.data);
    //     })
    //     .catch(function (error) {});
    // }
  }, [monsterID]);

  return dropdown.map((monster) => {
    return (
      <li>
        <p
          className='monsterButton'
          onClick={() => {
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
