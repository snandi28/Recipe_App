import React,{useState,useEffect} from 'react';
import './App.css';
import Recipe from './Recipe';

const App=()=>{
  const APP_ID= "5862d1f4";
  const APP_KEY = "f7d5450f9cffda1443fb7a59d86ca159";

const [recipes,setRecipes]=useState([]);
const [search,setSearch]=useState('');
const [query,setQuery]=useState('chicken');
useEffect(()=>{
  getRecipes();
},[query]);


const getRecipes= async ()=>{
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data= await response.json();
    setRecipes(data.hits);
    console.log(data);
}
 const updateSearch=e=>{
   setSearch(e.target.value);
 };
 const updateChange=e=>{
   e.preventDefault();
   setQuery(search);
   sdtSearch('');
 };
  return(
    <div className="App">
        <form onSubmit={updateChange} className="search-form">
          <input className="search-input" type="text" value={search} onChange={updateSearch}/>
          <button className="search-button" type="submit">
              Search
          </button>
        </form>
        <div className='recipe'>
        {recipes.map(recipe=>(
          <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}/>
        ))}
        </div>
    </div>
  );
};

export default App;
