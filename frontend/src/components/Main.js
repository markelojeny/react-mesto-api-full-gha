import React from 'react';
import Card from "./Card.js"
import CurrentUserContext from "../context/CurrentUserContext.js"

//export default 
function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">

        <section className="profile">
          <div className="profile__card">
            <div className="profile__avatar-change">
              <img className="profile__avatar" src={currentUser.avatar} alt="Аватар"/>
                <button className="profile__avatar-button" type="button" onClick={props.editAvatarClick}></button>
            </div>
            <div className="profile__info">
              <div className="profile__edit">
                <h1 className="profile__nickname">{currentUser.name}</h1>
                  <button className="profile__button-edit" type="button" aria-label="Редактировать" onClick={props.editProfileClick}></button>
              </div>
              <p className="profile__about">{currentUser.about}</p>
            </div>
          </div>
          <button className="profile__button-add" type="button" onClick={props.addPlaceClick}></button>
        </section>

        <section className="photo-cards">
          {props.cards.map((data) => {
            return <Card card={data} key={data._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
            }
          )}
        </section>

    </main>

  );
}
  
export default Main;