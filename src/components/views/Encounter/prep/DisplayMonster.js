import "./displayMonster.css";
import { useOutletContext } from "react-router-dom";

const DisplayMonster = () => {
  const { monsterObj } = useOutletContext();

  const getArrayOfKeys = (object) => {
    return Object.getOwnPropertyNames(object);
  };

  const addSpace = (string) => {
    return string.replace("_", " ");
  };

  if (monsterObj) {
    return (
      <div className='div'>
        <div
          class='break'
          id='join'
        >
          {monsterObj.name && <h1 className='name'>{monsterObj.name}</h1>}
          {monsterObj.size && (
            <p className='info'>
              {monsterObj?.size} {monsterObj?.type}, {monsterObj?.alignment}
            </p>
          )}
        </div>
        <div className='break'>
          {monsterObj.armor_class && (
            <p className='info'>
              <span className='bold'>Armor class:</span>{" "}
              {monsterObj.armor_class[0].value} (
              {monsterObj.armor_class[0].type})
            </p>
          )}
          {monsterObj.hit_points && (
            <p className='info'>
              {" "}
              <span className='bold'>HP:</span> {monsterObj.hit_points} (
              {monsterObj?.hit_points_roll})
            </p>
          )}
          {monsterObj.speed && (
            <p className='info'>
              <span className='bold'>speed:</span> {monsterObj?.speed.walk}
              {monsterObj?.speed?.fly && (
                <span> fly {monsterObj?.speed?.fly},</span>
              )}
              {monsterObj?.speed?.swim && (
                <span> swim {monsterObj?.speed?.swim}</span>
              )}
            </p>
          )}
        </div>
        <div
          className='break'
          id='ability_score'
        >
          {monsterObj.strength && (
            <div className='abil'>
              <div className='info'>
                <span className='bold'>STR:</span>
              </div>
              <div className='info'>
                {" "}
                {monsterObj.strength} (
                {Math.floor((monsterObj.strength - 10) / 2) > 0 && (
                  <span>+</span>
                )}
                {Math.floor((monsterObj.strength - 10) / 2)})
              </div>
            </div>
          )}
          {monsterObj.dexterity && (
            <div className='abil'>
              <div className='info'>
                <span className='bold'>DEX:</span>
              </div>
              <div className='info'>
                {" "}
                {monsterObj.dexterity} (
                {Math.floor((monsterObj.dexterity - 10) / 2) > 0 && (
                  <span>+</span>
                )}
                {Math.floor((monsterObj.dexterity - 10) / 2)})
              </div>
            </div>
          )}
          {monsterObj.constitution && (
            <div className='abil'>
              <div className='info'>
                <span className='bold'>CON:</span>
              </div>
              <div className='info'>
                {" "}
                {monsterObj.constitution} (
                {Math.floor((monsterObj.constitution - 10) / 2) > 0 && (
                  <span>+</span>
                )}
                {Math.floor((monsterObj.constitution - 10) / 2)})
              </div>
            </div>
          )}
          {monsterObj.intelligence && (
            <div className='abil'>
              <div className='info'>
                <span className='bold'>INT:</span>
              </div>
              <div className='info'>
                {" "}
                {monsterObj.intelligence} (
                {Math.floor((monsterObj.intelligence - 10) / 2) > 0 && (
                  <span>+</span>
                )}
                {Math.floor((monsterObj.intelligence - 10) / 2)})
              </div>
            </div>
          )}
          {monsterObj.wisdom && (
            <div className='abil'>
              <div className='info'>
                <span className='bold'>WIS:</span>
              </div>
              <div className='info'>
                {" "}
                {monsterObj.wisdom} (
                {Math.floor((monsterObj.wisdom - 10) / 2) > 0 && <span>+</span>}
                {Math.floor((monsterObj.wisdom - 10) / 2)})
              </div>
            </div>
          )}
          {monsterObj.charisma && (
            <div className='abil'>
              <div className='info'>
                <span className='bold'>CHA:</span>
              </div>
              <div className='info'>
                {" "}
                {monsterObj.charisma} (
                {Math.floor((monsterObj.charisma - 10) / 2) > 0 && (
                  <span>+</span>
                )}
                {Math.floor((monsterObj.charisma - 10) / 2)})
              </div>
            </div>
          )}
        </div>{" "}
        <div className='break'>
          <p className='info'>
            <span className='bold'>Saving Throws: </span>
            {monsterObj?.proficiencies.map((item) => {
              return (
                <span>
                  {item.proficiency.name.includes("Saving Throw") && (
                    <span>
                      {item.proficiency.name.slice(
                        item.proficiency.name.length - 3,
                        item.proficiency.name.length
                      )}
                      : {item.value > 0 && <span>+</span>}
                      {item.value},{" "}
                    </span>
                  )}
                </span>
              );
            })}
          </p>
          <p className='info'>
            <span className='bold'>Skills: </span>
            {monsterObj?.proficiencies.map((item) => {
              return (
                <span>
                  {item.proficiency.name.includes("Skill") && (
                    <span>
                      {item.proficiency.name.slice(7)}: +{item.value},{" "}
                    </span>
                  )}
                </span>
              );
            })}
          </p>
          {monsterObj.damage_vulnerabilities.length !== 0 && (
            <p className='info'>
              <span className='bold'>damage vulnerabilities:</span>
              {monsterObj?.damage_vulnerabilities.map((item) => {
                return <span> {item}</span>;
              })}
            </p>
          )}
          {monsterObj.damage_resistances.length !== 0 && (
            <p className='info'>
              <span className='bold'>damage resistances:</span>
              {monsterObj?.damage_resistances.map((item) => {
                return <span> {item}</span>;
              })}
            </p>
          )}
          {monsterObj.damage_immunities.length !== 0 && (
            <p className='info'>
              <span className='bold'>damage immunities:</span>
              {monsterObj?.damage_immunities.map((item) => {
                return <span> {item}</span>;
              })}
            </p>
          )}
          {monsterObj.condition_immunities.length !== 0 && (
            <p className='info'>
              <span className='bold'>condition immunities:</span>
              {monsterObj?.condition_immunities.map((item) => {
                return <span> {item.name}</span>;
              })}
            </p>
          )}
          {monsterObj.senses && (
            <p className='info'>
              <span className='bold'>Senses:</span>
              {getArrayOfKeys(monsterObj?.senses).map((key) => {
                return (
                  <span>
                    {" "}
                    {addSpace(key)}: {monsterObj?.senses[key]}
                  </span>
                );
              })}
            </p>
          )}
          {monsterObj.languages && (
            <p className='info'>
              <span className='bold'>languages: </span>
              {monsterObj?.languages}
            </p>
          )}
          {typeof monsterObj.challenge_rating === "number" && (
            <p className='info'>
              <span className='bold'>challenge rating: </span>
              {monsterObj.challenge_rating} ({monsterObj.xp})
            </p>
          )}
        </div>
        <div className='break'>
          {monsterObj.special_abilities && (
            <div>
              {monsterObj.special_abilities.map((object) => {
                return (
                  <p>
                    <span className='bold'>{object.name} </span>
                    {object.usage && (
                      <span>
                        ({object.usage.times}
                        {object.usage.type.slice(4)})
                      </span>
                    )}
                    : {object.desc}
                  </p>
                );
              })}
            </div>
          )}
        </div>
        <h3 className='name'>Actions</h3>
        <div className='attacks'>
          {monsterObj.actions && (
            <div>
              {monsterObj.actions[0].name === "Multiattack" ? (
                <>
                  <p>
                    <span className='bold'>{monsterObj.actions[0].name}:</span>{" "}
                    {monsterObj.actions[0].desc}
                  </p>
                  {monsterObj.actions.slice(1).map((attack) => {
                    return (
                      <p>
                        {attack.name && (
                          <span className='bold'>
                            {attack.name}
                            {attack.attack_bonus && (
                              <span> (+{attack.attack_bonus})</span>
                            )}
                            {attack.dc && (
                              <span>
                                {" "}
                                ({attack.dc.dc_type.index}: {attack.dc.dc_value}
                                )
                              </span>
                            )}
                            :
                          </span>
                        )}
                        {attack.desc && (
                          <span>
                            <br />
                            {attack.desc}
                          </span>
                        )}
                        {attack.usage && (
                          <>
                            <p>
                              {attack.usage.type} ({attack.usage.dice}):{" "}
                              {attack.usage.min_value} or higher
                            </p>
                          </>
                        )}
                      </p>
                    );
                  })}
                </>
              ) : (
                <>
                  {monsterObj.actions.map((attack) => {
                    return (
                      <p>
                        {attack.name && (
                          <span className='bold'>
                            {attack.name}
                            {attack.attack_bonus && (
                              <span> (+{attack.attack_bonus})</span>
                            )}
                            {attack.dc && (
                              <span>
                                {" "}
                                ({attack.dc.dc_type.index}: {attack.dc.dc_value}
                                )
                              </span>
                            )}
                            :
                          </span>
                        )}
                        {attack.desc && (
                          <span>
                            <br />
                            {attack.desc}
                          </span>
                        )}
                        {attack.usage && (
                          <>
                            <p>
                              {attack.usage.type} ({attack.usage.dice}):{" "}
                              {attack.usage.min_value} or higher
                            </p>
                          </>
                        )}
                      </p>
                    );
                  })}
                </>
              )}
            </div>
          )}
        </div>
        {monsterObj.legendary_actions.length !== 0 && (
          <>
            <h3 className='name'>Lengendary Actions</h3>
            <div
              className='attacks'
              id='legendary_actions'
            >
              <p id='legendary_actions'>
                {monsterObj.name}s can take 3 legendary actions, choosing from
                the options below. Only one legendary action option can be used
                at a time and only at the end of another creature’s turn.{" "}
                {monsterObj.name} regains spent legendary actions at the start
                of their turn.
              </p>
              {monsterObj.legendary_actions.map((action) => {
                return (
                  <p>
                    <span class='bold'>{action.name}:</span> {action.desc}
                  </p>
                );
              })}
            </div>
          </>
        )}
        <div id='bottom'></div>
      </div>
    );
  } else {
    return <h1 id='nothing'>No Monster Selected</h1>;
  }
};

export default DisplayMonster;
