import {useParams, useNavigate} from 'react-router-dom'
// to extract the id
import { useEffect, useState } from 'react'
import supabase from '../config/supabaseClient'


const Update = () => {
  const { id } = useParams() //this is invoked to grab the id parameter inside the app component
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [rating, setRating] = useState('')

  useEffect(() => { //to fetch the variety the instant it loads up
    const fetchVariety = async () => {
      
const {data, error} = await supabase
.from('five-alive-varieties')
.select() //grabs all varieties
.eq('id', id) //we only want to select the entry where the first argument's column, is equal to the second argument
.single() //just return it on its own, without an array or object
   

    if (error) {
      navigate('/', {replace: true}) //second argument replaces the current route with homepage
    }

  if (data){
        setTitle(data.title)
        setIngredients(data.ingredients)
        setRating(data.rating) //sets the title, ingredients and rating as the data we got back
        // console.log(data);
  }

   }
fetchVariety()
  }, [id, navigate]) //decleare thos dependencies
  

  return (
    <div className="page update">
      <div className="page create">
      <form>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Ingredients:</label>
        <textarea 
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update Variety Recipe</button>
      </form>
    </div>
    </div>
  )
}

export default Update