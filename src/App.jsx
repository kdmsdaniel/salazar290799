import { useEffect, useState } from "react";

import { getCountries } from "./Components/Countries";
import { getCities } from "./Components/Cities";
import { getCityWeather } from "./Components/Weather";

const App = () => {
   const [countries, setCountries] = useState([]);
   const [cities, setCities] = useState([]);
   const [weather, setWeather] = useState(null);

   useEffect(() => {
      (async () => {
         setCountries(await getCountries());
      })();
   }, []);

   const countryHandler = async e => {
      e.currentTarget.value && setCities(await getCities(e.currentTarget.value));
      setWeather(null);
   }

   const cityHandler = async e => e.currentTarget.value && setWeather(await getCityWeather(e.currentTarget.value));

   return (
      <>
         <div>
          <h2>Wheather App</h2>
            <label>Elige un país:</label>
            <select onChange={countryHandler}>
               <option value="">Selecciona</option>
               {countries.map(country => <option key={country.cca2} value={country.cca2}>{country.name.common}</option>)}
            </select>
         </div>

         {cities.length > 0 && (
            <div>
               <label>Elige una ciudad:</label>
               <select onChange={cityHandler}>
                  <option value="">Selecciona</option>
                  {cities.map(city => <option key={city.id}>{city.name}</option>)}
               </select>
            </div>
         )}
         {weather && (
            <div>
                  <h2>Actual temperature: {weather.main.temp}ºC</h2>
                  <h3> Fahrenheit:  {((weather.main.temp * 9 / 5) + 32).toFixed(2)} °F </h3>
                  <button className="button" >Degrees °F</button>
               <p>Min: {weather.main.temp_min.toFixed()}°</p>
               <p>Max: {weather.main.temp_max.toFixed()}°</p>
               <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
            </div>
         )}
      </>
   );
}

export default App;
