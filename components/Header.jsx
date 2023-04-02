import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

const language = {ru: 'RU',kz: 'KZ',en: 'EN'}

const Header = () => {
    const {locale} = useRouter();
    const [showLangs, setShowLangs] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const handleLangChange = (e) =>{
        setShowLangs(false);
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
                    <Link href="" locale={locale}>
                        <span className="navbar-brand">
                            <i></i>
                        </span>
                    </Link>
                    <div className={`collapseBtn ${showMenu ? 'active' : ''}`} onClick={toggleMenu}>
                        <i></i>
                    </div>
                    <ul className="nav">
                        <li className="nav-item">
                            {/* <a className="nav-link" href="#services">{dictionary.services[lang]}</a> */}
                            <a className="nav-link" href="#services"><FormattedMessage id="header.services" /></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#about"><FormattedMessage id="header.about" /></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#projects"><FormattedMessage id="header.projects" /></a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="#partners"><FormattedMessage id="header.partners" /></a>
                        </li> */}
                    </ul>
                    <div className="btns">
                        <a className="btn btn-outline" href="#application"><FormattedMessage id="header.application.btn" /></a>
                        <div className={`dropdown ${showLangs ? 'active': ''}`}>
                            <a className="dropbtn" onClick={(e)=>{e.preventDefault(); setShowLangs(!showLangs)}}>{language[locale]}</a>
                            <ul className="dropcontent">
                                {locale !== 'ru' && (<li onClick={handleLangChange}><Link href="/" locale="ru">RU</Link></li>)}
                                {locale !== 'en' && (<li onClick={handleLangChange}><Link href="/" locale="en">EN</Link></li>)}
                                {locale !== 'kz' && (<li onClick={handleLangChange}><Link href="/" locale="kz">KZ</Link></li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`collapseContent ${showMenu ? 'active' : ''}`}>
                <div className="container">
                    <ul className="nav">
                        <li className="nav-item">
                            <a className="nav-link" onClick={(e)=>{setShowMenu(false)}} href="#services"><FormattedMessage id="header.services" /></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={(e)=>{setShowMenu(false)}} href="#about"><FormattedMessage id="header.about" /></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={(e)=>{setShowMenu(false)}} href="#projects"><FormattedMessage id="header.projects" /></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={(e)=>{setShowMenu(false)}} href="#partners"><FormattedMessage id="header.partners" /></a>
                        </li>
                    </ul>
                    <div className="btns">
                        <a className="btn btn-outline" onClick={(e)=>{setShowMenu(false)}} href="#application"><FormattedMessage id="header.application.btn" /></a>
                        <div className={`dropdown ${showLangs ? 'active': ''}`}>
                            <a className="dropbtn" onClick={(e)=>{e.preventDefault(); setShowLangs(!showLangs)}}>{language[locale]}</a>
                            <ul className="dropcontent">
                                {locale !== 'ru' && (<li onClick={handleLangChange}><Link href="/" locale="ru">RU</Link></li>)}
                                {locale !== 'en' && (<li onClick={handleLangChange}><Link href="/" locale="en">EN</Link></li>)}
                                {locale !== 'kz' && (<li onClick={handleLangChange}><Link href="/" locale="kz">KZ</Link></li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
} ;

export default Header;