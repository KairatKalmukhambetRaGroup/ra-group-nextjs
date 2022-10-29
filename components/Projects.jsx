import React from "react";
import { FormattedMessage } from "react-intl";

import ProjectIrex from '../utilities/project-imgs/irex.png';
import ProjectIrexLogo from '../utilities/project-imgs/irex-logo.png';
import ProjectF from '../utilities/project-imgs/f.png';
import ProjectFLogo from '../utilities/project-imgs/f-logo.png';
import ProjectRagMirsot from '../utilities/project-imgs/rag-mirsot.png';
import ProjectRagMirsotLogo from '../utilities/project-imgs/rag-mirsot-logo.png';
import ProjectGen2 from '../utilities/project-imgs/gen2.png';
import Image from "next/image";
import { useRouter } from "next/router";

const cards = [
    {
        img: ProjectIrex,
        logo: ProjectIrexLogo,
        title: 'IREX',
        text: {ru: 'Предложение по передаче технологий для правительства Катар', kz: 'Катар Үкіметі үшін технологиялар трансферті туралы ұсыныс', en: 'Technology Transfer Proposal for the Government of Qatar'},
        bg: '#F2F2F2',
        color: '#090909',
        link: '',
    },
    {
        img: ProjectF,
        logo: ProjectFLogo,
        title: 'F',
        text: {ru: 'Корпоративная платформа коммуникаций', kz: 'Корпоративтік коммуникация платформасы', en: 'Corporate communications platform'},
        bg: '#E7E7E7',
        color: '#090909',
        link: '',
    },
    {
        img: ProjectRagMirsot,
        logo: ProjectRagMirsotLogo,
        title: 'RAG Mirsot',
        text: {ru: 'Консалтинговые услуги по разным отраслям и услугам', kz: 'Әртүрлі салалар мен қызметтерге кеңес беру қызметтері', en: 'Consulting services for various industries and services'},
        bg: '#FFFFFF',
        color: '#090909',
        link: '',
    },
    {
        img: ProjectGen2,
        title: 'Gen.2 MSSP.',
        text: {ru: 'Предложение по передаче технологий для правительства Катар', kz: 'Катар Үкіметі үшін технологиялар трансферті туралы ұсыныс', en: 'Technology Transfer Proposal for the Government of Qatar'},
        bg: '#645DD1',
        color: '#FFFFFF',
        link: '',
    },
];


const Projects = () => {
    const {locale} = useRouter();
    return (
        <div id="projects" className="block">
            <div className="container">
                <div className="text">
                    <div className="semibold-28-32"><FormattedMessage id="projects.title" /></div>
                    <div className="regular-16-24"><FormattedMessage id="projects.subtitle" /></div>
                </div>
            </div>
            
            <div className="cards">
                {cards && cards.map((card, key)=>(
                    <a className="card" href={card.link} key={key}>
                        <div className="img">
                            <Image src={card.img}/>
                        </div>
                        <div className="card-overlay" style={{background: card.bg, color: card.color}} >
                            <div className="card-body">
                                <div className="card-logo">
                                    {card.logo ? (
                                        <div className="img">
                                            <Image src={card.logo} />
                                        </div>
                                    ) : card.title}
                                </div>
                                <div className="card-text">{card.text[locale]}</div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>


        </div>
    )
};

export default Projects;