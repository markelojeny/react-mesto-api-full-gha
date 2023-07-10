import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../context/CurrentUserContext.js';

function EditProfilePopup(props) {
    const [nickname, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeAbout(e) {
        setDescription(e.target.value);
    }

    //function handleClear() {
        //setName('');
        //setDescription('');
    //}

    function handleSubmit(e) {
        e.preventDefault();
        //console.log(nickname);
      
        props.onUpdateUser({
            name: nickname,
            about: description,
        });
      } 

    return (
        <>
        <PopupWithForm name="edit" 
            title="Редактировать профиль" 
            text={props.isLoading ? 'Сохранение...' : 'Сохранить'} 
            onClose={props.onClose} 
            isOpen={props.isOpen} 
            forms="form"
            onSubmit={handleSubmit}>
            <input className="form__input form__input_edit_name" 
                minLength="2" 
                maxLength="40" 
                id="user-name" 
                name="nickname" 
                type="text" 
                placeholder="Имя профиля" 
                value={nickname || ''} 
                autoComplete="off" 
                onChange={handleChangeName} 
                required />
            <span className="form__error" 
                id="user-name-error"></span>
            <input className="form__input form__input_edit_about" 
                minLength="2" 
                maxLength="200" 
                id="user-about" 
                name="about" 
                type="text" 
                placeholder="Описание профиля" 
                value={description || ''} 
                autoComplete="off" 
                onChange={handleChangeAbout} 
                required />
            <span className="form__error" id="user-about-error"></span>
      </PopupWithForm>
      </>
    )
}

export default EditProfilePopup;