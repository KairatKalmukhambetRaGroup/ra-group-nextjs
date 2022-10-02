import React from "react";


import ProjectIrex from '../utilities/project-imgs/irex.png';
import ProjectIrexLogo from '../utilities/project-imgs/irex-logo.png';
import ProjectF from '../utilities/project-imgs/f.png';
import ProjectFLogo from '../utilities/project-imgs/f-logo.png';
import ProjectRagMirsot from '../utilities/project-imgs/rag-mirsot.png';
import ProjectRagMirsotLogo from '../utilities/project-imgs/rag-mirsot-logo.png';
import ProjectGen2 from '../utilities/project-imgs/gen2.png';
import { getLang } from "../utilities/lang";
import Image from "next/image";

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

const dictionary = {
    title: {ru: 'Проекты', kz: 'Жобалар', en: 'Projects'},
    subtitle: {
        ru: 'Наши проекты, которые мы проанализировали и реализовали на сегодняшний день.\nНаша команда в каждом проекте использует все необходимые, возможные и креативные способы и источники для реализации качественных продуктов.', 
        kz: 'Біздің бүгінгі күнге дейін талдап, іске асырған жобаларымыз.\nБіздің команда әр жобада сапалы өнімдерді енгізу үшін барлық қажетті, мүмкін және шығармашылық жолдар мен көздерді пайдаланады.', 
        en: 'Our projects that we have analyzed and implemented to date.\nOur team in each project uses all the necessary, possible and creative ways and sources to implement quality products.'
    }
}

const Projects = () => {
    const lang = getLang();
    return (
        <div id="projects" className="block">
            <div className="container">
                <div className="text">
                    <div className="semibold-28-32">{dictionary.title[lang]}</div>
                    <div className="regular-16-24">{dictionary.subtitle[lang]}</div>
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
                                <div className="card-text">{card.text[lang]}</div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>


        </div>
    )
};

export default Projects;