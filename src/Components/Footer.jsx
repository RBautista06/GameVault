import React from 'react'
import styles from './footer.module.css'
import { FaHtml5, FaCss3Alt, FaJs, FaReact } from 'react-icons/fa';
import { SiTailwindcss } from 'react-icons/si'
export default function Footer() {
  return (
    <div className={`${styles.footerContainer} px-5 pb-5 text-sm mt-3 w-full`}>
      <div className='flex flex-col gap-2 max-w-4xl'>
        <div className='border-b-1 py-2 text-center'>
          <h2 className='font-semibold text-2xl'>GAME VAULT</h2>
        </div>
        <p className={`${styles.disclaimerText} text-center`}>This project is developed for personal and educational purposes only. It is not intended for commercial use. Game data and assets are sourced from the RAWG Video Games Database API. All trademarks, logos, and game content belong to their respective owners. This project is built as a showcase of frontend development, API integration, and UI design skills.</p>
      </div>
      <div className={`${styles.langUsed} mt-5 w-[100%] flex flex-col gap-5`}>
        <div className={`${styles.icons} flex gap-4 text-[30px]`}>
          <FaHtml5 title="HTML5"  />
          <FaCss3Alt title="CSS3" />
          <FaJs title="JavaScript"  />
          <SiTailwindcss title="Tailwind CSS"  />
          <FaReact title="React"  />
        </div>
        <p className='text-center opacity-[70%]'>
          © {new Date().getFullYear()} Game Vault. All rights reserved. Powered by the <a href="https://rawg.io/apidocs" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">RAWG Video Games Database API</a>.
        </p>
      </div>

    </div>
  )
}
