import React from 'react';

//export default 
function InfoTooltip(props) {

    const className = `popup popup_type_${props.name} ${props.isOpen && `popup_opened`}`;

  return (
    <div className={className}>
        <div className={`popup__container popup__container_type_${props.forms}`}>
            <div className="popup__content">
                <img className="popup__image" src={props.scr} alt="Знак" />
                <h2 className="popup__text">{props.text}</h2>
            </div>
            <button className="popup__button-close" 
            type="button" 
            onClick={props.onClose}></button>
        </div>
    </div>
  );
}
  
export default InfoTooltip;