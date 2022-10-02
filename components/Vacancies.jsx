import React from "react";
import { getLang } from "../utilities/lang";


const vacancies = [
    {
        category: {ru:'Разработка', kz: 'Разработка', en: 'Development'},
        jobs: [
            'Machine Learning Engineer (специалист по машинному обучению)',
            'Backend-разработчик PHP',
            'Product Designer',
            'IOS-разработчик',
            'Middle Web QA Engineer'
        ]
    },
    {
        category: {ru:'Менеджмент', kz: 'Менеджмент', en: 'Management'},
        jobs: [
            'Product Manager/Продукт-Менеджер и другие'
        ]
    },
    {
        category: {ru:'Сервис', kz: 'Қызмет', en: 'Service'},
        jobs: [
            'Специалист службы поддержки проектов'
        ]
    },

];

const dictionary = {
    title: {ru: 'Вакансии', kz: 'Бос жұмыс орындары', en: 'Job vacancies'},
    subtitle: {ru: 'Кого мы ищем?', kz: 'Біз кімді іздейміз?', en: 'Who are we looking for?'},
    notFound: {ru: 'Вы не нашли подходящую вакансию?\nНапишите о себе и отправьте резюме на', kz: 'Сәйкес бос жұмыс орнын таппадыңыз ба?\nӨзіңіз туралы жазып, түйіндемеңізді', en: 'Didn\'t find a suitable vacancy?\nWrite about yourself and send your CV to'},
    motFoundMore: {ru: '', kz: 'мекенжайына жіберіңіз.', en: ''},
}

const Vacancies = () => {
    const lang = getLang();
    return (
        <div id="vacancies" className="block" >
            <div className="container">
                <div className="content">
                    <div className="semibold-28-32">{dictionary.title[lang]}</div>
                    <div>
                        <div className="semibold-28-32 color-purple">{dictionary.subtitle[lang]}</div>
                        <div className="cols">
                            {vacancies.map((vacancy, key)=>(
                                <div className="vacancy" key={key}>
                                    <div className="semibold-16-24">{vacancy.category[lang]}</div>
                                    <div className="jobs">
                                        {vacancy.jobs.map((job, j)=>(
                                            <div className="job" key={j}>{job}</div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="more">
                        {dictionary.notFound[lang]} <a href="mailto:hr@ragroup.org">hr@ragroup.org</a> {dictionary.motFoundMore[lang]}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Vacancies;