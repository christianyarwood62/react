export default function Output({billValue, percentageValue}) {
    if (billValue!=='') {
        return (
        
            <div>
                You pay {(billValue + (billValue * (percentageValue / 100)))} (£{billValue} + {percentageValue}%)
            </div>
        )
    }
    
}