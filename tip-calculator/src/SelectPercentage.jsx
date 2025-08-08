export default function SelectPercentage({text}) {
    return (
        <div>
            <span>
                {text}
            </span>
            <select>
                <option value='0%'>0%</option>
                <option value='5%'>5%</option>
                <option value='10%'>10%</option>
            </select>
        </div>
    )
}