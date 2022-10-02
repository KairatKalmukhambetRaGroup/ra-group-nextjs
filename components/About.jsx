import React, { useEffect } from "react";
import {getLang} from '../utilities/lang';

const dictionary = {
    title: {
        ru: 'О нас',
        kz: 'Біз туралы',
        en: 'About Us'
    },
    heading: {
        ru: 'RA Group Ltd.\nзанимается исследованиями и разработкой в сфере IT',
        kz: 'RA Group Ltd.\nIT саласындағы ғылыми-зерттеу және тәжірибелік-конструкторлық жұмыстармен айналысады',
        en: 'RA Group Ltd.\nis engaged in research and development in the IT field'
    },
    subheading: {
        ru: 'Является участником международного финансового центра Астана и Astana HUB',
        kz: 'Астана халықаралық қаржы орталығының және Astana HUB-тың мүшесі',
        en: 'Member of the International Financial Center Astana and Astana HUB'
    },
    text: {
        ru: 'Мы разрабатываем продукты в сфере информационных систем; упрощаем и автоматизируем рабочие процессы; снижаем риски и потерь в бизнесе наших клиентов;',
        kz: 'Біз ақпараттық жүйелер саласындағы өнімдерді әзірлейміз; жұмыс процестерін жеңілдету және автоматтандыру; клиенттеріміздің бизнесіндегі тәуекелдер мен шығындарды азайтамыз;',
        en: 'We develop products in the field of information systems; simplify and automate work processes; reduce risks and losses in the business of our clients;'
    },
}

const About = () => {
    const lang = getLang();
    return (
        <div id="about" className="block">
            <div className="container">
                <div className="title">
                    {dictionary.title[lang]}
                </div>
                <div className="content">
                    <div id="aboutImg">
                        <i></i>
                    </div>
                    <div className="text">
                        <div className="bold-32-40 bold-40-48-lg">{dictionary.heading[lang]}</div>
                        <div className="text-body">
                            <div>{dictionary.subheading[lang]}</div>
                            <div>{dictionary.text[lang]}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default About;