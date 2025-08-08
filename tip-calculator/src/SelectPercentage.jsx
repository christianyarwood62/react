export default function SelectPercentage({children, onChange, onReset}) {
    
    return (
        <div>
            <span>
                {children}
            </span>
            <select onChange={onChange} onReset={onReset}>
                <option value='0'>0%</option>
                <option value='5'>5%</option>
                <option value='10'>10%</option>
                <option value='20'>20%</option>
            </select>
        </div>
    )
}