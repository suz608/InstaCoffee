import useWeather from "../hooks/useWeather.js"
// GetWeather is a component of homepage. It uses the style of homepage.

export default function GetWeather() {
    const [weather] = useWeather();
    if(weather===null){
        return <div className="loading">Loading...</div>;
    }
    return(<h3 id="weather">Today's weather: {weather}</h3>)
}
