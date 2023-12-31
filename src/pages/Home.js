import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { FaLinkedin, FaGithub } from "react-icons/fa";


// Use state to store the varieties after fetching them, and also any errors
//use state to fetch it when the component renders

//components
import VarietyCard from '../components/VarietyCard'

const Home = () => {

  const [fetchError, setFetchError] = useState(null)
  const [varieties, setVarieties] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')


  const handleDelete = (id) => { //to update local state when a delete request is sent and a smoothie is deleted. 
    setVarieties(prevVarieties => {
      return prevVarieties.filter(va => va.id !== id)
    })
  }

  //Fetching the Data
  useEffect(() => { //can't use Async directly with use effect
    const fetchVarieties = async () => {
      const { data, error } = await supabase
        .from('five-alive-varieties') //from where the data is to be gotten from: the varieties table
        .select() //to get all the data. Not passing any arguments.
        .order(orderBy) //pass in the field we want to order the data by. Also make it ascending or descending order false:- {ascending: false}.

      if (error) {
        setFetchError('Could not Fetch the Varieties')
        setVarieties(null) //in case we had a previous value, and then there's an error, to reset them so error can show.
        console.log(error)
      }
      if (data) {
        setVarieties(data)
        setFetchError(null)
      }
    }
    fetchVarieties() //call the function

  }, [orderBy]) //no dependencies so it always refetches when there's a change


  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {varieties && (
        <div className="varieties">
          <h3>Random Five Alive Varieties CRUD app. Feel free to add whatever you feel like. Also, the colour scheme is simply a result of me messing around with the five alive colour scheme.</h3>
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
          </div>
          <div className="variety-grid">
            {varieties.map(variety => (
              <VarietyCard key={variety.id} variety={variety}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}

      <div className="attribution">
        <h4><em>Created By:</em> &#160; Michael Okwuosah
          <Link to="https://github.com/michaelo-o" target='_blank' className="attrfootlink"><FaGithub /></Link>
          <Link to="https://www.linkedin.com/in/michael-okwuosah/" target='_blank' className="attrfootlink"><FaLinkedin /></Link></h4>
      </div>
    </div>
  )
}


export default Home






