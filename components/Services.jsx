import React from "react";
import { FormattedMessage } from "react-intl";

import MobileImg from '../utilities/icons/services-mobile.svg';
import MobileImgHover from '../utilities/icons/services-mobile-hover.svg';
import AllPlatformsImg from '../utilities/icons/services-all.svg';
import CRMImg from '../utilities/icons/services-crm.svg';
import CRMImgHover from '../utilities/icons/services-crm-hover.svg';
import Image from "next/image";
import { useRouter } from "next/router";

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
    // {
    //     img: CRMImg,
    //     imgHover: CRMImgHover,
    //     title: {ru: 'CRM системы', kz: 'CRM жүйелері', en: 'CRM systems'},
    //     text: {ru: 'автоматизация и обслуживание бизнес-процессов', kz: 'бизнес-процестерді автоматтандыру және қызмет көрсету', en: 'automation and maintenance of business processes'}
    // },
];


const Services = () => {
    const {locale} = useRouter();
    return (
        <div id="services" className="block">
            <div className="container">
                <div className="text-box">
                    <div className="semibold-28-32"><FormattedMessage id="services.title" /></div>
                    <div className="regular-16-24"><FormattedMessage id="services.subtitle" /></div>
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
                                        <div className="card-title">{card.title[locale]}</div>
                                        <div className="card-text">{card.text[locale]}</div>
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