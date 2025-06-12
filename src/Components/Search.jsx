import styles from "./search.module.css"
import React, {useState} from 'react'
export default function Search({onSearch}) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query);
    }

  }
  return (
    <form onSubmit={handleSubmit}>
      <div className={`${styles.searchContainer} flex w-full bg-amber-50 overflow-hidden rounded-full`}>
        <input type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Game"
              className="py-2 px-4 flex-1 text-sm"/>
        <button type="submit"className={`${styles.searchButton} px-5 text-sm`}>Search</button>
      </div>
    </form>
  );
}
