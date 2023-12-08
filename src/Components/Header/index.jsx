// React Hooks
import { useState } from 'react';

// Styles
import './style.css';

// React Icons
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Link } from 'react-router-dom';


export const Header = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const handleMenu = () => {
    setActiveMenu(!activeMenu)
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
                <li>
                  <Link to="/">
                    <a href="#home">Inicio</a>
                  </Link>  
                </li>

                <li>
                  <Link to="/about">
                    <a href="#home">Sobre nós</a>
                  </Link>  
                </li>

                <li>
                  <Link to="/srevices">
                    <a href="#home">Serviço nós</a>
                  </Link>  
                </li>

                <li>
                  <Link to="/doc">
                    <a href="#home">Documentação</a>
                  </Link>  
                </li>

                <li>
                  <Link to="/contact">
                    <a href="#home">Contato</a>
                  </Link>  
                </li>
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