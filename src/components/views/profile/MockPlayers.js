import "../campaign/player.css";
import "../../../App.css";

const CombatPlayers = (props) => {
  const { player } = props;

  return (
    <div className='CombatPlayer'>
      {player.length !== 0 ? (
        player.map((item) => {
          return (
            <div className='pc'>
              <div className='top'>
                <h2 className='pcName'>
                  Name: <span id='pcName'>{item.name}</span>
                </h2>
                <h2 className='pcHp'>
                  HP: <span className='hp'>{item.max_hp}</span>
                </h2>
              </div>

              <div className='mid'>
                <div className='levelDiv'>
                  <h1 className='level'>Level {item.level}:</h1>
                  <h2 className='pcClass'>{item.player_class} </h2>
                </div>
                <div className='levelDiv'>
                  <h1 className='level'>Race:</h1>
                  <h2 className='pcClass'>{item.race}</h2>
                </div>
              </div>

              <div className='stats'>
                <p className='pcSave'>Saving Throws</p>
                <span className='statsNum'>
                  DEX: <br />+{item.dex}
                </span>
                <span className='statsNum'>
                  INT: <br />+{item.int}
                </span>
                <span className='statsNum'>
                  CHA: <br />+{item.cha}
                </span>
                <span className='statsNum'>
                  STR: <br />+{item.str}
                </span>
                <span className='statsNum'>
                  CON: <br />+{item.con}
                </span>
                <span className='statsNum'>
                  WIS: <br />+{item.wis}
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <h1 className='title'>No Players Added Yet</h1>
      )}
    </div>
  );
};

export default CombatPlayers;
