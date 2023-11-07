import styles from './Register.module.css';
import InputField from "./InputField"
import * as postService from '../service/postService'
import { useState } from "react"

export default function CreatePost() {
    const [inputFields, setInputFields] = useState({
        country: '',
        city: '',
        imageUrl: '',
        cost: 0,
        description: '',
    })

    const handleChange = (e) => {
        setInputFields({...inputFields, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = await postService.createPost(inputFields)
        console.log(post);
    }   
    return (
        <>
        <form onSubmit={handleSubmit} className={styles.login}>
          <h2>Create Post</h2>
        <InputField
        label="country"
        title="Country"
        type="text"
        name="country"
        placeholder="Country"
        id="country"
        value={inputFields.country}
        onChange={handleChange}
      />
      <InputField
        label="city"
        title="city"
        type="text"
        name="city"
        placeholder="City"
        id="city"
        value={inputFields.city}
        onChange={handleChange}
      /> 
       <InputField
        label="imageUrl"
        title="Image"
        type="text"
        name="imageUrl"
        placeholder="Image"
        id="imageUrl"
        value={inputFields.imageUrl}
        onChange={handleChange}
      /> 
       <InputField
        label="cost"
        title="Cost"
        type="number"
        name="cost"
        placeholder= '0'
        id="cost"
        value={inputFields.cost}
        onChange={handleChange}
      /> 
      <label htmlFor="description">Description</label>
      <textarea name="description" id="description" cols="30" rows="10"></textarea>
      <button type="submit" className={styles.button}>
          Create Post
        </button>
      </form>
      </>
    )
}