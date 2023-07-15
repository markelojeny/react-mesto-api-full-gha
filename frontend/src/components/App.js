import React from 'react';
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Register from './Register.js';
import Login from './Login.js';
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from "./ImagePopup.js";
import InfoTooltip from './InfoTooltip.js';
import CurrentUserContext from "../context/CurrentUserContext.js";
import ProtectedRoute from "./ProtectedRoute.js";
import api from "../utils/api.js";
import auth from "../utils/auth.js";
import registerOk from '../images/ok.svg'
import registerNotOk from '../images/not_ok.svg'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isGoodRegister, setIsGoodRegister] = React.useState(false);
  const [popupText, setPopupText] = React.useState("");
  const [popupImage, setPopupImage] = React.useState("");

  const [selectedCard, setSelectedCard] = React.useState({ });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [mailName, setMailName] = React.useState(null);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  function handleLogin () {
    setLoggedIn(true);
  }

  function onRegister (email, password) {
    auth.register(email, password)
    .then(() => {
      console.log(email)
      console.log(password)
      setPopupImage(registerOk);
      setPopupText("Вы успешно зарегистрировались!");
      navigate('/signin', {replace: true});
    })
    .catch(() => {
      setPopupImage(registerNotOk);
      setPopupText("Что-то пошло не так! Попробуйте ещё раз.");
    })
    .finally(handleGoodClick);
  }

  function onLogin (email, password) {
    if(!email || !password) {
      return;
    }
    auth.authorize(email, password)
        .then((res) => {
          const gg = localStorage.getItem("validated") === 'true';
          console.log(gg);
          setMailName(res.data.email);
          navigate('/', {replace: true});
          handleLogin();
        })
        .catch(err => console.error(err));
  }

  React.useEffect(() => {
    if (localStorage.getItem("validated") === 'true') {
      auth
        .checkToken()
        .then((res) => {
          setMailName(res.data.email);
          handleLogin();
          navigate("/");
        })
        .catch((err) => {
          localStorage.clear();
          navigate("/signin");
          console.log(err);
        });
    }
  }, [navigate]);

  function onSignOut() {
    setLoggedIn(false);
    setMailName(null);
    navigate("/signin");
    localStorage.clear();
  }

  React.useEffect(() => {
    if (loggedIn === true) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then((res) => {
        setCurrentUser(res[0].data);
        setCards(res[1].data.reverse());
      })
      .catch(error => console.log(error));
    }
  }, [loggedIn]);

  function handleAvatarEditClick() {
    setIsEditAvatarPopupOpen(true);  
  }

  function handleProfileEditClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handlePlaceAddClick() {
    setIsAddPlacePopupOpen(true)
  }
  
  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopupOpen(true);
  }

  function handleGoodClick() {
    setIsGoodRegister(true)
  }

  const closePopup = function() {
    setIsEditProfilePopupOpen(false);  
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsGoodRegister(false);
  }

  function handleCardLike(card) {
    console.log(card);
    const isLiked = card.likes.some(i => i === currentUser._id);
    console.log(currentUser);
    console.log(card.likes);
    console.log(isLiked);
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
        console.log(newCard.data);
        setCards((state) => state.map(
          (c) => c._id === card._id ? newCard.data : c
          ));
          console.log(isLiked);
    })
    .catch(error => console.error(error));
  } 
  
  function handleDeleteClick(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(info) {
    console.log(info);
    setIsLoading(true);
    api.editUser(info)
    .then((data) => {
      setCurrentUser(data);
      closePopup();
    })
    .catch(error => console.error(error))
    .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(info) {
    setIsLoading(true);
    api.changeAvatar(info)
    .then((res) => {
      setCurrentUser(res);
      //console.log(res);
      closePopup();
    })
    .catch(error => console.error(error))
    .finally(() => setIsLoading(false));
  }
  function handleAddPlaceSubmit(info) {
    setIsLoading(true);
    api.addCard(info)
    .then((newCard) => {
      setCards({ info:[newCard], ...cards});
      console.log({...cards});
      console.log([newCard]);
      //setCards([...cards, newCard]);
      closePopup();
    })
    .catch(error => console.error(error))
    .finally(() => setIsLoading(false));
  }

  return (
    <>
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route exact path="/" element={
          <>
            <Header mail={mailName} link="/signin" text="Выйти" onClick={onSignOut}/>
            <ProtectedRoute 
              element = {Main}
              editAvatarClick={handleAvatarEditClick} 
              editProfileClick={handleProfileEditClick} 
              addPlaceClick={handlePlaceAddClick} 
              onCardClick={handleCardClick} 
              onCardLike={handleCardLike} 
              onCardDelete={handleDeleteClick}
              cards={cards}
              loggedIn={loggedIn} 
            />
            <Footer />
          </>
        }/>
        <Route path='/signin' element={
          <>
            <Header link="/signup" text="Регистрация" />
            <Login onLogin={onLogin} />
          </>
        } />
        <Route path='/signup' element={
          <>
            <Header link="/signin" text="Войти" />
            <Register onRegister={onRegister} />
        </>
        }/>
        <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />} />
      </Routes>
      
      <EditProfilePopup isOpen={isEditProfilePopupOpen} 
      onClose={closePopup} 
      onUpdateUser={handleUpdateUser}
      isLoading={isLoading} /> 

      <AddPlacePopup isOpen={isAddPlacePopupOpen} 
      onClose={closePopup} 
      onUpdateCard={handleAddPlaceSubmit}
      isLoading={isLoading} /> 

      <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} 
      isOpen={isEditAvatarPopupOpen} 
      onClose={closePopup}
      isLoading={isLoading} />

      <PopupWithForm name="agreement" title="Вы уверены?" text="Да" onClose={closePopup} forms="agreement">
        
      </PopupWithForm>

      <InfoTooltip name="register" forms="register" text={popupText} scr={popupImage} onClose={closePopup} isOpen={isGoodRegister} />

      <ImagePopup card={selectedCard} onClose={closePopup} isOpen={isImagePopupOpen}/>

      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
