import React, {useState} from 'react';
//import {useNavigate} from 'react-router-dom';
import AuthForm from "./AuthForm.js";

const Login = (props) => {
    //const navigate = useNavigate();
    //const location = useLocation();
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValue.email || !formValue.password){
            return;
        }
        props.onLogin(formValue.email, formValue.password);
    }

    return (
        <div className="login">
            <p className="login__welcome">Вход</p>
            <AuthForm onSubmit={handleSubmit} 
            onChange={handleChange} 
            email={formValue.email || ""} 
            password={formValue.password || ""} 
            text="Войти" />
        </div>
    )
}

export default Login;

//<p className="login__title">Регистрация</p>