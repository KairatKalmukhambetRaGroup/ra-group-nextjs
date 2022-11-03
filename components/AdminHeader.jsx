import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const language = {ru: 'RU',kz: 'KZ',en: 'EN'};

const AdminHeader = () => {
    const {locale} = useRouter();
    const [showLangs, setShowLangs] = useState(false);
    const handleLangChange = (e) =>{
        setShowLangs(false);
    }
    return (
        <header id="header" className="admin">
            <div className="navbar">
                <Link href="/" locale={locale}>
                    <span className="navbar-brand">
                        <i></i>
                    </span>
                </Link>
                <div className="btns">
                    <div className={`dropdown ${showLangs ? 'active': ''}`}>
                        <a className="dropbtn" onClick={(e)=>{e.preventDefault(); setShowLangs(!showLangs)}}>{language[locale]}</a>
                        <ul className="dropcontent">
                            {locale !== 'ru' && (<li onClick={handleLangChange}><Link href="" locale="ru">RU</Link></li>)}
                            {locale !== 'en' && (<li onClick={handleLangChange}><Link href="" locale="en">EN</Link></li>)}
                            {locale !== 'kz' && (<li onClick={handleLangChange}><Link href="" locale="kz">KZ</Link></li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
};

export default AdminHeader;