// Styles
import './style.css';

// React Components
import { Post } from '../Post';
import { useEffect, useState, useRef } from 'react';

// React Icons
import { FiArrowRight } from "react-icons/fi";

// Framer motion
import { motion } from 'framer-motion';

export const Posts = ({type}) => {
  const [data, setData] = useState([]);
  const [width, setWidth] = useState(0);
  const carousel = useRef();

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


    // Adicione um event listener para atualizar a largura após o carregamento dos posts
    window.addEventListener('resize', updateWidth);

    // Execute a função de atualização da largura após o carregamento dos dados
    updateWidth();

    return () => {
      // Remova o event listener para evitar vazamentos de memória
      window.removeEventListener('resize', updateWidth);
    };
  }, [data]);

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="posts-section__container">
      <div className="info-posts__drag">
        <h1 className="title">{type}</h1>
        <FiArrowRight />
      </div>
      <motion.div ref={carousel} className="carousel" whileTap={{ cursor: "grabbing" }}>
        <motion.div className="posts-wrapper" drag="x" dragConstraints={{ right: 0, left: -width }}>
          {data && data.map((item, index) => <Post item={item} key={index} />)}
        </motion.div>
      </motion.div>
    </div>
  )
}
