import React from 'react';
import {Link} from 'react-router-dom';
import headerLogo from '../images/logo.svg'

//export default 
function Header(props) {
  return (
    <header className="header">
        <img className="header__logo" src={headerLogo} alt="Лого" />
        <nav className="header__auth">
          <p className="header__nick">{props.mail}</p>
          <Link to={props.link} type="button" className="header__link" onClick={props.onClick}>{props.text}</Link>
        </nav>
    </header>
  );
}
  
export default Header;