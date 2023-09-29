
export default function Initials({ color, firstName, lastName, size }) {
    return(
        <div className='initials m-1' style={{backgroundColor: color, fontSize: size}}>{firstName[0]}{lastName[0]}</div>
    )
}