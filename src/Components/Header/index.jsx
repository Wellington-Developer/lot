// React Hooks
import { useContext, useState } from 'react';

// Styles
import './style.css';

// React Icons
import { FaFacebook, FaInstagram, FaWhatsapp, FaUser } from "react-icons/fa";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Link, useLocation } from 'react-router-dom';

// React Context
import { UserContext } from '../../UserContext';

// Logo
import Logo from '../../assets/logos/logo.png'

export const Header = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const handleMenu = () => {
    setActiveMenu(!activeMenu)
  }
  const local = useLocation()

  const { data, login } = useContext(UserContext)


  return (
    <header className="header">
      <div className="contact-side__header" style={ local.pathname != "/" ? {'background': '#001781'} : {} }>
        <div className="contact-info__header container">
          <div className="icons-contact__header">
            <FaFacebook />
            <FaInstagram />
            <FaWhatsapp />
          </div>
            { 
              login &&
                <ul>
                    <li>
                        <Link to="/account">
                            {data.username}
                            <FaUser />
                        </Link>  
                    </li>
                </ul>
            }
            {
              !login &&
              <Link to="/login">
                <FaUnlockKeyhole />
              </Link>
            }
        </div>
      </div>

      <div className="info-side__header">
        <div className="info-container__header container">
          <div className="info-left__header">
            <Link to="/">
              <img src={Logo} />
            </Link>
          </div>
          
          {
            login ?
            (
              <div className={!activeMenu ? 'info-right__header active' : 'info-right__header'}>
                <ul onClick={setActiveMenu}>
                    <li>
                      <Link to="/">
                        <a href="/">Ver postagens</a>
                      </Link>  
                    </li>

                    <li>
                      <Link to="/account/send-post">
                        <a href="/">Postar imóvel</a>
                      </Link>  
                    </li>
                </ul>
              </div>
            )
            :
            (
              <div className={!activeMenu ? 'info-right__header active' : 'info-right__header'}>
                <ul onClick={setActiveMenu}>
                    <li>
                      <Link to="/about">
                        <a href="#home">Sobre nós</a>
                      </Link>  
                    </li>

                    <li>
                      <Link to="/srevices">
                        <a href="#home">Serviço</a>
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
            )
          }

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