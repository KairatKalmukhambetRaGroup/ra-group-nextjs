import React, { useState } from "react";
import { getLang, setLang } from "../utilities/lang";

const dictionary = {
    services: {ru: 'Услуги',kz: 'Қызметтер',en: 'Services'},
    about: {ru: 'О нас',kz: 'Біз туралы',en: 'About us'},
    projects: {ru: 'Проекты',kz: 'Жобалар',en: 'Projects'},
    partners: {ru: 'Партнеры',kz: 'Серіктестер',en: 'Partners'},
    applicationBtn: {ru: 'Оставить заявку',kz: 'Өтінішті жіберіңіз',en: 'Leave an application'},
    language: {ru: 'RU',kz: 'KZ',en: 'EN'}
}

const Header = () => {
    const lang = getLang();
    const [showLangs, setShowLangs] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const handleLangChange = (e) =>{
        e.preventDefault();
        setShowLangs(false);
        const newLang = e.currentTarget.dataset.lang;
        setLang(newLang);
        setShowMenu(false);
    }

    const toggleMenu = (e) => {
        e.preventDefault();
        setShowMenu(!showMenu);
    }

    return (
        <header id="header" >
            <div className="container">
                <div className="navbar">
                    <a href="/" className="navbar-brand">
                        <i></i>
                    </a>
                    <div className={`collapseBtn ${showMenu ? 'active' : ''}`} onClick={toggleMenu}>
                        <i></i>
                    </div>
                    <ul className="nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#services">{dictionary.services[lang]}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#about">{dictionary.about[lang]}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#projects">{dictionary.projects[lang]}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#partners">{dictionary.partners[lang]}</a>
                        </li>
                    </ul>
                    <div className="btns">
                        <a className="btn btn-outline" href="#application">{dictionary.applicationBtn[lang]}</a>
                        <div className={`dropdown ${showLangs ? 'active': ''}`}>
                            <a className="dropbtn" onClick={(e)=>{e.preventDefault(); setShowLangs(!showLangs)}}>{dictionary.language[lang]}</a>
                            <ul className="dropcontent">
                                {lang !== 'ru' && (<li data-lang="ru" onClick={handleLangChange}>{dictionary.language.ru}</li>)}
                                {lang !== 'en' && (<li data-lang="en" onClick={handleLangChange}>{dictionary.language.en}</li>)}
                                {lang !== 'kz' && (<li data-lang="kz" onClick={handleLangChange}>{dictionary.language.kz}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`collapseContent ${showMenu ? 'active' : ''}`}>
                <div className="container">
                    <ul className="nav">
                        <li className="nav-item">
                            <a className="nav-link" onClick={(e)=>{setShowMenu(false)}} href="#services">{dictionary.services[lang]}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={(e)=>{setShowMenu(false)}} href="#about">{dictionary.about[lang]}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={(e)=>{setShowMenu(false)}} href="#projects">{dictionary.projects[lang]}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={(e)=>{setShowMenu(false)}} href="#partners">{dictionary.partners[lang]}</a>
                        </li>
                    </ul>
                    <div className="btns">
                        <a className="btn btn-outline" onClick={(e)=>{setShowMenu(false)}} href="#application">{dictionary.applicationBtn[lang]}</a>
                        <div className={`dropdown ${showLangs ? 'active': ''}`}>
                            <a className="dropbtn" onClick={(e)=>{e.preventDefault(); setShowLangs(!showLangs)}}>{dictionary.language[lang]}</a>
                            <ul className="dropcontent">
                                {lang !== 'ru' && (<li data-lang="ru" onClick={handleLangChange}>{dictionary.language.ru}</li>)}
                                {lang !== 'en' && (<li data-lang="en" onClick={handleLangChange}>{dictionary.language.en}</li>)}
                                {lang !== 'kz' && (<li data-lang="kz" onClick={handleLangChange}>{dictionary.language.kz}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
} ;

export default Header;