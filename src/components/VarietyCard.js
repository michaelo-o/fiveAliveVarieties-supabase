import {Link} from "react-router-dom"
import supabase from '../config/supabaseClient'


const VarietyCard = ({ variety, onDelete }) => {

    const handleDelete = async () => {
const {data, error} = await supabase
.from('five-alive-varieties')
.delete() //to delete, obviously
.eq('id', variety.id) //to delete the record where its id is EQuals to the id of the particular variety
.select()

if (error) {
    console.log(error)
}
if (data) {
    console.log(data)
    // onDelete(variety.id) updating local state
}
    }
    return (
        <>
            <div className="variety-card">
                <h3>{variety.title}</h3>
                <p>{variety.ingredients}</p>
                <div className="rating">{variety.rating}</div>
                {/* <p>Date Added:{variety.created_at}</p> */}
                <div className="buttons">
                    <Link to={'/' + variety.id}><i className="material-icons">edit</i></Link>  {/* this adds the id to the link of the particular variety  */}
                    <i className="material-icons" onClick={handleDelete}>delete</i>
                </div>
            </div>
        </>
    );
}

export default VarietyCard;