import React, { useState, useEffect } from "react";
import { getGames,getGenre } from "../api/rawg";
import styles from "./homepage.module.css";
import Search from "../Components/Search.jsx";
import Card from "../Components/Card.jsx";
import GenreFilter from "../Components/GenreFilter.jsx";
import Footer from "../Components/Footer.jsx";

export default function Home() {

  const [games, setGames] = useState([]);
  console.log(games);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchGames();
    fetchGenres();
  }, []);

  const fetchGames = async (query = '', genre = '', page = 1) => {
    try {
      const data = await getGames(query, page, genre);
      setGames(data.results);
      setTotalPages(Math.ceil(data.count / 20)); // RAWG returns total count
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGenres = async () => {
    try {
      const data = await getGenre();
      setGenre(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    fetchGames(query, selectedGenre, 1);
  };

  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    setCurrentPage(1);
    fetchGames(searchQuery, genre, 1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchGames(searchQuery, selectedGenre, newPage);
    }
  };

  return (
    <>
    <div className="w-full flex flex-col items-center">
      <section className={`${styles.heroContainer} text-lg max-w-7xl w-full`}>
        <div className={`${styles.backGroundContainer} text-lg w-full`}>
          <div className={`${styles.backGroundImage} text-lg w-full`}></div>
        </div>
        <div className={`${styles.heroTitle} relative flex flex-col gap-3 px-5 `}>
          <div className="mt-40 flex  items-center justify-center">
            <div>
              <h2 className={`${styles.welcomeText}`}>Welcome to</h2>
              <h1 className={`${styles.titleText}`}>Game Vault</h1>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <p className={`${styles.subTitle} text-sm md:text-md lg:text-lg text-center leading-none w-80 lg:w-100`}>Track your games, build your collection, and stay ahead of the curve. GameVault is your one-stop vault for everything gaming—organized, sleek, and always ready for your next adventure.</p>
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col gap-4 p-5 max-w-7xl ">
        <Search onSearch={handleSearch} />
        <GenreFilter
          genres={genre}
          selectedGenre={selectedGenre}
          onGenreChange={handleGenreChange}
        />

        <div className="grid grid-cols-2 grid-flow-row gap-4 :grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {games
              .map((game) => (
                <Card
                  id={game.id}
                  slug={game.slug}
                  title={game.name}
                  image={game.background_image}
                  rating={game.rating}
                />
            ))}
        </div>
        <div className={`${styles.paginationContainer} flex justify-between items-center gap-4 w-[100%]`}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${styles.paginationButton} px-4 py-1 border rounded-md bg-gray-200 disabled:opacity-50`}>
            Prev
          </button>
          <span className="text-sm">
            Page &nbsp; {currentPage} &nbsp; of &nbsp;{totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${styles.paginationButton} px-4 py-1 border rounded-md bg-gray-200 disabled:opacity-50`}>
            Next
          </button>
        </div>

      </section>
        <Footer />
      </div>


    </>
  );
}