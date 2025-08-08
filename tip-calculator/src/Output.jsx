export default function Output({billValue, percentageValue, friendPercentageValue}) {
    if (billValue===0) {
        return
    } else if (billValue!=='') {
        return (
            <div>
                You pay £{(billValue + (billValue * (((percentageValue + friendPercentageValue) / 2) / 100)))} (£{billValue} + £{(percentageValue + friendPercentageValue) / 2})
            </div>
        )
    }
    
}