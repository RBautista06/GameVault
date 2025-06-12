import React from 'react'
import styles from './footer.module.css'
export default function Footer() {
  return (
    <div className={`${styles.footerContainer} px-5 pb-5 border-t-1 text-sm mt-3`}>
      <div className='flex flex-col gap-2'>
        <div className='border-b-1 py-2 text-center'>
          <h2 className='font-semibold text-2xl'>Attribution</h2>
        </div>
        <p className={`${styles.disclaimerText} text-center`}>This project is developed for personal and educational purposes only. It is not intended for commercial use. Game data and assets are sourced from the RAWG Video Games Database API. All trademarks, logos, and game content belong to their respective owners. This project is built as a showcase of frontend development, API integration, and UI design skills.</p>
      </div>
      <div className={`${styles.langUsed} mt-5 w-[100%] flex flex-col gap-5`}>
        <div className='flex gap-4'>
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
            alt="HTML"
            className="w-10 h-10"/>
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
            alt="CSS"
            className="w-10 h-10"/>
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
            alt="JavaScript"
            className="w-10 h-10"/>
          <img
            src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg"
            alt="Tailwind CSS"
            className="w-10 h-10  p-1 rounded"/>
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
            alt="React (JSX)"
            className="w-10 h-10"/>
        </div>
        <p className='text-center opacity-[70%]'>
          © {new Date().getFullYear()} Game Vault. All rights reserved. Powered by the <a href="https://rawg.io/apidocs" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">RAWG Video Games Database API</a>.
        </p>
      </div>

    </div>
  )
}
