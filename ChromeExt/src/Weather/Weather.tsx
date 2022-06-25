import React, { useState } from "react";
import axios from "axios";

import { City, Weather, capitalize, weatherCode, windDir } from "../utils";

const WeatherComponent = (props : {city : City}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [weather, setWeather] = useState({} as Weather);
    if (isLoading) {
        axios.get("https://mymeteo.mvetois.fr/api/cities/weather?code=" + props.city.code).then((res) => {
            setWeather(res.data);
            setIsLoading(false);
        }).catch(() => {});
    }
    return (<>
        <header className="App-header">
            {weather ? <img src={weatherCode(weather?.data?.current_weather?.weathercode) } style={{width: 130, height: 100}} alt="WeatherIcon"/> : <></> }
            <h2>{capitalize(weather?.city?.name)}</h2>
            {weather ? <>
                <p>Département : {weather?.city?.nameDpt} ({weather?.city?.codeDpt})</p>
                <p style={{ lineHeight: 1 }}>{weather?.city?.codePst?.length <= 1 ? "Code postal :" : "Code postaux :"} {weather?.city?.codePst.map(x => x + " ")}</p>
                <p>Température : {weather?.data?.current_weather?.temperature}°C</p>
                <p>Vent : {weather?.data?.current_weather?.windspeed} km/h</p>
                <p>Direction : {windDir(weather?.data?.current_weather?.winddirection)}</p>
                </> : <></> }
        </header>
    </>);
}

export default WeatherComponent;