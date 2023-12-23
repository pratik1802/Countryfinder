import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryFinder = () => {
  const [currencyCode, setCurrencyCode] = useState('');
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async (code = '') => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/currency/${code}`);
      setCountries(response.data);
      setError(null);
    } catch (error) {
      setError('Error fetching data');
      setCountries([]);
    }
  };

  useEffect(() => {
    // Fetch default items on component mount (initially or without a search)
    fetchData('usd'); // Fetching data for USD as default
  }, []);

  const handleInputChange = (event) => {
    setCurrencyCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currencyCode) {
      fetchData(currencyCode);
    }
  };

  return (
    <div>
      <h2>Search by Currency</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={currencyCode}
          onChange={handleInputChange}
          placeholder="Enter Currency Code (e.g., USD,INR,AFN,DZD)"/>
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      <ul>
        {countries.map(country => (
          <li key={country.name.common} style={{border: '1px solid black',marginTop:"45px"}}>
            <img src={country.flags?.png} alt="Flag" width="100" style={{marginTop:"25px"}} />
            <h3>{country.name.common}</h3>
            <p>Capital: {country.capital}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryFinder;