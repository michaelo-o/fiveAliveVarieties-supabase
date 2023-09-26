import {Link} from "react-router-dom"

const VarietyCard = ({ variety }) => {
    return (
        <>
            <div className="variety-card">
                <h3>{variety.title}</h3>
                <p>{variety.ingredients}</p>
                <div className="rating">{variety.rating}</div>
                {/* <p>Date Added:{variety.created_at}</p> */}
                <div className="buttons">
                    <Link to={'/' + variety.id}> <i className="material-icons">edit</i> </Link>  {/* this adds the id to the link of the particular variety  */}
                </div>
            </div>
        </>
    );
}

export default VarietyCard;