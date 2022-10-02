import React from "react";

import MobileImg from '../utilities/icons/services-mobile.svg';
import MobileImgHover from '../utilities/icons/services-mobile-hover.svg';
import AllPlatformsImg from '../utilities/icons/services-all.svg';
import CRMImg from '../utilities/icons/services-crm.svg';
import CRMImgHover from '../utilities/icons/services-crm-hover.svg';
import { getLang } from "../utilities/lang";
import Image from "next/image";

const cards = [
    {
        img: MobileImg,
        imgHover: MobileImgHover,
        title: {ru: 'Мобильные приложения', kz: 'Мобильді қолданбалар', en: 'Mobile applications'},
        text: {ru: 'программное обеспечение, разработанное под мобильную платформу', kz: 'мобильді платформаның бағдарламалық құралы', en: 'software developed for the mobile platform'}
    },
    {
        img: AllPlatformsImg,
        imgHover: AllPlatformsImg,
        title: {ru: 'Веб платформы', kz: 'Веб платформалар', en: 'Web platforms'},
        text: {ru: 'программное обеспечение для веб-сайтов', kz: 'веб-сайт бағдарламалық құралы', en: 'software developed for websites'}
    },
    {
        img: CRMImg,
        imgHover: CRMImgHover,
        title: {ru: 'CRM системы', kz: 'CRM жүйелері', en: 'CRM systems'},
        text: {ru: 'автоматизация и обслуживание бизнес-процессов', kz: 'бизнес-процестерді автоматтандыру және қызмет көрсету', en: 'automation and maintenance of business processes'}
    },
];

const dictionary = {
    title: {ru: 'Услуги', kz: 'Қызметтер', en: 'Services'},
    subtitle: {
        ru: 'Мы предоставляем различные виды IT услуг, но сначала мы проведем бриф и изучим с командой сферу деятельности. Мы выделим основных конкурентов и целевую аудиторию вашего продукта.', 
        kz: 'Біз IT-қызметтердің әртүрлі түрлерін көрсетеміз, бірақ алдымен қысқаша ақпарат жүргізіп, топпен қызмет саласын зерттейміз. Біз сіздің өніміңіздің негізгі бәсекелестерін және мақсатты аудиториясын бөліп көрсетеміз.', 
        en: 'We provide various types of IT services, but first we will conduct a brief and study the field of activity with the team. We will highlight the main competitors and the target audience of your product.'
    },
}

const Services = () => {
    const lang = getLang();
    return (
        <div id="services" className="block">
            <div className="container">
                <div className="text-box">
                    <div className="semibold-28-32">{dictionary.title[lang]}</div>
                    <div className="regular-16-24">{dictionary.subtitle[lang]}</div>
                </div>
                <div className="cards">
                    {cards && cards.map((card, key)=>(
                        <div className="col" key={key}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-img">
                                        <div className="img">
                                            <Image src={card.img} />
                                        </div>
                                        <div className="img hover">
                                            <Image className="hover" src={card.imgHover}/>
                                        </div>
                                    </div>
                                    <div className="text">
                                        <div className="card-title">{card.title[lang]}</div>
                                        <div className="card-text">{card.text[lang]}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Services;