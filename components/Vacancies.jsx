import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";


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


const Vacancies = ({lang}) => {
    const {locale} = useRouter();
    return (
        <div id="vacancies" className="block" >
            <div className="container">
                <div className="content">
                    <div className="semibold-28-32"><FormattedMessage id="vacancies.title" /></div>
                    <div>
                        <div className="semibold-28-32 color-purple"><FormattedMessage id="vacancies.subtitle" /></div>
                        <div className="cols">
                            {vacancies.map((vacancy, key)=>(
                                <div className="vacancy" key={key}>
                                    <div className="semibold-16-24">{vacancy.category[locale]}</div>
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
                        <FormattedMessage id="vacancies.notfound" /> <a href="mailto:hr@ragroup.org">info@ragroup.org</a> <FormattedMessage id="vacancies.notfound.more" />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Vacancies;