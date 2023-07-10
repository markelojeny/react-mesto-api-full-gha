import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import AuthForm from "./AuthForm.js";

const Register = (props) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })
  //const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(formValue.email, formValue.password);
  }

  return (
    <div className="login">
        <p className="login__welcome">Регистрация</p>
        <AuthForm onSubmit={handleSubmit} 
        onChange={handleChange} 
        email={formValue.email || ""} 
        password={formValue.password || ""} 
        text="Зарегистрироваться" />
        <div className="login__signin">
            <p className="login__text">Уже зарегистрированы? <Link to="../signin" className="login__link">Войти</Link></p>
        </div>
    </div>
)
}

export default Register;