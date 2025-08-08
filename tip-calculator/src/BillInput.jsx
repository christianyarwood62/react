export default function BillInput({text, value, onChange}) {

    return (
        <div>
            <span>
                {text}
            </span>
            <input type="number" value={value} onChange={onChange}>
                
            </input>
        </div>
    )
}