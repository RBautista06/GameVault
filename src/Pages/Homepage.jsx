import React, { useState, useEffect } from "react";
import { getGames } from "../api/rawg";
import styles from "./homepage.module.css";
import Search from "../Components/Search.jsx";
import Card from "../Components/Card.jsx";

export default function Home() {
  const [games, setGames] = useState([]);
  console.log(games);
  useEffect(() => {
    getGames()
      .then((data) => setGames(data.results))
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = async (query) =>{
    try{
      const data = await getGames(query);
      setGames(data.results);
    }catch(error){
      console.error(error);
    }
  }

  return (
    <>
      <section className={`${styles.heroContainer} text-lg w-full`}>
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
            <p className={`${styles.subTitle} text-sm text-center leading-none w-80`}>Track your games, build your collection, and stay ahead of the curve. GameVault is your one-stop vault for everything gaming—organized, sleek, and always ready for your next adventure.</p>
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col gap-4 p-5">
        <Search onSearch={handleSearch}/>
        <div className="grid grid-cols-2 grid-flow-row gap-4">
          {games
                .slice()
                .sort((a, b) => b.rating - a.rating)
                .map((game)=>(
            <Card key={game.id}
                  title={game.name}
                  image={game.background_image}
                  rating={game.rating}/>
            ))}

        </div>
      </section>
    </>
  );
}
