import "../Encounter/prep/displayMonster.css";
import { useOutletContext } from "react-router-dom";

const TestMonster = () => {
  const monsterObj = {
    index: "adult-black-dragon",
    name: "Adult Black Dragon",
    size: "Huge",
    type: "dragon",
    alignment: "chaotic evil",
    armor_class: [
      {
        type: "natural",
        value: 19,
      },
    ],
    hit_points: 195,
    hit_dice: "17d12",
    hit_points_roll: "17d12+85",
    speed: {
      walk: "40 ft.",
      fly: "80 ft.",
      swim: "40 ft.",
    },
    strength: 23,
    dexterity: 14,
    constitution: 21,
    intelligence: 14,
    wisdom: 13,
    charisma: 17,
    proficiencies: [
      {
        value: 7,
        proficiency: {
          index: "saving-throw-dex",
          name: "Saving Throw: DEX",
          url: "/api/proficiencies/saving-throw-dex",
        },
      },
      {
        value: 10,
        proficiency: {
          index: "saving-throw-con",
          name: "Saving Throw: CON",
          url: "/api/proficiencies/saving-throw-con",
        },
      },
      {
        value: 6,
        proficiency: {
          index: "saving-throw-wis",
          name: "Saving Throw: WIS",
          url: "/api/proficiencies/saving-throw-wis",
        },
      },
      {
        value: 8,
        proficiency: {
          index: "saving-throw-cha",
          name: "Saving Throw: CHA",
          url: "/api/proficiencies/saving-throw-cha",
        },
      },
      {
        value: 11,
        proficiency: {
          index: "skill-perception",
          name: "Skill: Perception",
          url: "/api/proficiencies/skill-perception",
        },
      },
      {
        value: 7,
        proficiency: {
          index: "skill-stealth",
          name: "Skill: Stealth",
          url: "/api/proficiencies/skill-stealth",
        },
      },
    ],
    damage_vulnerabilities: [],
    damage_resistances: [],
    damage_immunities: ["acid"],
    condition_immunities: [],
    senses: {
      blindsight: "60 ft.",
      darkvision: "120 ft.",
      passive_perception: 21,
    },
    languages: "Common, Draconic",
    challenge_rating: 14,
    xp: 11500,
    special_abilities: [
      {
        name: "Amphibious",
        desc: "The dragon can breathe air and water.",
      },
      {
        name: "Legendary Resistance",
        desc: "If the dragon fails a saving throw, it can choose to succeed instead.",
        usage: {
          type: "per day",
          times: 3,
          rest_types: [],
        },
      },
    ],
    actions: [
      {
        name: "Multiattack",
        multiattack_type: "actions",
        desc: "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
        actions: [
          {
            action_name: "Frightful Presence",
            count: 1,
            type: "ability",
          },
          {
            action_name: "Bite",
            count: 1,
            type: "melee",
          },
          {
            action_name: "Claw",
            count: 2,
            type: "melee",
          },
        ],
      },
      {
        name: "Bite",
        desc: "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 4 (1d8) acid damage.",
        attack_bonus: 11,
        damage: [
          {
            damage_type: {
              index: "piercing",
              name: "Piercing",
              url: "/api/damage-types/piercing",
            },
            damage_dice: "2d10+6",
          },
          {
            damage_type: {
              index: "acid",
              name: "Acid",
              url: "/api/damage-types/acid",
            },
            damage_dice: "1d8",
          },
        ],
        actions: [],
      },
      {
        name: "Claw",
        desc: "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.",
        attack_bonus: 11,
        damage: [
          {
            damage_type: {
              index: "slashing",
              name: "Slashing",
              url: "/api/damage-types/slashing",
            },
            damage_dice: "2d6+6",
          },
        ],
        actions: [],
      },
      {
        name: "Tail",
        desc: "Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage.",
        attack_bonus: 11,
        damage: [
          {
            damage_type: {
              index: "bludgeoning",
              name: "Bludgeoning",
              url: "/api/damage-types/bludgeoning",
            },
            damage_dice: "2d8+6",
          },
        ],
        actions: [],
      },
      {
        name: "Frightful Presence",
        desc: "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.",
        dc: {
          dc_type: {
            index: "wis",
            name: "WIS",
            url: "/api/ability-scores/wis",
          },
          dc_value: 16,
          success_type: "none",
        },
        actions: [],
      },
      {
        name: "Acid Breath",
        desc: "The dragon exhales acid in a 60-foot line that is 5 feet wide. Each creature in that line must make a DC 18 Dexterity saving throw, taking 54 (12d8) acid damage on a failed save, or half as much damage on a successful one.",
        usage: {
          type: "recharge on roll",
          dice: "1d6",
          min_value: 5,
        },
        dc: {
          dc_type: {
            index: "dex",
            name: "DEX",
            url: "/api/ability-scores/dex",
          },
          dc_value: 18,
          success_type: "half",
        },
        damage: [
          {
            damage_type: {
              index: "acid",
              name: "Acid",
              url: "/api/damage-types/acid",
            },
            damage_dice: "12d8",
          },
        ],
        actions: [],
      },
    ],
    legendary_actions: [
      {
        name: "Detect",
        desc: "The dragon makes a Wisdom (Perception) check.",
      },
      {
        name: "Tail Attack",
        desc: "The dragon makes a tail attack.",
      },
      {
        name: "Wing Attack (Costs 2 Actions)",
        desc: "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
        dc: {
          dc_type: {
            index: "dex",
            name: "DEX",
            url: "/api/ability-scores/dex",
          },
          dc_value: 19,
          success_type: "none",
        },
        damage: [
          {
            damage_type: {
              index: "bludgeoning",
              name: "Bludgeoning",
              url: "/api/damage-types/bludgeoning",
            },
            damage_dice: "2d6+6",
          },
        ],
      },
    ],
    image: "/api/images/monsters/adult-black-dragon.png",
    url: "/api/monsters/adult-black-dragon",
  };

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

export default TestMonster;
