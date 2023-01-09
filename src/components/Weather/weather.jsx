import styles from "./styles.module.css";

const Weather = ({ data }) => {
  return (
    <div className={styles.weather_container}>
      <div className={styles.location}>{data.name}</div>
      <div className={styles.weather_section}>
        <div className={styles.temp}>{data.main ? `${data.main.temp.toFixed(0)} °C` : null}</div>
        <img
          className={styles.weather_icon}
          alt=""
          src={`http://openweathermap.org/img/wn/${data.weather ? data.weather[0].icon : null}@2x.png`}
        />
        <div className={styles.weather}>{data.weather ? data.weather[0].main : null}</div>
      </div>
      <div className={styles.feels_like}>{data.main ? `Feels like: ${data.main.feels_like.toFixed(0)} °C` : null}</div>
    </div>
  );
};
export default Weather;
