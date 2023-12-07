// React Hooks
import { useState } from 'react';

// Styles
import './style.css';

// React Icons
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";


export const Header = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const handleMenu = () => {
    setActiveMenu(!activeMenu)
    console.log(activeMenu)
  }

  return (
    <header className="header">
      <div className="contact-side__header">
        <div className="contact-info__header container">
          <p>(012) 98840-4216</p>
          <div className="icons-contact__header">
            <FaFacebook />
            <FaInstagram />
            <FaWhatsapp />
          </div>
        </div>
      </div>

      <div className="info-side__header">
        <div className="info-container__header container">
          <div className="info-left__header">
            <h1>lotlogo</h1>
          </div>
          <div className={!activeMenu ? 'info-right__header active' : 'info-right__header'}>
            <ul>
              <li><a href="#home">Inicio</a></li>
              <li><a href="#about">Sobre nós</a></li>
              <li><a href="#service">Serviço</a></li>
              <li><a href="#doc">Documentação</a></li>
              <li><a href="#contact">Contato</a></li>
            </ul>
          </div>

          <div className="menu-icon" onClick={handleMenu}>
            {
              activeMenu ? 
              (<HiMenuAlt3 />) : 
              (<HiX  />)
            }
          </div>
        </div>
      </div>
    </header>
  )
};