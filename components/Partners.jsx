import React from "react";
import { FormattedMessage } from "react-intl";

import RagMirsot from '../utilities/partners/rag-mirsot.svg';
import Irex from '../utilities/partners/irex.png';
import RagZakyatInvestment from '../utilities/partners/rag-zakyat-investment.svg';
import F from '../utilities/partners/f.png';
import Image from "next/image";
import { useRouter } from "next/router";

const cards = [
    {
        img: RagMirsot,
        mainBg: '#FFFFFF',
        bg: '#2768C4',
        color: '#FFFFFF',
        name: 'RAG Mirsot',
        text: {
            ru: 'Консалтинговые услуги по разным отраслям и услугам.',
            kz: 'Әртүрлі салалар мен қызметтердегі кеңес беру қызметтері.',
            en: 'Consulting services in various industries and services.'
        }
    },
    {
        img: Irex,
        mainBg: '#E7E7E7',
        bg: '#262729',
        color: '#FFFFFF',
        name: 'IREX',
        text: {
            ru: 'Предложение по передаче технологий для правительства Катар',
            kz: 'Катар Үкіметі үшін технологиялар трансферті туралы ұсыныс',
            en: 'Technology Transfer Proposal for the Government of Qatar'
        }
    },
    {
        img: RagZakyatInvestment,
        mainBg: '#0A0A0A',
        bg: '#EBB249',
        border: '#FFFFFF',
        color: '#090909',
        name: 'RAG ZAKYAT IVESTMENT',
        text: {
            ru: 'Инвестиционная компания',
            kz: 'Инвестициялық компания',
            en: 'Investment company'
        }
    },
    {
        img: F,
        mainBg: '#E7E7E7',
        bg: '#00A944',
        color: '#FFFFFF',
        name: 'F',
        text: {
            ru: 'Корпоративная платформа',
            kz: 'Кәсіпорын платформасы',
            en: 'Enterprise platform'
        }
    },
];

const dictionary = {
    title: {
        ru: 'Партнеры',
        kz: 'Серіктестер',
        en: 'Partners'
    },
    subtitle: {
        ru: 'Список наших партнеров, с которыми мы реализовали проекты',
        kz: 'Біз жобаларды жүзеге асырған серіктестеріміздің тізімі',
        en: 'List of our partners with whom we have completed projects'    
    }
}

const Partners = () => {
    const {locale} = useRouter();
    return (
        <div id="partners" className="block">
            <div className="container">
                <div className="text">
                    <div className="bold-32-40 bold-40-48-lg text-black-8"><FormattedMessage id="partners.title" /></div>
                    <div className="regular-20-28"><FormattedMessage id="partners.subtitle" /></div>
                </div>

                <div className="cards">
                    {cards && cards.map((card, key)=>(
                        <div className="card" key={key}>
                            <div className="card-default" style={{background: card.mainBg, border: card.border ? `1px solid ${card.border}` : 'none'}}>
                                <div className="img">
                                    <Image src={card.img} />                                 
                                </div>
                            
                            </div>
                            <div className="card-overlay" style={{background: card.bg, color: card.color}}>
                                <div className="card-body">
                                    <div className="card-title">{card.name}</div>
                                    <div className="card-text">{card.text[locale]}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Partners;