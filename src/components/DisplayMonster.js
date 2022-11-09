


const DisplayMonster = (props) => {
const {monsterObj} = props

const getArrayOfKeys = (object) => {
return Object.getOwnPropertyNames(object)
}

const addSpace = (string) => {
    return string.replace("_"," ")
}

console.log(monsterObj)
if (monsterObj) {
    return (
        <div>
    {monsterObj.name && <h1>{monsterObj.name}</h1>}
    {monsterObj.size && <h2>{monsterObj.size}</h2>}
    {monsterObj.type && <p>{monsterObj.type}</p>}
    {monsterObj.alignment && <p>Allignment: {monsterObj.alignment}</p>}
    {monsterObj.armor_class && <p>Armor class: {monsterObj.armor_class}</p>}
    {monsterObj.hit_points && <p>HP: {monsterObj.hit_points}</p>}
    {monsterObj.hit_dice && <p>hit dice: {monsterObj.hit_dice}</p>}
    {monsterObj.hit_points_roll && <p>hit points roll: {monsterObj.hit_points_roll}</p>}
    {monsterObj.speed && 
        <div>
        <h2>movement:</h2>
        {monsterObj.speed.fly && <p>flying: {monsterObj.speed.fly}</p>}
        {monsterObj.speed.walk && <p>Walking: {monsterObj.speed.walk}</p>}
        {monsterObj.speed.swim && <p>Swimming: {monsterObj.speed.swim}</p>}
        </div>
    }
    <h1>Ability Scores</h1>
     {monsterObj.strength && <p>strength: {monsterObj.strength}</p>}
     {monsterObj.dexterity && <p>dexterity: {monsterObj.dexterity}</p>}
     {monsterObj.constitution && <p>constitution: {monsterObj.constitution}</p>}
     {monsterObj.intelligence && <p>intelligence: {monsterObj.intelligence}</p>}
     {monsterObj.wisdom && <p>wisdom: {monsterObj.wisdom}</p>}
     {monsterObj.charisma && <p>charisma: {monsterObj.charisma}</p>}
    <h1>proficiencies</h1>
    <div>{monsterObj.proficiencies.map((item)=>{
        return (
        <p>{item.proficiency.name.includes("Saving Throw") ? 
        item.proficiency.name.slice(item.proficiency.name.length-3,item.proficiency.name.length):
        item.proficiency.name.slice(7)}: +{item.value}</p>
        )
    })}</div>
    {monsterObj.damage_vulnerabilities.length ===0 && <h1>damage vulnerabilities(tofind)</h1>}
    {monsterObj.damage_resistances.length ===0 && <h1>damage resistances(tofind)</h1>}
    {monsterObj.damage_immunities.length !==0 && (
        <div>
    <h1>damage immunities</h1>
    {monsterObj.damage_immunities
    .map((item)=>{
        return (
        <p>{item}</p>
        )}
    )}
        </div>
    )}
    {monsterObj.condition_immunities.length ===0 && <h1>damage condition immunities(tofind)</h1>}
    {monsterObj.senses && (
        <div>
        <h1>Senses</h1>
        {getArrayOfKeys(monsterObj.senses).map((key)=>{
            return <p>{addSpace(key)}: {monsterObj.senses[key]}</p>
        })}
            </div>
    )}
{monsterObj.languages && <p>languages: {monsterObj.languages}</p>}
{monsterObj.challenge_rating && <p>challenge rating: {monsterObj.challenge_rating}</p>}
{monsterObj.xp && <p>xp: {monsterObj.xp}</p>}
{monsterObj.special_abilities && (
        <div>
        <h1>Sspecial abilities</h1>
        {monsterObj.special_abilities.map((object)=>{
            return (
              <div>
                <h2>{object.name}</h2>
                <p>{object.desc}</p>
                {object.usage && <p>{object.usage.times} times {object.usage.type}</p>}
              </div>
                    )
        })}
            </div>
    )}
<h1>Actions</h1>
<h1>THIS NEEDS TO BE CODED NEXT</h1>
    </div>
) 
}
}

export default DisplayMonster