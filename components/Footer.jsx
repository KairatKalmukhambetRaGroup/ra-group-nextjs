import React from "react";
import { getLang } from "../utilities/lang";
import { FormattedMessage } from "react-intl";

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
                            <a href="tel:+77003002132" className="">+7 700 300 2132</a>
                            <div className="icons">
                                <a href="https://wa.me/77003002132" target="_blank" className="icon whatsapp"><i></i></a>
                                <a href="https://t.me/ragroupkz" target="_blank" className="icon telegram"><i></i></a>
                            </div>
                        </div>
                        <div className="col">
                            <a href="mailto:info@ragroup.org">info@ragroup.org</a>
                            <div><FormattedMessage id="footer.location" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;