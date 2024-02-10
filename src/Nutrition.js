
export const Nutrition = ({ label, quantity, unit }) => {
    return (
        <div className="flexbox">
            <ul className="nutrition">
                <li>{label}</li>
            </ul>
            <ul className="nutrition">
                <li className="value">{Math.round(quantity)} {unit}</li>
            </ul>
        </div>
    )
}