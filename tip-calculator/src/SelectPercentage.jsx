export default function SelectPercentage({text, onChange}) {
    
    return (
        <div>
            <span>
                {text}
            </span>
            <select onChange={onChange}>
                <option value='0'>0%</option>
                <option value='5'>5%</option>
                <option value='10'>10%</option>
            </select>
        </div>
    )
}