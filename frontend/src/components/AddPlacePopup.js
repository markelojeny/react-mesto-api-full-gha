import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {

    const [link, setLink] = React.useState("");
    const [name, setName] = React.useState("");

    React.useEffect(() => {
        setName('');
        setLink('');
      }, [props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        //console.log(name);
        props.onUpdateCard({
            name, 
            link,
        });
    }

    return(
        <PopupWithForm name="place" 
        title="Новое место" 
        text={props.isLoading ? 'Сохранение...' : 'Сохранить'} 
        onClose={props.onClose} 
        isOpen={props.isOpen} 
        forms="form" 
        onSubmit={handleSubmit}>
            <input className="form__input form__input_add_name" 
            minLength="2" 
            maxLength="30" 
            id="place-name" 
            name="placeName" 
            type="text" placeholder="Название" 
            value={name || ''} 
            autoComplete="off" 
            onChange={handleChangeName} 
            required />
            <span className="form__error" id="place-name-error"></span>
            <input className="form__input form__input_add_link" 
            id="place-link" 
            name="placeLink" type="url" 
            alt="" 
            placeholder="Ссылка на картинку" 
            value={link || ''} 
            autoComplete="off" 
            onChange={handleChangeLink} 
            required />
            <span className="form__error" id="place-link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;