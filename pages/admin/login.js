import Head from "next/head";
import { useEffect, useState } from "react";
import decode from 'jwt-decode';
import Router from "next/router";
import axios from "axios";

const initFormState = {username: '', password: ''};

export default function Login() {
    const [formData, setFormData] = useState(initFormState);

    const [profile, setProfile] = useState(null);

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

    const handleChange = (e) => {
        e.preventDefault();
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const resData = await axios.post('/api/login', formData);
        if(resData.status >=200 && resData.status<300){
            console.log(resData.data);
            Router.push('/admin');
        }else{
            console.log('error');
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
                    <div className="semibold-28-32">LOGIN</div>
                    <div className="form">
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" name="username" value={formData.username} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange}/>
                        </div>
                    </div>
                    <button type="submit" className="btn">LOGIN</button>
                </form>
            </div>
        </div>
    );
};