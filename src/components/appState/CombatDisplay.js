const [monsterObj, setmonsterObj] = useState(null);

const CombatDisplay = () => {
  return (
    <>
      <CombatPlayers />
      <CombatArray
        setmonsterObj={setmonsterObj}
        monsterObj={monsterObj}
      />
      <div className='DisplayMonster'>
        <DisplayMonster
          setmonsterObj={setmonsterObj}
          monsterObj={monsterObj}
        />
      </div>
    </>
  );
};

export default CombatDisplay;
