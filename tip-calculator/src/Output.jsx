export default function Output({value}) {
    if (value!=='') {
        return (
        
            <div>
                You pay £{value}
            </div>
        )
    }
    
}