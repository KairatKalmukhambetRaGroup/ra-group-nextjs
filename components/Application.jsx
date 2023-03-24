import React, { useState } from "react";

import axios from 'axios';

import { useRouter } from "next/router";

const initialState = {devtype: null, name: '', companyName: '', email: '', phone: ''};
const initErrState = {devtype: '', name: '', companyName: '', email: '', phone: ''}

const dictionary = {
    title: {ru: 'Оставить заявку',kz: 'Өтінішті жіберіңіз',en: 'Leave an application'},
    step: {ru: 'Шаг', kz: 'Қадам', en: 'Step'},
    nextBtn: {ru: 'Продолжить', kz: 'Жалғастыру', en: 'Proceed'},
    sendBtn: {ru: 'Отправить', kz: 'Жіберу', en: 'Send'},

    devtypeTitle: {ru: 'Тип разработки', kz: 'Аутсорсинг', en: 'Outsourcing'},
    devtypeText: {ru: 'Выберите тип разработки который вам нужен', kz: 'Аутсорсинг', en: 'Outsourcing'},

    infoTitle: {ru: 'Ваши контактные данные', kz: 'Аутсорсинг', en: 'Outsourcing'},
    infoText: {ru: 'Контактные данные для связи с вами', kz: 'Аутсорсинг', en: 'Outsourcing'},

    developmentTitle: {ru: 'Разработка', kz: 'Әзірлеу', en: 'Development'},
    developmentText: {ru: 'У вас уже есть готовый дизайн', kz: 'Сізде дайын дизайн бар.', en: 'You already have a design'},

    designTitle: {ru: 'Дизайн', kz: 'Дизайн', en: 'Design'},
    designText: {ru: 'Нужен только дизайн', kz: 'Сізге тек дизайн қажет.', en: 'All you need is a design.'},

    fullDevTitle: {ru: 'Разработка + Дизайн', kz: 'Әзірлеу + Дизайн', en: 'Development + Design'},
    fullDevText: {ru: '', kz: '', en: ''},

    nameLabel: {ru: 'Имя Фамилия *', kz: 'Аты-жөні *', en: 'Fullname *'},
    companyNameLabel: {ru: 'Название компании', kz: 'Компанияның Аты', en: 'Company name'},
    emailLabel: {ru: 'Эл. адрес *', kz: 'Электрондық пошта *', en: 'Email *'},
    phoneLabel: {ru: 'Номер телефона *', kz: 'Телефон нөмері *', en: 'Phone number *'},
    
    emptyRadioError: {ru: 'Не выбран тип разработки', kz: '', el: ''},
    emptyFieldError: {ru: 'Заполните обязательное поле', kz: '', el: ''},
    emailError: {ru: 'Некорректный e-mail', kz: '', el: ''},
   
    successTitle: {ru: 'Ваша заявка успешно отправлена!', kz: 'Өтінішіңіз сәтті жіберілді!', en: 'Your application has been successfully sent!'},
    successText: {ru: 'Мы свяжемся с вами в ближайшее время', kz: 'Біз сізге жақын арада хабарласамыз', en: 'We will contact you as soon as possible'},
    successBtn: {ru: 'Оставить еще заявку', kz: 'Басқа өтініш қалдыру', en: 'Leave another application'},
    failTitle: {ru: 'Что-то пошло не так, попробуйте еще раз', kz: 'Бірдеңе дұрыс болмады, қайталап көріңіз', en: 'Something went wrong, please try again'},
    failBtn: {ru: 'Попробовать еще раз', kz: 'Қайталау', en: 'Try again'},
}

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
        setFormData({...formData, [name]: value});
        setErrors({...errors, [name]: ''});
        let cnt = 0;
        for (const key in formData) {
            if (Object.hasOwnProperty.call(formData, key)) {
                const data = formData[key];
                if(data && data.length>0)
                    cnt++;
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errs = initErrState;
        let errCount = 0;
        if(!formData.devtype){
            errs.devtype = dictionary.emptyRadioError[locale];
            setErrors({...errors, devtype: dictionary.emptyRadioError[locale]});
            errCount++;
        }
        if(!formData.name){
            errs.name = dictionary.emptyFieldError[locale];
            setErrors({...errors, name: dictionary.emptyFieldError[locale]});
            errCount++;
        }
        if(!formData.email){
            errs.email = dictionary.emptyFieldError[locale];
            setErrors({...errors, email: dictionary.emptyFieldError[locale]});
            errCount++;
        }else{
            if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)){
                errs.email = dictionary.emailError[locale];
                setErrors({...errors, email: dictionary.emailError[locale]});
                errCount++;
            }
        }
        if(!formData.phone){
            errs.phone = dictionary.emptyFieldError[locale];
            setErrors({...errors, phone: dictionary.emptyFieldError[locale]});
            errCount++;
        }
        // submit
        if(errCount === 0){
            setSubmitionResult(null);
            setIsSend(true);
            try {
                // const data = await API.post('/', {...formData, locale});
                const data = await axios.post('/api/applications', {...formData, lang: locale}, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
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
                <div className="text">
                    <div className="bold-40-48">{dictionary.title[locale]}</div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={`form ${isSend ? '' : 'active'}`}>
                        <div className="form-group">
                            <div className="text">
                                <div className="semibold-24-32">{dictionary.devtypeTitle[locale]}</div>
                                <div className="regular-16-24">{dictionary.devtypeText[locale]}</div>
                            </div>
                            <div className="radio-row">
                                <label className="col">
                                    <input type="radio" name="devtype" value="dev" checked={formData.devtype==='dev'} onChange={handleChange}/>
                                    <div className="radio">
                                        <div className="checkmark">
                                            <div className="radio-button">
                                                <div className="circle"></div>
                                            </div>
                                        </div>
                                        <div className="text">
                                            <div className="semibold-24-32">{dictionary.developmentTitle[locale]}</div>
                                            <div className="regular-16-24">{dictionary.developmentText[locale]}</div>
                                        </div>
                                    </div>
                                </label>

                                <label className="col">
                                    <input type="radio" name="devtype" value="design" checked={formData.devtype==='design'} onChange={handleChange}/>
                                    <div className="radio">
                                        <div className="checkmark">
                                            <div className="radio-button">
                                                <div className="circle"></div>
                                            </div>
                                        </div>
                                        <div className="text">
                                            <div className="semibold-24-32">{dictionary.designTitle[locale]}</div>
                                            <div className="regular-16-24">{dictionary.designText[locale]}</div>
                                        </div>
                                    </div>
                                </label>

                                <label className="col">
                                    <input type="radio" name="devtype" value="full" checked={formData.devtype==='full'} onChange={handleChange}/>
                                    <div className="radio">
                                        <div className="checkmark">
                                            <div className="radio-button">
                                                <div className="circle"></div>
                                            </div>
                                        </div>
                                        <div className="text">
                                            <div className="semibold-24-32">{dictionary.fullDevTitle[locale]}</div>
                                            <div className="regular-16-24">{dictionary.fullDevText[locale]}</div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                            {errors.devtype && (
                                <div className="error">{errors.devtype}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <div className="text">
                                <div className="semibold-24-32">{dictionary.infoTitle[locale]}</div>
                                <div className="regular-16-24">{dictionary.infoText[locale]}</div>
                            </div>
                            <div className="input-row">
                                <div className="col">
                                    <label className={`${formData.name ? '' : 'placeholder'}`} htmlFor="input_name">{dictionary.nameLabel[locale]}</label>
                                    <input type="text" name="name" id="input_name" value={formData.name} onChange={handleChange} />
                                    {errors.name && (
                                        <div className="error">{errors.name}</div>
                                    )}
                                </div>
                                <div className="col">
                                    <label className={`${formData.companyName ? '' : 'placeholder'}`} htmlFor="input_company">{dictionary.companyNameLabel[locale]}</label>
                                    <input type="text" name="companyName" id="input_company" value={formData.companyName} onChange={handleChange} />
                                </div>
                                <div className="col">
                                    <label className={`${formData.email ? '' : 'placeholder'} ${errors.email ? 'error' : ''}`} htmlFor="input_email">{dictionary.emailLabel[locale]}{!formData.email && ' (example@gmail.com)'}</label>
                                    <input type="text" name="email" id="input_email" value={formData.email} onChange={handleChange} />
                                    {errors.email && (
                                        <div className="error">{errors.email}</div>
                                    )}
                                </div>
                                <div className="col">
                                    <label className={`${formData.phone ? '' : 'placeholder'} ${errors.phone ? 'error' : ''}`} htmlFor="input_phone">{dictionary.phoneLabel[locale]}</label>
                                    <input type="text" name="phone" id="input_phone" value={formData.phone} onChange={handleChange} />
                                    {errors.phone && (
                                        <div className="error">{errors.phone}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="btns">
                            <button type="submit" className="btn">{dictionary.sendBtn[locale]}</button>
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
                                            <div className="semibold-16-24">{dictionary.successTitle[locale]}</div>
                                            <div className="regular-16-24">{dictionary.successText[locale]}</div>
                                        </div>
                                    ) : (                                    
                                        <div className="semibold-16-24">{dictionary.failTitle[locale]}</div>
                                    )}
                                </div>
                                <div className="btns">
                                    <button type="button" className="btn" onClick={clear}>
                                        {submitionResult === 'success' ? dictionary.successBtn[locale] : dictionary.failBtn[locale]}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="loading">
                                <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Application;