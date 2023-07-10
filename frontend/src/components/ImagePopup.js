function ImagePopup(props) {
    const className = `popup popup_type_image ${props.isOpen ? "popup_opened" : ""}`

    return (
        <div className={className}>
        <figure className="popup__container popup__container_type_image">
          <button className="popup__button-close" type="button" onClick={props.onClose}/>
          <img className="popup__picture" src={props.card.link} alt={props.card.name}/>
          <figcaption className="popup__title popup__title_type_image">{props.card.name}</figcaption>
        </figure>
      </div>
    )
}

export default ImagePopup;