import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {

    const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value = ""
  }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatarRef.current.value 
        });
      }

    return (
        <PopupWithForm onSubmit={handleSubmit} 
        name="avatar" 
        title="Обновить аватар" 
        text={props.isLoading ? 'Сохранение...' : 'Сохранить'} 
        onClose={props.onClose} 
        isOpen={props.isOpen} 
        forms="avatar">
            <input ref={avatarRef} 
            className="form__input form__input_change_avatar" 
            id="avatar" 
            name="avatar" 
            type="url" 
            alt="" 
            placeholder="Ссылка на аватар" 
            autoComplete="off" 
            required />
            <span className="form__error" id="avatar-error"></span>
        </PopupWithForm>
    )
}
export default EditAvatarPopup;