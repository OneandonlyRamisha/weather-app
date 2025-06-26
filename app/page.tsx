"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  const [city, setCity] = useState("Dubai");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getData = async (city: string) => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(`/api/weather?city=${city}`);
      if (!res.ok) throw new Error("City not found");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError("No city found with that name.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.headerContainer}>
        <h1>RamiForza Weather</h1>
        <h2>Get instant weather updates for any location worldwide</h2>
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Enter City Name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={() => getData(city)}>Search</button>
        </div>
        <p>
          Try searching for: London, New York, Tokyo, Paris, Sydney, or any
          other city!
        </p>
      </div>

      {loading && <div className={styles.loader}></div>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && data?.location && (
        <div className={styles.data}>
          <div className={styles.mainData}>
            <h2 className={styles.header}>
              {data.location.name}, {data.location.country}
            </h2>
            {data.current?.condition?.icon && (
              <Image
                src={`https:${data.current.condition.icon}`}
                alt={data.current.condition.text}
                height={154}
                width={154}
              />
            )}
            <h2 className={styles.weather}>{data.current.temp_c}&#8451;</h2>
            <h2 className={styles.weatherDes}>{data.current.condition.text}</h2>
            <h2 className={styles.weatherDes}>
              Feels Like: {data.current.feelslike_c}&#8451;
            </h2>
          </div>
          <div className={styles.params}>
            <h2>{data.current.feelslike_c}&#8451;</h2>
            <h2>Feels like</h2>
          </div>
          <div className={styles.params}>
            <h2>{data.current.humidity}%</h2>
            <h2>Humidity</h2>
          </div>
          <div className={styles.params}>
            <h2>{data.current.wind_mph} m/s</h2>
            <h2>Wind Speed</h2>
          </div>
          <div className={styles.params}>
            <h2>{data.current.pressure_mb} hPa</h2>
            <h2>Pressure</h2>
          </div>
        </div>
      )}
    </section>
  );
}
