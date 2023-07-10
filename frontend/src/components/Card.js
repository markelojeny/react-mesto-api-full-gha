import React from 'react';
import CurrentUserContext from "../context/CurrentUserContext.js"

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `like__button ${isLiked && 'like__button_active'}` 
  );; 

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  
  return (
    <article className="photo-card">
      <img onClick={handleClick} className="photo-card__picture photo-card__button-picture" src={props.card.link} alt={props.card.name} />
      <div className="photo-card__group">
        <h2 className="photo-card__title">{props.card.name}</h2>
        <div className="like">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <h3 className="like__number">{props.card.likes.length}</h3>
        </div>
      </div>
      {isOwn && <button className="photo-card__button-delete" type="button" onClick={handleDeleteClick} />} 
    </article>
  )
}

export default Card;