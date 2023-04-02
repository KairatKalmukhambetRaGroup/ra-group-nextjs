import React from "react";
import { FormattedMessage } from "react-intl";


const About = () => {
    return (
        <div id="about" className="block">
            <div className="container">
                <div className="bold-32-40 bold-40-48-lg text-black-8 mb-56">// <FormattedMessage id="about.title" /></div>
                <div className="content">
                    <div id="aboutImg">
                        <i></i>
                    </div>
                    <div className="text">
                        <div className="bold-40-44 text-black"><FormattedMessage id="about.heading" /></div>
                        <div className="text-body">
                            <div className="text-purple bold-28-28"><FormattedMessage id="about.subheading" /></div>
                            <div className="text-black regular-24-28"><FormattedMessage id="about.text" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default About;