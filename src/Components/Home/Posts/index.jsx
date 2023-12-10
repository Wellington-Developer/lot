import './style.css';
import { Post } from '../Post';
import { useEffect, useState, useRef, useContext } from 'react';
import { FiArrowRight } from "react-icons/fi";
import { motion } from 'framer-motion';
import { UserContext } from '../../../UserContext';
import { TbInfoTriangleFilled } from "react-icons/tb";

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

  useEffect(() => {
    const updateWidth = () => {
      setWidthLocacao(carouselLocacao.current?.scrollWidth - carouselLocacao.current?.offsetWidth);
      setWidthVenda(carouselVenda.current?.scrollWidth - carouselVenda.current?.offsetWidth);
      setWidthPesquisa(carouselPesquisa.current?.scrollWidth - carouselPesquisa.current?.offsetWidth);
    };

    window.addEventListener('resize', updateWidth);
    updateWidth();
    filterSections();
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [data, filteredPosts]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {
        (filteredPosts && filteredPosts.length == 0) && <p style={{ 'marginBottom': 24, 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'gap': '12px' }}><TbInfoTriangleFilled />
        Não encontramos resultado pra sua busca</p>
      }
      {filteredPosts && filteredPosts.length >= 1 && (
        <div className="posts-section__container">
          <div className="info-posts__drag">
            <h1 className="title">
              {"Resultado da pesquisa"}
            </h1>
            <FiArrowRight />
          </div>
          <motion.div ref={carouselPesquisa} className="carousel" whileTap={{ cursor: "grabbing" }}>
            <motion.div className="posts-wrapper" drag="x" dragConstraints={{ right: 0, left: -widthPesquisa }}>
              {filteredPosts.map((item, index) => <Post item={item} key={index} />)}
            </motion.div>
          </motion.div>
        </div>
      )}

      <div className="posts-section__container">
        <div className="info-posts__drag">
          <h1 className="title">
            {dataLocacao.length > 0 && 'Locação'}
          </h1>
          <FiArrowRight />
        </div>
        <motion.div ref={carouselLocacao} className="carousel" whileTap={{ cursor: "grabbing" }}>
          <motion.div className="posts-wrapper" drag="x" dragConstraints={{ right: 0, left: -widthLocacao }}>
            {dataLocacao.map((item, index) => <Post item={item} key={index} />)}
          </motion.div>
        </motion.div>
      </div>

      <div className="posts-section__container">
        <div className="info-posts__drag">
          <h1 className="title">
            {dataVenda.length > 0 && 'Venda'}
          </h1>
          <FiArrowRight />
        </div>
        <motion.div ref={carouselVenda} className="carousel" whileTap={{ cursor: "grabbing" }}>
          <motion.div className="posts-wrapper" drag="x" dragConstraints={{ right: 0, left: -widthVenda }}>
            {dataVenda.map((item, index) => <Post item={item} key={index} />)}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
