import React, { useState, useEffect, useRef } from "react";

import styles from "./search.module.css";
import { getGames } from "../api/rawg"; // Adjust path if needed

let debounceTimer;

export default function Search({ onSearch }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suppressSuggestions = useRef(false); // 👈 track when to skip fetching

  useEffect(() => {
    if (query.trim() === "" || suppressSuggestions.current) {
      suppressSuggestions.current = false;
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      try {
        const data = await getGames(query);
        const titles = data.results.slice(0, 5).map((game) => game.name);
        setSuggestions(titles);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Suggestion fetch failed:", error);
      }
    }, 300); // debounce delay
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    suppressSuggestions.current = true; // 👈 prevent next fetch
    setQuery(suggestion);
    setShowSuggestions(false);
    if (onSearch) onSearch(suggestion);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      suppressSuggestions.current = true; // 👈 prevent next fetch
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  return (

    <form onSubmit={handleSubmit} className="relative">
      <div className={`${styles.searchContainer} flex w-full overflow-hidden rounded-lg`}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Enter Game"
          className="py-2 px-4 flex-1 text-sm"
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        />
        <button type="submit" className={`${styles.searchButton} px-5 text-sm`}>
          Search
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 mt-1 rounded shadow">
          {suggestions.map((item) => (
            <li
              key={item}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
              onMouseDown={() => handleSuggestionClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
