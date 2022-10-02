import React from "react";
import { getLang } from "../utilities/lang";


const dictionary = {
    userAgreement: {ru: 'Пользовательское соглашение', kz: 'Пайдаланушы келісімі', en: 'User Agreement'},
    generalTermsAndConditions: {ru: 'Общие положения и условия', kz: 'Жалпы ережелер мен шарттар', en: 'General terms and conditions'},
    location: {
        ru: 'Казахстан, город Нур-Султан, район Есиль, Проспект Мангилик Ел, здание 55/22, блоки C4.3, офис 140, почтовый индекс Z05T3F5', 
        kz: 'Қазақстан, Нұр-Сұлтан қ., Есіл ауданы, Мәңгілік Ел даңғылы, 55/22 корпус, С4.3 блоктары, 140 кеңсе, индекс Z05T3F5', 
        en: 'Kazakhstan, Nur-Sultan city, Yesil district, Mangilik El Avenue, building 55/22, blocks C4.3, office 140, postal code Z05T3F5'},
    text: {ru: '', kz: '', en: ''},
    text: {ru: '', kz: '', en: ''},
    text: {ru: '', kz: '', en: ''},
    text: {ru: '', kz: '', en: ''},
}

const Footer = () =>{
    const lang = getLang();
    return (
        <footer id="footer">
            <div className="container">
                <div className="footer-content">
                    <a href="/" className="footer-logo">
                        <i></i>
                    </a>
                    <div className="row">
                        <div className="col">
                            <div>
                                {dictionary.userAgreement[lang]}
                                <br/>
                                {dictionary.generalTermsAndConditions[lang]}
                            </div>
                        </div>
                        <div className="col">
                            <a href="mailto:info@ragroup.org">info@ragroup.org</a>
                            <div>{dictionary.location[lang]}</div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;