import "./enemy.css";

const DropdownItem = (props) => {
  const { dropdown, setSearch, setMonsterID, setMonsterName } = props;

  return dropdown.map((monster) => {
    return (
      <li
        className='DropList'
        onClick={() => {
          setMonsterName(monster.name);
          setMonsterID(monster.url);
          setSearch("");
        }}
      >
        {monster.name}
      </li>
    );
  });
};

export default DropdownItem;
