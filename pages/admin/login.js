import Head from "next/head";
import { useEffect, useState } from "react";
import decode from 'jwt-decode';
import Router from "next/router";
import axios from "axios";


const initFormState = {email: '', password: '', remember: false};

export default function Login() {
    axios.defaults.validateStatus = () => {
        return true;
    };
    const [formData, setFormData] = useState(initFormState);

    const [profile, setProfile] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(profile && profile.user && profile.token){
            const token = profile.token;
            if (token) {
                const decodedToken = decode(token);
          
                if (decodedToken.exp * 1000 > new Date().getTime()) 
                    Router.push('/admin');
            }
            // if (typeof window !== "undefined") {
            //     setProfile(JSON.parse(localStorage.getItem('profile')));
            // }
        }else{
            if (typeof window !== "undefined") {
                setProfile(JSON.parse(localStorage.getItem('profile')));
            }
        }
    },)

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(/^[a-zA-Z0-9.]+@ragroup.org+$/);
    };

    const handleChange = (e) => {
        // e.preventDefault();
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;

        if(name === 'remember'){
            setFormData({...formData, [name]: !formData.remember});
        }else{
            setError(null)
            setFormData({...formData, [name]: value});
        }
    };
    useEffect(()=>{
        if(formData && formData.password && formData.email){
            let isValidEmail = !!validateEmail(formData.email);
            let isValidPass = formData.password.length >= 8;
            if(isValidEmail && isValidPass){
                setDisabled(false);
            }else{
                setDisabled(true);
            }
        }
    },[formData]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const resData = await axios.post('/api/login',  formData);
        if(resData.status >=200 && resData.status<300){
            localStorage.setItem('profile', JSON.stringify({...resData.data}));        
            Router.push('/admin');
        }else{
            switch (resData.status) {
                case 404:
                case 401:
                    setError('Неправильный логин или пароль.\nПопробуйте еще раз.')
                    break;
                default:
                    setError('Что-то пошло не так.\nПопробуйте еще раз позже.')
                    break;
            }            
        }
    }

    return (
        <div>
            <Head>
                <title>RA Group | Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div id="login">
                <form onSubmit={handleSubmit}>
                    <div className="semibold-24-32">Вход</div>
                    <div className="form">
                        <div className="form-group">
                            <label>Почта</label>
                            <input type="text" name="email" value={formData.email} placeholder="Введите корпоративную почту" onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Пароль</label>
                            <input type="password" name="password" value={formData.password} placeholder="Введите пароль" onChange={handleChange}/>
                        </div>
                        {error && (
                            <div className="error">{error}</div>
                        )}
                    </div>
                    <div className="more">
                        <label>
                            <input type="checkbox" name="remember"  checked={formData.remember} onChange={handleChange} /> 
                            <span>
                                <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 5L4.66667 9L12 1" stroke="#0E0E0E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </span>
                            запомнить меня
                        </label>
                        <a>Забыли пароль?</a>
                    </div>
                    <button type="submit" disabled={disabled} className="btn">Войти</button>
                </form>
            </div>
        </div>
    );
};