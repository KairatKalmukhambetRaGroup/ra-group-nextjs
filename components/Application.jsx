import React, { useState } from "react";

import axios from 'axios';
import { FormattedMessage,  } from "react-intl";
import { useRouter } from "next/router";

const initialState = {platform: [],devtype: null, name: '', companyName: '', email: '', phone: ''};
const initErrState = {devtype: '', name: '', email: '', phone: ''}

// const API = axios.create({baseURL: 'http://localhost:3000/api/applications', validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"} });

const Application = () => {
    const {locale} = useRouter();

    const [isSend, setIsSend] = useState(false);

    const [formData, setFormData] = useState(initialState);

    const [errors, setErrors] = useState(initErrState);
    const [submitionResult, setSubmitionResult] = useState('');

    const handleChange = (e) =>{
        // e.preventDefault();
        const name = e.currentTarget.name;
        let value = e.currentTarget.value;
        if(name === 'platform'){
            let pl = [];
            pl = formData.platform;
            var index = pl.indexOf(value);
            if (index === -1) {
                pl.push(value);
            } else {
                pl.splice(index, 1);
            }
            setFormData({...formData, [name]: pl});
        }
        else if (name === 'phone'){
            if(/^\+?([-\s]?[0-9][-\s]?)*$/.test(value)){
                setFormData({...formData, [name]: value});
            }
        }
        else{
            setFormData({...formData, [name]: value});
            setErrors({...errors, [name]: ''});
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errs = initErrState;
        let errCount = 0;
        if(!formData.devtype){
            errs.devtype = 'service';
            setErrors({...errors, devtype: 'service'});
            errCount++;
        }
        if(!formData.name){
            errs.name = 'empty';
            setErrors({...errors, name: 'empty'});
            errCount++;
        }
        if(!formData.email){
            errs.email = 'empty';
            setErrors({...errors, email: 'empty'});
            errCount++;
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)){
            errs.email = 'email';
            setErrors({...errors, email: 'email'});
            errCount++;
        }
        if(!formData.phone){
            errs.phone = 'empty';
            setErrors({...errors, phone: 'empty'});
            errCount++;
        }
        // submit
        if(errCount === 0){
            setSubmitionResult(null);
            setIsSend(true);
            try {
                const data = await axios.post('/api/applications', {...formData, lang: locale, phone: formData.phone.replace(' ', '')}, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
                if(data.status >= 200 && data.status < 300)
                    setSubmitionResult('success');
                else
                    setSubmitionResult('fail');
            } catch (error) {
                setSubmitionResult('fail');
            }
        }else{
            // setErrors(errs);
        }
    }

    const clear = (e) =>{
        e.preventDefault();
        setFormData(initialState);
        setErrors(initErrState);
        setReadyToSend(false);
        setIsSend(false);
    }

    return (
        <div id="application" >
            <div className="container">
                <div className="content">
                    <div className="bold-32-40 bold-40-48-lg text-white-8">// <FormattedMessage id="application.title" /></div>
                    <form onSubmit={handleSubmit}>
                        <div className={`form ${isSend ? '' : 'active'}`}>
                            <div className="form-group">
                                <div className="text">
                                    <div className="regular-20-28 text-white"><FormattedMessage id="application.platform.label" /></div>
                                </div>
                                <div className="radio-row">
                                    <label className="col">
                                        <input type="checkbox" name="platform" value="mobile" checked={formData.platform.includes('mobile')} onChange={handleChange}/>
                                        <div className="checkbox">
                                            <div className="bold-20-24 mobile"><i></i> <FormattedMessage id="application.platform.mobile" /></div>
                                        </div>
                                    </label>

                                    <label className="col">
                                        <input type="checkbox" name="platform" value="web" checked={formData.platform.includes('web')} onChange={handleChange}/>
                                        <div className="checkbox">
                                            <div className="bold-20-24 web"><i></i> <FormattedMessage id="application.platform.web" /></div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="text">
                                    <div className="regular-20-28 text-white"><FormattedMessage id="application.service.label" /></div>
                                </div>
                                <div className="radio-row">
                                    <label className="col">
                                        <input type="radio" name="devtype" value="dev" checked={formData.devtype==='dev'} onChange={handleChange}/>
                                        <div className="radio">
                                            <div className="bold-20-24"><FormattedMessage id="application.service.design.title" /></div>
                                            <div className="regular-16-20"><FormattedMessage id="application.service.design.description" /></div>
                                        </div>
                                    </label>

                                    <label className="col">
                                        <input type="radio" name="devtype" value="design" checked={formData.devtype==='design'} onChange={handleChange}/>
                                        <div className="radio">
                                            <div className="bold-20-24"><FormattedMessage id="application.service.layout.title" /></div>
                                            <div className="regular-16-20"><FormattedMessage id="application.service.layout.description" /></div>
                                        </div>
                                    </label>

                                    <label className="col">
                                        <input type="radio" name="devtype" value="full" checked={formData.devtype==='full'} onChange={handleChange}/>
                                        <div className="radio">
                                            <div className="bold-20-24"><FormattedMessage id="application.service.full.title" /></div>
                                        </div>
                                    </label>
                                </div>
                                {errors.devtype && (
                                    <div className="error"><FormattedMessage id={`application.error.${errors.devtype}`} /></div>
                                )}
                            </div>
                            <div className="form-group">
                                <div className="text">
                                    <div className="regular-20-28 text-white"><FormattedMessage id="application.contacts.label" /></div>
                                </div>
                                <div className="input-row">
                                    <div className="col">
                                        <label className={`${formData.name ? '' : 'placeholder'}`} htmlFor="input_name"><FormattedMessage id="application.contacts.name" /></label>
                                        <input type="text" name="name" id="input_name" className={formData.name ? 'filled' : ''} value={formData.name} onChange={handleChange} />
                                        {errors.name && (
                                            <div className="error"><FormattedMessage id={`application.error.${errors.name}`} /></div>                                      
                                        )}
                                    </div>
                                    <div className="col">
                                        <label className={`${formData.companyName ? '' : 'placeholder'}`} htmlFor="input_company"><FormattedMessage id="application.contacts.company" /></label>
                                        <input type="text" name="companyName" id="input_company" className={formData.companyName ? 'filled' : ''} value={formData.companyName} onChange={handleChange} />
                                    </div>
                                    <div className="col">
                                        <label className={`${formData.email ? '' : 'placeholder'} ${errors.email ? 'error' : ''}`} htmlFor="input_email"><FormattedMessage id="application.contacts.email" />{!formData.email && ' (example@gmail.com)'}</label>
                                        <input type="text" name="email" id="input_email" className={formData.email ? 'filled' : ''} value={formData.email} onChange={handleChange} />
                                        {errors.email && (
                                            <div className="error"><FormattedMessage id={`application.error.${errors.email}`} /></div>                                      
                                        )}
                                    </div>
                                    <div className="col">
                                        <label className={`${formData.phone ? '' : 'placeholder'} ${errors.phone ? 'error' : ''}`} htmlFor="input_phone"><FormattedMessage id="application.contacts.phone" /></label>
                                        <input type="tel" name="phone" id="input_phone" className={formData.phone ? 'filled' : ''} value={formData.phone} onChange={handleChange} />
                                        {errors.phone && (
                                            <div className="error"><FormattedMessage id={`application.error.${errors.phone}`} /></div>                                      
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="btns">
                                <button type="submit" className="btn">
                                    <FormattedMessage id="application.send" />
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.6213 3.95312L13.668 7.99979L9.6213 12.0465" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M2.33469 8H13.5547" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className={`response ${isSend ? 'active' : ''}`}>
                            {submitionResult ? (
                                <>
                                    <div className="final-step">
                                        <div className={`image ${submitionResult}`}>
                                            <i></i>
                                        </div>
                                        {submitionResult === 'success' ? (
                                            <div className="text-center">
                                                <div className="bold-24-28"><FormattedMessage id="application.success.title" /></div>
                                                <div className="regular-20-24"><FormattedMessage id="application.success.text" /></div>
                                            </div>
                                        ) : (                                    
                                            <div className="bold-20-24"><FormattedMessage id="application.fail.title" /></div>
                                        )}
                                    </div>
                                    <div className="btns">
                                        <button type="button" className="btn" onClick={clear}>
                                            {submitionResult === 'success' ? (<FormattedMessage id="application.success.button" />) : (<FormattedMessage id="application.fail.button" />)}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="loading white">
                                    <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Application;