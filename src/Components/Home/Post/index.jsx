// Styles
import './style.css';

export const Post = () => {
  return (
    <div className="post-section__container">
      <div className="img-post">
        <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="img" />
      </div>
      
      <div className="post-info__section">
        <div className="topside-info__post">
          <h1>Sobrado semi-mobiliado com 3 quartos</h1>
        </div>
        <div className="bottomside-info__post">
          <button className="button">Ver imóvel</button>
          <h1>R$ 1199</h1>
        </div>
      </div>
    </div>
  )
}