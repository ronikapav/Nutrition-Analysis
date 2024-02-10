import { useState, useEffect } from "react";
import { Nutrition } from "./Nutrition";
import { LoaderPage } from "./LoaderPage";
import './App.css';
import Swal from "sweetalert2";
import { data } from "./data";

function App() {

  const [search, setSearch] = useState();
  const [submitted, setSubmitted] = useState('');
  const [nutrition, setNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false);
  const [images, setImage] = useState(0), { image } = data[images];

  const MY_ID = 'dc43f5c9';
  const MY_KEY = '41004f36187693a52846881269bea7f0';

  const fetchData = async (ingr) => {
    setStateLoader(true);

    const response = await fetch(`https://api.edamam.com/api/nutrition-details?app_id=${MY_ID}&app_key=${MY_KEY}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingr: ingr })
    })

    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setNutrition(data);
    } else {
      setStateLoader(false);
      Swal.fire({
        title: "Error",
        text: "Ingredients entered incorrectly!",
        icon: "error",
        confirmButtonColor: "#434f37",
        iconColor: '#fcd437'
      });
    }
  }

  const myRecipeSearch = e => {
    setSearch(e.target.value);
  }

  const finalSearch = e => {
    e.preventDefault();
    setSubmitted(search);
  }

  useEffect(() => {
    if (submitted !== '') {
      let ingr = submitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  }, [submitted])

  useEffect(() => {
    const interval = setInterval(() => {
      setImage((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    <div className="menu-wrapper">
      <div className="menu-card">
      <img className="cake-pic" src={image} alt="products"/>
      <h1>Nutrition Analysis</h1>
      <span className="dotted-line"></span>
      <form onSubmit={finalSearch}>


    <input type="text" onChange={myRecipeSearch} className="search__input" placeholder="Enter ingredients"/>
    <button type="submit" className="search__button">
        <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
        </svg>
    </button>

        {stateLoader && <LoaderPage />}
      </form>
      <div>
        {
          nutrition && (
            <div>
          <h2>Calories</h2>
          <p className="calories">{nutrition.calories} kcal</p>
          </div>
          )
        }
{
  nutrition && (
    <div>
      <h2>Total Nutrients</h2>
      <div className="box">
      {Object.values(nutrition.totalNutrients).map(({ label, quantity, unit }, index) => (
        <Nutrition key={index} label={label} quantity={quantity} unit={unit} />
      ))}
      </div>
    </div>
  )
}
      </div>
      </div>
    </div>
  );
}

export default App;