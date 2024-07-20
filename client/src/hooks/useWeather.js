import { useState, useEffect } from "react";

// a custom hook that fetches products from the API
export default function useWeather() {
  const [weather, setWeather] = useState(null);
  const apiUrl ="https://api.openweathermap.org/data/2.5/onecall?exclude=hourly,minutely&units=metric&appid=7273d369c1f620a53040d4dcb4acdf44";
  const latLng = {lat:'43.680031' ,lng:'-70.310425'};
  useEffect(() => {
    async function getWeatherFromApi() {
        try{
            const res = await fetch(`${apiUrl}&lat=${latLng.lat}&lon=${latLng.lng}`);
            const data = await res.json();
            const today = data.daily[0].weather[0];
            setWeather(today["main"]);
        }catch(e){
            setWeather("Weather server busy...");
        }
    }
    getWeatherFromApi();
  }, [latLng.lat,latLng.lng]);
  return [weather];
}