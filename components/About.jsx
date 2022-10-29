import React from "react";
import { FormattedMessage } from "react-intl";


const About = () => {
    return (
        <div id="about" className="block">
            <div className="container">
                <div className="title">
                    <FormattedMessage id="about.title" />
                </div>
                <div className="content">
                    <div id="aboutImg">
                        <i></i>
                    </div>
                    <div className="text">
                        <div className="bold-32-40 bold-40-48-lg"><FormattedMessage id="about.heading" /></div>
                        <div className="text-body">
                            <div><FormattedMessage id="about.subheading" /></div>
                            <div><FormattedMessage id="about.text" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default About;