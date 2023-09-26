import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Create = () => {

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null) //to catch errors, i.e they do not fill out all the fields

  const handleSubmit = async (e) => {
    e.preventDefault() //prevent the page from refreshing

    if (!title || !ingredients || !rating) { //||-or to make it so they fill all fields
      setFormError('Please fill in all the fields correctly.')
      return      
    }
    const { data, error } = await supabase
      .from('five-alive-varieties')
      .insert([{ title, ingredients, rating }]) //insert the rows of data. An array of rows. The more rows, the more objects. 1 since just 1 row.
    .select() //to return the row of data. Version 2 above

    if (error) {
      console.log(error)
      setFormError('Please fill in all the fields correctly.')
    }
    if (data) {
      console.log(data)
      setFormError(null) //remove the error after data is filled properly
      navigate('/') //to redirect them to the homepage right after it's done
    
    }

  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="ingredients">Ingredients:</label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          max="10"
          min="0"
          // maxLength="2"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Create Variety Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create