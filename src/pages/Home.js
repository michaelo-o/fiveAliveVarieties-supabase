import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react'

// Use state to store the varieties after fetching them, and also any errors
//use state to fetch it when the component renders

//components
import VarietyCard from '../components/VarietyCard'

const Home = () => {

  const [fetchError, setFetchError] = useState(null)
  const [varieties, setVarieties] = useState(null)


  //Fetching the Data
  useEffect(() => { //cant use Async directly with use effect
    const fetchVarieties = async () => {
      const { data, error } = await supabase
        .from('five-alive-varieties') //from where the data is to be gotten from: the varieties table
        .select() //to get all the data. Not passing any arguments.


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

  })


  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {varieties && (
        <div className="varieties">
          {/* order-by buttons */}
          <div className="variety-grid">
            {varieties.map(variety => (
              <VarietyCard key={variety.id} variety={variety} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home






