// Styles
import './style.css';

export const Post = ({ item } ) => {
  console.log(item)

  const price = Number(item.preco).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
  return (
    <div className="post-section__container">
      <div className="img-post">
        <img src={item.src} alt="img" />
      </div>
      
      <div className="post-info__section">
        <div className="topside-info__post">
          <h1>{item.breve_descricao}</h1>
          <p>{item.localidade}</p>
        </div>
        <div className="bottomside-info__post">
          <button className="button">Ver imóvel</button>
          <h1>{price}</h1>
        </div>
      </div>
    </div>
  )
}