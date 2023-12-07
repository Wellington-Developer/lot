// Styles
import { FormSelectFilter } from '../FormSelectFilter';
import { Posts } from './Posts';
import './style.css'

export const Home = () => {
  return (
    <div className="homepage-section__container container">
      <FormSelectFilter />
      <Posts type={'Locação'}/>
      <Posts type={'Venda'}/>
    </div>
  )
};