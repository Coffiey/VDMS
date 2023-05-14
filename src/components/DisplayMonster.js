import axios from "axios";
import "./css/displayMonster.css";
import { useState, useEffect } from "react";

const DisplayMonster = (props) => {
  const { monsterObj, setmonsterObj } = props;

  // useEffect(() => {
  //   setmonsterObj(monster);
  // }, []);

  const getArrayOfKeys = (object) => {
    return Object.getOwnPropertyNames(object);
  };

  const addSpace = (string) => {
    return string.replace("_", " ");
  };

  if (monsterObj) {
    return (
      <div className="DisplayMonster">
        <div className="div">
          <div id="top"></div>
          <div class="break">
            {monsterObj.name && <h1 class="name">{monsterObj.name}</h1>}
            {monsterObj.size && (
              <p class="info">
                {monsterObj?.size} {monsterObj?.type}, {monsterObj?.alignment}
              </p>
            )}
          </div>
          <div class="break">
            {monsterObj.armor_class && (
              <p class="info">
                <span class="bold">Armor class:</span>{" "}
                {monsterObj.armor_class[0].value} (
                {monsterObj.armor_class[0].type})
              </p>
            )}
            {monsterObj.hit_points && (
              <p class="info">
                {" "}
                <span class="bold">HP:</span> {monsterObj.hit_points} (
                {monsterObj?.hit_points_roll})
              </p>
            )}
            {monsterObj.speed && (
              <p class="info">
                <span class="bold">speed:</span> {monsterObj?.speed.walk}
                {monsterObj?.speed?.fly && (
                  <span> fly {monsterObj?.speed?.fly},</span>
                )}
                {monsterObj?.speed?.swim && (
                  <span> swim {monsterObj?.speed?.swim}</span>
                )}
              </p>
            )}
          </div>
          <div class="break" id="ability_score">
            {monsterObj.strength && (
              <div class="abil">
                <div class="info">
                  <span class="bold">STR:</span>
                </div>
                <div class="info">
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
              <div class="abil">
                <div class="info">
                  <span class="bold">DEX:</span>
                </div>
                <div class="info">
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
              <div class="abil">
                <div class="info">
                  <span class="bold">CON:</span>
                </div>
                <div class="info">
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
              <div class="abil">
                <div class="info">
                  <span class="bold">INT:</span>
                </div>
                <div class="info">
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
              <div class="abil">
                <div class="info">
                  <span class="bold">WIS:</span>
                </div>
                <div class="info">
                  {" "}
                  {monsterObj.wisdom} (
                  {Math.floor((monsterObj.wisdom - 10) / 2) > 0 && (
                    <span>+</span>
                  )}
                  {Math.floor((monsterObj.wisdom - 10) / 2)})
                </div>
              </div>
            )}
            {monsterObj.charisma && (
              <div class="abil">
                <div class="info">
                  <span class="bold">CHA:</span>
                </div>
                <div class="info">
                  {" "}
                  {monsterObj.charisma} (
                  {Math.floor((monsterObj.charisma - 10) / 2) > 0 && (
                    <span>+</span>
                  )}
                  {Math.floor((monsterObj.charisma - 10) / 2)})
                </div>
              </div>
            )}
          </div>
          <div class="break">
            <p class="info">
              <span class="bold">Saving Throws: </span>
              {monsterObj?.proficiencies.map((item) => {
                return (
                  <span>
                    {item.proficiency.name.includes("Saving Throw") && (
                      <span>
                        {item.proficiency.name.slice(
                          item.proficiency.name.length - 3,
                          item.proficiency.name.length
                        )}
                        : +{item.value},{" "}
                      </span>
                    )}
                  </span>
                );
              })}
            </p>
            <p class="info">
              <span class="bold">Skills: </span>
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
              <p class="info">
                <span class="bold">damage vulnerabilities:</span>
                {monsterObj?.damage_vulnerabilities.map((item) => {
                  return <span> {item}</span>;
                })}
              </p>
            )}
            {monsterObj.damage_resistances.length !== 0 && (
              <p class="info">
                <span class="bold">damage resistances:</span>
                {monsterObj?.damage_resistances.map((item) => {
                  return <span> {item}</span>;
                })}
              </p>
            )}
            {monsterObj.damage_immunities.length !== 0 && (
              <p class="info">
                <span class="bold">damage immunities:</span>
                {monsterObj?.damage_immunities.map((item) => {
                  return <span> {item}</span>;
                })}
              </p>
            )}
            {monsterObj.condition_immunities.length !== 0 && (
              <p class="info">
                <span class="bold">condition immunities:</span>
                {monsterObj?.condition_immunities.map((item) => {
                  return <span> {item}</span>;
                })}
              </p>
            )}
            {monsterObj.senses && (
              <p class="info">
                <span class="bold">Senses:</span>
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
              <p class="info">
                <span class="bold">languages: </span>
                {monsterObj?.languages}
              </p>
            )}
            {typeof monsterObj.challenge_rating === "number" && (
              <p class="info">
                <span class="bold">challenge rating: </span>
                {monsterObj.challenge_rating} ({monsterObj.xp})
              </p>
            )}
          </div>
          <div class="break">
            {monsterObj.special_abilities && (
              <div>
                {monsterObj.special_abilities.map((object) => {
                  return (
                    <p>
                      <span class="bold">{object.name} </span>
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
          <h3 class="name">Actions</h3>
          <div class="attacks">
            {monsterObj.actions && (
              <div>
                {monsterObj.actions[0].name === "Multiattack" ? (
                  <>
                    <p>
                      <span class="bold">{monsterObj.actions[0].name}:</span>{" "}
                      {monsterObj.actions[0].desc}
                    </p>
                    {monsterObj.actions.slice(1).map((attack) => {
                      return (
                        <p>
                          {attack.name && (
                            <span class="bold">
                              {attack.name}
                              {attack.attack_bonus && (
                                <span> (+{attack.attack_bonus})</span>
                              )}
                              {attack.dc && (
                                <span>
                                  {" "}
                                  ({attack.dc.dc_type.index}:{" "}
                                  {attack.dc.dc_value})
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
                            <span class="bold">
                              {attack.name}
                              {attack.attack_bonus && (
                                <span> (+{attack.attack_bonus})</span>
                              )}
                              {attack.dc && (
                                <span>
                                  {" "}
                                  ({attack.dc.dc_type.index}:{" "}
                                  {attack.dc.dc_value})
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
          <h3 class="name">Lengendary Actions</h3>
          <div class="attacks" id="legendary_actions">
            {monsterObj.legendary_actions && (
              <>
                <p id="legendary_actions">
                  {monsterObj.name}s can take 3 legendary actions, choosing from
                  the options below. Only one legendary action option can be
                  used at a time and only at the end of another creature’s turn.{" "}
                  {monsterObj.name} regains spent legendary actions at the start
                  of their turn.
                </p>
                {monsterObj.legendary_actions.map((action) => {
                  return (
                    <p>
                      <span class="bold">{action.name}:</span> {action.desc}
                    </p>
                  );
                })}
              </>
            )}
          </div>
          <div id="bottom"></div>
        </div>
      </div>
    );
  }
};

export default DisplayMonster;
