// Styles
import './style.css';

// React Components
import { Post } from '../Post';

export const Posts = ({type}) => {
  return (
    <div className="posts-section__container">
      <h1 className="title">{type}</h1>
      <div className="posts-wrapper">
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  )
}