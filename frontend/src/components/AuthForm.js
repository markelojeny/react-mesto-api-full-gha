import React from 'react';
const AuthForm = (props) => {
    return (
        <form autoComplete="off" onSubmit={props.onSubmit} className="login__form">
            <input autoComplete="off" className="login__input" required id="email" name="email" type="text" value={props.email} placeholder="Email" onChange={props.onChange} />
            <input autoComplete="off" className="login__input" required id="password" name="password" type="password" value={props.password} placeholder="Пароль" onChange={props.onChange} />
            <button onSubmit={props.onSubmit} type="submit" className="login__button">{props.text}</button>
        </form>
    )
}
export default AuthForm;