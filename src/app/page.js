"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import scraper from "./scraper";

export default function Home() {
  const [currency, setCurrency] = useState("");
  const [date, setDate] = useState("");
  const [value, setValue] = useState("");
  const [units, setUnits] = useState(null);
  const [output, setOutput] = useState(null);

  const convert = async () => {
    try {
      const data = await scraper(currency, date);
      setUnits(data);
      const calc = value * data;
      setOutput(calc);
    } catch (error) {
      console.error(error);
      setOutput("Error occurred while converting. Please try again.");
    }
  };

  return (
    <main className={styles.main}>
      <input
        type="text"
        placeholder="Currency From"
        maxLength="3"
        value={currency}
        onChange={(e) => setCurrency(e.target.value.toUpperCase())}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={convert}>Convert</button>
      <div>
        <h1>Convert {currency} to USD</h1>
        {units && output && (
          <>
            <p>
              Data from{" "}
              <a
                href={`https://www.xe.com/currencytables/?from=${currency}&date=${date}#table-section`}
              >
                xe.com
              </a>
            </p>
            <p>
              1{currency} : {units}USD
            </p>
            <p>
              {value}
              {currency} : {output}USD
            </p>
          </>
        )}
      </div>
    </main>
  );
}
