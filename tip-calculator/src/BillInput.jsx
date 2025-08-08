export default function BillInput({text, billValue, onChange}) {

    return (
        <div>
            <span>
                {text}
            </span>
            <input type="number" value={billValue} onChange={onChange} placeholder="Bill value...">
                
            </input>
        </div>
    )
}