import React from "react";
import { getLang } from "../utilities/lang";
import { FormattedMessage } from "react-intl";

const dictionary = {
    userAgreement: {ru: 'Пользовательское соглашение', kz: 'Пайдаланушы келісімі', en: 'User Agreement'},
    generalTermsAndConditions: {ru: 'Общие положения и условия', kz: 'Жалпы ережелер мен шарттар', en: 'General terms and conditions'},
    location: {
        ru: 'Казахстан, город Нур-Султан, район Есиль, Проспект Мангилик Ел, здание 55/22, блоки C4.3, офис 140, почтовый индекс Z05T3F5', 
        kz: 'Қазақстан, Нұр-Сұлтан қ., Есіл ауданы, Мәңгілік Ел даңғылы, 55/22 корпус, С4.3 блоктары, 140 кеңсе, индекс Z05T3F5', 
        en: 'Kazakhstan, Nur-Sultan city, Yesil district, Mangilik El Avenue, building 55/22, blocks C4.3, office 140, postal code Z05T3F5'},
}

const Footer = ({lang}) =>{
    // const lang = getLang();
    return (
        <footer id="footer">
            <div className="container">
                <div className="footer-content">
                    <a href="" className="footer-logo">
                        <i></i>
                    </a>
                    <div className="row">
                        <div className="col">
                            <div>
                                <FormattedMessage id="footer.user.agreement" />
                                <br/>
                                <FormattedMessage id="footer.generalterms" />
                            </div>
                        </div>
                        <div className="col">
                            <a href="mailto:info@ragroup.org">info@ragroup.org</a>
                            <a href="tel:+77000882227" className="">+7 700 088 2227</a>
                            <div><FormattedMessage id="footer.location" /></div>
                            <div className="icons">
                                <a href="https://wa.me/77000882227" target="_blank" className="icon whatsapp"><i></i></a>
                                <a href="https://t.me/Bastatonaring" target="_blank" className="icon telegram"><i></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;