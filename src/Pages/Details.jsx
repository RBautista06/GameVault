import React, { useEffect, useState } from 'react';
import Footer from "../Components/Footer.jsx";
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL, API_KEY } from '../api/rawg.js';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import styles from "./details.module.css";
export default function Details() {
  const { gameId } = useParams();
  const [gameData, setGameData] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getGameData() {
      try {
        const res = await fetch(`${BASE_URL}/games/${gameId}?key=${API_KEY}`);
        if (!res.ok) {
          throw new Error('Game details could not be fetched from the API');
        }
        const data = await res.json();
        setGameData(data);
      } catch (err) {
        console.error(err);
      }
    }

    getGameData();
  }, [gameId]);

  if (!gameData) {
    return <div className="p-4 text-white">Loading...</div>;
  }
  const rating = gameData.rating;
  const stars = [];
  for(let i=1;i<=5;i++){
    if(rating >= i){
      stars.push(<FaStar key={i} className="text-amber-300"/>);
    }else if(rating >= i - 0.5){
      stars.push(<FaStarHalfAlt key={i} className="text-amber-300"/>);
    }else{
      stars.push(<FaRegStar key={i} className="text-amber-300"/>);
    }
  }
  return (
  <>
    <div className="p-6 max-w-4xl mx-auto text-white relative">
      <button
        onClick={() => navigate(-1)}
        className={`${styles.backButton} mb-4  py-2 px-4 rounded-lg`}
      >
        ← Back
      </button>
      <h1 className={`${styles.titleText} text-center w-[100%]`}>Game Vault</h1>
      {gameData.background_image && (
        <img
          src={gameData.background_image}
          alt={gameData.name}
          className="mb-6 rounded-lg w-full max-h-[500px] object-cover"
        />
      )}

      <h1 className="text-3xl font-bold mb-4 text-center">{gameData.name}</h1>

      <div className="relative mb-6 bg-gray-800 p-2 rounded-lg">
        <div
          className={`text-gray-300 text-center overflow-hidden transition-all duration-300 ease-in-out ${
            expanded ? 'max-h-[1000px]' : 'max-h-[150px]'
          }`}
        >
          {gameData.description_raw}
        </div>

        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0f172a] to-transparent pointer-events-none" />
        )}
      </div>
      {gameData.description_raw.length > 300 && (
        <div className="text-center mb-6">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="text-white"
          >
            {expanded ? 'See less ▲' : 'See more ▼'}
          </button>
        </div>
      )}

    <div className=" text-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className='bg-gray-800 p-4 rounded-lg'>
        <div className="flex">
          <span className="w-32">Released:</span>
          <span>{gameData.released}</span>
        </div>

        <div className="flex">
          <span className="w-32">Rating:</span>
          <div className="flex items-center gap-2">
            {stars}
            {gameData.rating}
          </div>
        </div>

        <div className="flex">
          <span className="w-32">Metacritic:</span>
          <span>{gameData.metacritic || 'N/A'}</span>
        </div>

        <div className="flex">
          <span className="w-32">Genres:</span>
          <span>{gameData.genres.map((g) => g.name).join(', ')}</span>
        </div>
      </div>

      <div className='bg-gray-800 p-4 rounded-lg'>
        <div className="flex">
          <span className="w-32">Developers:</span>
          <span>{gameData.developers.map((d) => d.name).join(', ')}</span>
        </div>

        <div className="flex">
          <span className="w-32">Publishers:</span>
          <span>{gameData.publishers.map((p) => p.name).join(', ')}</span>
        </div>

        <div className="flex">
          <span className="w-32">ESRB Rating:</span>
          <span>{gameData.esrb_rating?.name || 'N/A'}</span>
        </div>
      </div>

    </div>
      <div className='bg-gray-800 p-4 rounded-lg mt-4'>
      <div className="flex items-start">
        <span className="w-32">Platforms:</span>
        <span>{gameData.platforms.map((p) => p.platform.name).join(', ')}</span>
      </div>
    </div>


    </div>
    <Footer />
    </>
  );
}
