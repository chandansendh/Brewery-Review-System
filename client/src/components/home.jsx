import React, { useState, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import Cards from "./cards";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("by_city");
  const [breweries, setBreweries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value, searchType);
  };

  const handleSelectChange = (e) => {
    setSearchType(e.target.value);
    debouncedSearch(searchTerm, e.target.value);
  };

  const debouncedSearch = useCallback(
    debounce(async (term, type) => {
      if (!term) return;
      setLoading(true);
      setError(null);

      const BASE_URL = "https://api.openbrewerydb.org/breweries";
      const queryString = `${type}=${term}`;

      try {
        const response = await axios.get(`${BASE_URL}?${queryString}`);
        setBreweries(response.data);
      } catch (err) {
        setError("Failed to fetch breweries data");
        console.log("error");
      } finally {
        setLoading(false);
      }
    }, 1000),
    []
  );

  return (
    <>
      <div className="poke_div">
        <h1>Brewery Search</h1>
        <div>
          <select value={searchType} onChange={handleSelectChange}>
            <option value="by_city">City</option>
            <option value="by_name">Name</option>
            <option value="by_type">Type</option>
          </select>
          <input
          className="search"
            type="text"
            placeholder={`Search by ${searchType.replace("by_", "")}`}
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
      <div className="cards_div">
        {breweries.map((brewery) => (
          <div key={brewery.id} className="card_body">
            <Cards
              name={brewery.name}
              city={brewery.city}
              state={brewery.state}
              pin={brewery.postal_code}
              type={brewery.brewery_type}
              phone={brewery.phone}
              website={brewery.website_url}
              id={brewery.id}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
