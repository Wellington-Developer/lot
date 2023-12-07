// Styles
import './style.css';

// React Components
import { Post } from '../Post';
import { useEffect, useState } from 'react';
import { arrayOf } from 'prop-types';

export const Posts = ({type}) => {
  const [ data, setData ] = useState([])

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
    fetchData()
  }, [])

  return (
    <div className="posts-section__container">
      <h1 className="title">{type}</h1>
      <div className="posts-wrapper">
        {
          data ?
          (data.map((item, index) => {
            return <Post item={ item } key={index}/>
          }))
          :
          (
            <h1>Loading</h1>
          )
        }
      </div>
    </div>
  )
}