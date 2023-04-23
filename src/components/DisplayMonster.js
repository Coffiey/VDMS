import axios from "axios";
import "./css/displayMonster.css";
import monster from "./test";
import { useState, useEffect } from "react";

const DisplayMonster = (props) => {
  const { monsterObj, setmonsterObj } = props;

  useEffect(() => {
    setmonsterObj(monster);
    console.log(monster);
  }, []);

  const getArrayOfKeys = (object) => {
    return Object.getOwnPropertyNames(object);
  };

  const addSpace = (string) => {
    return string.replace("_", " ");
  };

  if (monsterObj) {
    console.log(monsterObj);
    return (
      <div className="div">
        <div class="break">
          {monsterObj.name && <h1 id="name">{monsterObj.name}</h1>}
          {monsterObj.size && (
            <p id="size">
              {monsterObj?.size} {monsterObj?.type}, {monsterObj?.alignment}
            </p>
          )}
        </div>
        <div class="break">
          {monsterObj.armor_class && (
            <p id="armor_class">
              Armor class: {monsterObj.armor_class[0].value} (
              {monsterObj.armor_class[0].type})
            </p>
          )}
          {monsterObj.hit_points && (
            <p id="hp">
              {" "}
              HP: {monsterObj.hit_points} ({monsterObj?.hit_points_roll})
            </p>
          )}
          {monsterObj.speed && (
            <p>
              <span>speed:</span> {monsterObj?.speed.walk}
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
              <div>STR:</div>
              <div>
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
              <div>DEX:</div>
              <div>
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
              <div>CON:</div>
              <div>
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
              <div>INT:</div>
              <div>
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
              <div>WIS:</div>
              <div>
                {" "}
                {monsterObj.wisdom} (
                {Math.floor((monsterObj.wisdom - 10) / 2) > 0 && <span>+</span>}
                {Math.floor((monsterObj.wisdom - 10) / 2)})
              </div>
            </div>
          )}
          {monsterObj.charisma && (
            <div class="abil">
              <div>CHA:</div>
              <div>
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
          <p>
            Saving Throws:{" "}
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
          <p>
            Skills:{" "}
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
            <p>
              damage vulnerabilities:
              {monsterObj?.damage_vulnerabilities.map((item) => {
                return <span> {item}</span>;
              })}
            </p>
          )}
          {monsterObj.damage_resistances.length !== 0 && (
            <p>
              damage resistances:
              {monsterObj?.damage_resistances.map((item) => {
                return <span> {item}</span>;
              })}
            </p>
          )}
          {monsterObj.damage_immunities.length !== 0 && (
            <p>
              damage immunities:
              {monsterObj?.damage_immunities.map((item) => {
                return <span> {item}</span>;
              })}
            </p>
          )}
          {monsterObj.condition_immunities.length !== 0 && (
            <p>
              condition immunities:
              {monsterObj?.condition_immunities.map((item) => {
                return <span> {item}</span>;
              })}
            </p>
          )}
          {monsterObj.senses && (
            <p>
              Senses:
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
          {monsterObj.languages && <p>languages: {monsterObj?.languages}</p>}
          {typeof monsterObj.challenge_rating === "number" && (
            <p>
              challenge rating: {monsterObj.challenge_rating} ({monsterObj.xp})
            </p>
          )}
        </div>
        <div class="break">
          {monsterObj.special_abilities && (
            <div>
              {monsterObj.special_abilities.map((object) => {
                return (
                  <p>
                    {object.name}{" "}
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
        <div class="break">
          <h3>Actions</h3>
        </div>
        <div class="attacks">
          {monsterObj.actions && (
            <div>
              {monsterObj.actions[0].name === "Multiattack" ? (
                <>
                  <p>
                    {monsterObj.actions[0].name}: {monsterObj.actions[0].desc}
                  </p>
                  {monsterObj.actions.slice(1).map((attack) => {
                    return (
                      <p>
                        {attack.name && (
                          <span>
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
                          <span>
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
        <h2>Lengendary Actions</h2>
        <div class="attacks">
          {monsterObj.legendary_actions && (
            <>
              <p>
                {monsterObj.name}s can take 3 legendary actions, choosing from
                the options below. Only one legendary action option can be used
                at a time and only at the end of another creature’s turn.{" "}
                {monsterObj.name}{" "}
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
      </div>
    );
  }
};

export default DisplayMonster;
