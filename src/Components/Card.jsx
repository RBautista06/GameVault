import styles from './card.module.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import defaultImg from '../assets/warframebg.jpg'
export default function Card(props) {
  const rating = props.rating;
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
    <div className={`${styles.cardContainer} rounded-lg p-3 flex flex-col gap-3`}>
      <div className="overflow-hidden border relative aspect-square rounded-md">
        <img src={props.image || defaultImg} className="w-full h-full object-cover object-center" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="star-rating flex gap-2 justify-center">
          {stars}
        </div>
        <h2 className={`${styles.cardTitle} w-full text-center rounded-sm`}>{props.title}</h2>
      </div>
    </div>
  )
}
