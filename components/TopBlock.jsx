// import Image from "next/image";
import React from "react";
import { getLang } from "../utilities/lang";

// import MainImg from '../utilities/mainImage.png';

const dictionary = {
    title: {ru: 'Цифровые решения для вашего бизнеса', kz: 'Сіздің бизнесіңіз үшін сандық шешімдер', en: 'Digital solutions for your business'},
    subtitle: {
        ru: 'Мы разрабатываем цифровые продукты и услуги, которые помогают предприятиям расти и расширяться.', 
        kz: 'Біз бизнестің өсуіне және кеңеюіне көмектесетін цифрлық өнімдер мен қызметтерді әзірлейміз.', 
        en: 'We develop digital products and services that help businesses grow and expand.'
    },
}

const TopBlock = () =>{
    // const lang = 'en';
    const lang = getLang();
    return (
        <div id="topBlock" className="block">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="bold-32-40 bold-56-72-lg">{dictionary.title[lang]}</div>
                        <div className="regular-16-24">{dictionary.subtitle[lang]}</div>
                    </div>
                    <div className="col">
                        <i id="mainImage"></i>
                        {/* <Image src={MainImg} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopBlock;