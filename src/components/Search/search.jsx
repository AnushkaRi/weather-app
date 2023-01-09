import styles from "./styles.module.css";

import { geoApiOptions } from "../../api";
import axios from "axios";
import { useState, useEffect } from "react";

const Search = ({ location, onHandleLocationChange, onSearchLocation, onGetLocation }) => {
  const [cities, setCities] = useState([]);

  const loadGeoApiOptions = async () => {
    if (location) {
      const response = await axios.request({ ...geoApiOptions, params: { namePrefix: location } });
      setCities(response.data.data);
    }
    console.log(cities);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadGeoApiOptions();
    }, 1000);

    return () => clearTimeout(timer);
  }, [location]);

  const handleAutocompleteClick = (city) => {
    onSearchLocation(city);
    setCities([]);
  };

  const handleInputChange = (event) => {
    onHandleLocationChange(event.target.value);
  };

  const handleInputEnter = (event) => {
    if (event.key === "Enter") {
      onSearchLocation();
      setCities([]);
    }
  };

  return (
    <div className={styles.input_container}>
      <div className={styles.input_section}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter city name..."
          value={location}
          onChange={handleInputChange}
          onKeyDown={handleInputEnter}
        ></input>
        {location && cities.length ? (
          <ul className={styles.autocomplete_container}>
            {cities.map((city) => (
              <li
                key={city.id}
                className={styles.autocomplete_result}
                onClick={() => handleAutocompleteClick(city.city)}
              >
                {city.city} ({city.country})
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
      <div className={styles.separator}>or</div>
      <button className={styles.btn} onClick={onGetLocation}>
        Get Your Location
      </button>
    </div>
  );
};

export default Search;
