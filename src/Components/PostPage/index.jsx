// Styles
import './style.css';

// React Hooks
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// React Icons
import { FiMapPin } from "react-icons/fi";
import { MdOutlineVerified } from "react-icons/md";


export const PostPage = () => {
  const { id } = useParams();
  const [ data, setData ] = useState([])
  const [selectedImage, setSelectedImage] = useState(null);

  const handleThumbnailClick = (thumbnail) => {
    setSelectedImage(thumbnail);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://huergo.com.br/lot-api/json/api/photo/${id}`);
      
      if (response.ok) {
        const json = await response.json();
        setData(json.photo);

      } else {
        console.error('Erro ao carregar os dados:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao processar a solicitação:', error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    data ? 
    (
      <div className="post-page__container container">
        <div className="post-page__intro">
          <div className="post-left__intro animeLeft">
            {
                selectedImage ? 
                (<img key={selectedImage} src={selectedImage} alt={`Imagem Grande`} />) :
                (data.imagens_relacionadas && <img src={data.imagens_relacionadas[0]} />)
            }
            <div className="thumbnails-container">
              {data.imagens_relacionadas && data.imagens_relacionadas.map((thumbnail, index) => (
                <img
                  key={index}
                  src={thumbnail}
                  alt={`Thumbnail ${index}`}
                  className={`thumbnail ${thumbnail === selectedImage ? 'selected' : ''}`}
                  onClick={() => handleThumbnailClick(thumbnail)}
                />
              ))}
            </div>
          </div>
          <div className="post-right__intro">
            <h3 className="post-price">{Number(data.preco).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}</h3>
            <h1 className="post-title">{data.breve_descricao}</h1>
            <p className="post-locale">
              <FiMapPin />{data.localidade}</p>
            <p className="post-description">{data.descricao_completa}</p>
            <a href="#features" className="button">MAIS INFORMAÇÕES
            </a>
          </div>  
        </div>

        <div className="features-post__container" id="features">
          <div className="features-left__side">
            <h1>Caracteristicas</h1>
            <ul>
              {
                data.features && data.features.split(',').map((item, index) => {
                  return <li><MdOutlineVerified />{item}</li>
                })
              }
            </ul>
          </div>
          <div className="features-right__side">
            <div className="box">
              <h1>2</h1>
              <p>salas</p>
            </div>
            <div className="box">
              <h1>3</h1>
              <p>banheiros</p>
            </div>
            <div className="box">
              <h1>4</h1>
              <p>quartos</p>
            </div>
            <div className="box">
              <h1>2</h1>
              <p>vagas</p>
            </div>
            <div className="box">
              <h1>147m</h1>
              <p>privativos</p>
            </div>
            <div className="box">
              <h1>250m</h1>
              <p>totais</p>
            </div>
          </div>
        </div>
      
        <div className="complete-description__section">
          <h1>Descrição completa</h1>
          <p>{data.descricao_completa}</p>
        </div>

        <div className="map-post__section">
          <div className="left-side__map">
            <h1>Localidade</h1>
            <ul>
              {
                data.localidade
              }
            </ul>
          </div>

          <div className="right-side__map">
            <img src="https://th.bing.com/th/id/R.7c39973161f843a2881c94bc62cbcd42?rik=93s7p2YI9wKYGg&riu=http%3a%2f%2f2.bp.blogspot.com%2f-vzb0tI_V9Dk%2fUDYoEAlXD4I%2fAAAAAAAAAXw%2fa7_D7iiRKvI%2fs1600%2fvvv.png&ehk=7fxxDdr0qH1%2bQZB5aZ%2ffetlnEENBT%2bAstpTnGpaXcbw%3d&risl=&pid=ImgRaw&r=0" alt="map"/>
          </div>
        </div>
      </div>

    )
    :
    (
      <h1>Carregando</h1>
    )
  );
}