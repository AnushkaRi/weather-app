import "./App.css";
import { useState } from "react";

import { WEATHER_API_KEY } from "./api";
import axios from "axios";
import Search from "./components/Search/search";
import Weather from "./components/Weather/weather";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [error, setError] = useState(null);

  function fetchData(queryParams) {
    const url = `https://api.openweathermap.org/data/2.5/weather?${queryParams}&units=metric&appid=${WEATHER_API_KEY}`;

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setError(error);
        console.error("Error fetching data: ", error);
      });
  }

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  const searchLocation = () => {
    fetchData(`q=${location}`);
    setLocation("");
  };

  const getLocation = (event) => {
    event.preventDefault();

    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);

      fetchData(`lat=${lat}&lon=${long}`);
    });
  };

  return (
    <div className="app_container">
      <h1 className="header">Your Local Weather</h1>
      <div className="main_container">
        <Search
          location={location}
          onHandleLocationChange={handleLocationChange}
          onSearchLocation={searchLocation}
          onGetLocation={getLocation}
        />
        <Weather data={data} />
      </div>
    </div>
  );
}

export default App;
