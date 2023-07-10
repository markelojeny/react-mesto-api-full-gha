import React from 'react';

//export default 
function PopupWithForm(props) {

    const className = `popup popup_type_${props.name} ${props.isOpen && `popup_opened`}`;

    return (
        <div className={className} >
            <div className={`popup__container popup__container_type_${props.forms}`}>
                <h2 className="popup__title popup__title_type_form">{`${props.title}`}</h2>
                <form 
                action="submit" 
                className={`form form_type_${props.name}`} 
                name={`form-${props.name}`}
                onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit" 
                    className={`form__button-save form__button-save_type_${props.name}`} 
                    onSubmit={props.onSubmit}>{props.text}</button>
                </form>
                <button className="popup__button-close" 
                type="button" 
                onClick={props.onClose}></button>
            </div>
        </div>
    );
}

export default PopupWithForm;