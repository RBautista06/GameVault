import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import styles from './genre.module.css';

export default function GenreFilter({ genres, selectedGenre, onGenreChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = genres.find(g => g.slug === selectedGenre)?.name || "All Genres";

  const handleSelect = (slug) => {
    onGenreChange({ target: { value: slug } });
    setIsOpen(false);
  };

  return (
    <div className={`${styles.genreContainer} relative rounded-lg  w-50`}>
      <div
        className={`${styles.selectGenre} cursor-pointer rounded-lg px-5 py-2 text-sm flex justify-between items-center gap-10 border`}
        onClick={() => setIsOpen(!isOpen)}>
        {selectedLabel}
        <FaChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}/>
      </div>
      {isOpen && (
        <div className={`${styles.options} absolute z-10 mt-2 w-full  border rounded-md shadow-lg max-h-60 overflow-y-auto`}>
          <div
            onClick={() => handleSelect('')}
            className={`${styles.selectGenre} px-5 py-2 hover:bg-amber-100 cursor-pointer`}>
            All Genres
          </div>
          {genres.map((g) => (
            <div

              key={g.id}
              onClick={() => handleSelect(g.slug)}
              className={`${styles.selectGenre} px-5 py-2 hover:bg-amber-100 cursor-pointer`}>
              {g.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
