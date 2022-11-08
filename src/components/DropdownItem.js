
const DropdownItem = (props) => {
const {list} = props
console.log(list)
return list.map((monster) => {
    return <li>{monster}</li>
})
}

export default DropdownItem