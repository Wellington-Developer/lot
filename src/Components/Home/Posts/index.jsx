import './style.css';
import { Post } from '../Post';
import { useEffect, useState, useRef, useContext } from 'react';
import { FiArrowRight } from "react-icons/fi";
import { motion } from 'framer-motion';
import { UserContext } from '../../../UserContext';
import { TbInfoTriangleFilled } from "react-icons/tb";
import { LazyMotion } from 'framer-motion';

export const Posts = ({ type }) => {
  const [data, setData] = useState([]);
  const [dataLocacao, setDataLocacao] = useState([]);
  const [dataVenda, setDataVenda] = useState([]);
  const [widthLocacao, setWidthLocacao] = useState(0);
  const [widthVenda, setWidthVenda] = useState(0);
  const [widthPesquisa, setWidthPesquisa] = useState(0);
  const carouselLocacao = useRef();
  const carouselVenda = useRef();
  const carouselPesquisa = useRef();
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
  };

  const filterSections = () => {
    if (data) {
      const locacaoPosts = data.filter(imovel => imovel.locacao_ou_venda === "Locacao");
      const vendaPosts = data.filter(imovel => imovel.locacao_ou_venda === "Venda");
      setDataLocacao(locacaoPosts);
      setDataVenda(vendaPosts);
    }
  };

  const updateWidth = () => {
    setWidthLocacao(carouselLocacao.current?.scrollWidth - carouselLocacao.current?.offsetWidth);
    setWidthVenda(carouselVenda.current?.scrollWidth - carouselVenda.current?.offsetWidth);
    setWidthPesquisa(carouselPesquisa.current?.scrollWidth - carouselPesquisa.current?.offsetWidth);
  };

  useEffect(() => {
    const handleResize = () => {
      updateWidth();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [filteredPosts, dataVenda, dataLocacao, widthPesquisa]);

  useEffect(() => {
    fetchData();
    updateWidth();
    filterSections();
  }, [data]);

  useEffect(() => {
    updateWidth();
    filterSections();
  }, [data, filteredPosts]);

  const renderPostsCarousel = (carouselRef, data, width) => {
    return (
      <motion.div ref={carouselRef} className="carousel">
        <motion.div
          className="posts-wrapper"
          drag={data.length > 1 ? "x" : false}
          dragConstraints={{ right: 0, left: -width }}
          dragElastic={0.1}
          dragMomentum={0.5}
        >
          {data.map((item, index) => (
            <Post item={item} key={index} />
          ))}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div>
      {filteredPosts && filteredPosts.length === 0 && (
        <p style={{ 'marginBottom': 24, 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'gap': '12px' }}>
          <TbInfoTriangleFilled />
          Não encontramos resultado pra sua busca
        </p>
      )}

      {filteredPosts && filteredPosts.length >= 1 && (
        <div className="posts-section__container">
          <div className="info-posts__drag">
            <h1 className="title">
              <div>
                <h1>Resultado: {filteredPosts[0].locacao_ou_venda === 'Locacao' ? 'Locação' : 'Venda'}</h1>
              </div>
            </h1>
            <FiArrowRight />
          </div>
          {renderPostsCarousel(carouselPesquisa, filteredPosts, widthPesquisa)}
        </div>
      )}

      <div className="posts-section__container">
        <div className="info-posts__drag">
          <h1 className="title">{dataLocacao.length > 0 && 'Locação'}</h1>
          <FiArrowRight />
        </div>
        {renderPostsCarousel(carouselLocacao, dataLocacao, widthLocacao)}
      </div>

      <div className="posts-section__container">
        <div className="info-posts__drag">
          <h1 className="title">{dataVenda.length > 0 && 'Venda'}</h1>
          <FiArrowRight />
        </div>
        {renderPostsCarousel(carouselVenda, dataVenda, widthVenda)}
      </div>
    </div>
  );
};
