import axios from "axios";
import "./css/displayMonster.css";

const DisplayMonster = (props) => {
  const { monsterObj } = props;

  const getArrayOfKeys = (object) => {
    return Object.getOwnPropertyNames(object);
  };

  const addSpace = (string) => {
    return string.replace("_", " ");
  };

  if (monsterObj) {
    console.log(monsterObj)
    return (
      <div className="div">
        {monsterObj.name && <h1>{monsterObj.name}</h1>}
        {monsterObj.size && <h2>{monsterObj.size}</h2>}
        {monsterObj.type && <p>{monsterObj.type}</p>}
        {monsterObj.alignment && <p>Allignment: {monsterObj.alignment}</p>}
        {monsterObj?.armor_class && <p>Armor class: {monsterObj.armor_class.value}</p>}
        {monsterObj.hit_points && <p>HP: {monsterObj.hit_points}</p>}
        {monsterObj.hit_dice && <p>hit dice: {monsterObj.hit_dice}</p>} 
        {monsterObj.hit_points_roll && (
          <p>hit points roll: {monsterObj?.hit_points_roll}</p>
        )}
        {monsterObj.speed && (
          <div>
            <h2>movement:</h2>
            <div>
              {getArrayOfKeys(monsterObj?.speed).map((key) => {
                return (
                  <p>
                    {addSpace(key)}ing: {monsterObj?.speed[key]}
                  </p>
                );
              })}
            </div>
          </div>
        )}
        <h1>Ability Scores</h1>
        {monsterObj.strength && <p>strength: {monsterObj.strength}</p>}
        {monsterObj.dexterity && <p>dexterity: {monsterObj.dexterity}</p>}
        {monsterObj.constitution && (
          <p>constitution: {monsterObj.constitution}</p>
        )}
        {monsterObj.intelligence && (
          <p>intelligence: {monsterObj.intelligence}</p>
        )}
        {monsterObj.wisdom && <p>wisdom: {monsterObj.wisdom}</p>}
        {monsterObj.charisma && <p>charisma: {monsterObj.charisma}</p>}
        <h1>proficiencies</h1>
        <div>
          {monsterObj?.proficiencies.map((item) => {
            return (
              <p>
                {item.proficiency.name.includes("Saving Throw")
                  ? item.proficiency.name.slice(
                      item.proficiency.name.length - 3,
                      item.proficiency.name.length
                    )
                  : item.proficiency.name.slice(7)}
                : +{item.value}
              </p>
            );
          })}
        </div>
        {monsterObj.damage_vulnerabilities.length === 0 && (
          <h1>damage vulnerabilities(tofind)</h1>
        )}
        {monsterObj.damage_resistances.length === 0 && (
          <h1>damage resistances(tofind)</h1>
        )}
        {monsterObj.damage_immunities.length !== 0 && (
          <div>
            <h1>damage immunities</h1>
            {monsterObj?.damage_immunities.map((item) => {
              return <p>{item}</p>;
            })}
          </div>
        )}
        {monsterObj.condition_immunities.length === 0 && (
          <h1>damage condition immunities(tofind)</h1>
        )}
        {monsterObj.senses && (
          <div>
            <h1>Senses</h1>
            {getArrayOfKeys(monsterObj?.senses).map((key) => {
              return (
                <p>
                  {addSpace(key)}: {monsterObj?.senses[key]}
                </p>
              );
            })}
          </div>
        )}
        {monsterObj.languages && <p>languages: {monsterObj?.languages}</p>}
        {typeof monsterObj.challenge_rating === "number" && (
          <p>challenge rating: {monsterObj.challenge_rating}</p>
        )}
        {monsterObj.xp && <p>xp: {monsterObj.xp}</p>}
        {monsterObj.special_abilities && (
          <div>
            <h1>Sspecial abilities</h1>
            {monsterObj.special_abilities.map((object) => {
              return (
                <div>
                  <h2>{object.name}</h2>
                  <p>{object.desc}</p>
                  {object.usage && (
                    <p>
                      {object.usage.times} times {object.usage.type}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <h1>Actions</h1>
        {monsterObj.actions && (
          <div>
            {monsterObj.actions[0].name === "Multiattack" ? (
              <>
                <h2>{monsterObj.actions[0].name}</h2>
                <p>{monsterObj.actions[0].desc}</p>
                {monsterObj.actions.slice(1).map((attack) => {
                  return (
                    <>
                      {attack.name && <h3>{attack.name}</h3>}
                      {attack.desc && <p>{attack.desc}</p>}
                      {attack.attack_bonus && (
                        <p>attack bonus: +{attack.attack_bonus}</p>
                      )}
                      {attack.dc && (
                        <>
                          <p>
                            saving throw:
                            {attack.dc.dc_type.index === "wis" && (
                              <span> {attack.dc.dc_type.index}dom</span>
                            )}
                            {attack.dc.dc_type.index === "int" && (
                              <span> {attack.dc.dc_type.index}elegence</span>
                            )}
                            {attack.dc.dc_type.index === "cha" && (
                              <span> {attack.dc.dc_type.index}risma</span>
                            )}
                            {attack.dc.dc_type.index === "str" && (
                              <span> {attack.dc.dc_type.index}ength</span>
                            )}
                            {attack.dc.dc_type.index === "con" && (
                              <span> {attack.dc.dc_type.index}stitution</span>
                            )}
                            {attack.dc.dc_type.index === "dex" && (
                              <span> {attack.dc.dc_type.index}terity</span>
                            )}
                            <br />
                            save dc: {attack.dc.dc_value}
                          </p>
                        </>
                      )}
                      {attack.usage && (
                        <>
                          <p>
                            {attack.usage.type}
                            <br />
                            {attack.usage.dice}: must role a{" "}
                            {attack.usage.min_value} or higher
                          </p>
                        </>
                      )}
                    </>
                  );
                })}
              </>
            ) : (
              <>
                {monsterObj.actions.map((attack) => {
                  return (
                    <>
                      {attack.name && <h3>{attack.name}</h3>}
                      {attack.desc && <p>{attack.desc}</p>}
                      {attack.attack_bonus && (
                        <p>attack bonus: +{attack.attack_bonus}</p>
                      )}
                      {attack.dc && (
                        <>
                          <p>
                            saving throw:
                            {attack.dc.dc_type.index === "wis" && (
                              <span> {attack.dc.dc_type.index}dom</span>
                            )}
                            {attack.dc.dc_type.index === "int" && (
                              <span> {attack.dc.dc_type.index}elegence</span>
                            )}
                            {attack.dc.dc_type.index === "cha" && (
                              <span> {attack.dc.dc_type.index}risma</span>
                            )}
                            {attack.dc.dc_type.index === "str" && (
                              <span> {attack.dc.dc_type.index}ength</span>
                            )}
                            {attack.dc.dc_type.index === "con" && (
                              <span> {attack.dc.dc_type.index}stitution</span>
                            )}
                            {attack.dc.dc_type.index === "dex" && (
                              <span> {attack.dc.dc_type.index}terity</span>
                            )}
                            <br />
                            save dc: {attack.dc.dc_value}
                          </p>
                        </>
                      )}
                      {attack.usage && (
                        <>
                          <p>
                            {attack.usage.type}
                            <br />
                            {attack.usage.dice}: must role a{" "}
                            {attack.usage.min_value} or higher
                          </p>
                        </>
                      )}
                    </>
                  );
                })}
              </>
            )}
          </div>
        )}
        {monsterObj.legendary_actions && (
          <>
            <h2>Lengendary Actions</h2>
            <p>
              {monsterObj.name}s can take 3 legendary actions, choosing from the
              options below. Only one legendary action option can be used at a
              time and only at the end of another creature’s turn. {monsterObj.name} 
              regains spent legendary actions at the start of their turn.
            </p>
            {monsterObj.legendary_actions.map((action) => {
              return (
                <p>
                  {action.name}: {action.desc}
                </p>
              );
            })}
          </>
        )}
      </div>
    );
  }
};

export default DisplayMonster;
