import './style.css';
import { Post } from '../Post';
import { useEffect, useState, useRef, useContext } from 'react';
import { FiArrowRight } from "react-icons/fi";
import { motion } from 'framer-motion';
import { UserContext } from '../../../UserContext';

export const Posts = ({ type }) => {
  const [data, setData] = useState([]);
  const [width, setWidth] = useState(0);
  const carousel = useRef();
  const { filteredPosts } = useContext(UserContext);

  const fetchData = async () => {
    try {
      const response = await fetch('https://huergo.com.br/lot-api/json/api/photo');
      
      if (response.ok) {
        const json = await response.json();
        setData(json);
      } else {
        console.error('Erro ao carregar os dados:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao processar a solicitação:', error);
    }
  }

  useEffect(() => {
    const updateWidth = () => {
      setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
    };

    window.addEventListener('resize', updateWidth);
    updateWidth();

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [data]);

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="posts-section__container">
      <div className="info-posts__drag">
        <h1 className="title">
          {filteredPosts && (filteredPosts.length === 1 ? 'Resultado' : type)}
        </h1>
        <FiArrowRight />
      </div>
      <motion.div ref={carousel} className="carousel" whileTap={{ cursor: "grabbing" }}>
        <motion.div className="posts-wrapper" drag="x" dragConstraints={{ right: 0, left: -width }}>
          {filteredPosts ? (
            filteredPosts.map((item, index) => <Post item={item} key={index} />)
          ) : (
            data.map((item, index) => <Post item={item} key={index} />)
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
