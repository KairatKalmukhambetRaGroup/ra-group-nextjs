import React, { useEffect, useState } from "react";

import axios from 'axios';

import MobileIcon from '../utilities/icons/iphone-icon.svg';
import LaptopIcon from '../utilities/icons/laptop-icon.svg';
import CRMIcon from '../utilities/icons/crm-icon.svg';
import MoreVerticalIcon from '../utilities/icons/more-vertical-icon.svg';
import { getLang } from "../utilities/lang";
import Image from "next/image";

const initialState = {format: null, os: [], firstname: '', lastname: '', companyName: '', email: ''};
const initErrState = {format: '', os: '', firstname: '', lastname: '', companyName: '', email: ''}

const osArr = [
    {
        value: 'mobile',
        text: {ru: 'Мобильное приложение', kz: 'Мобильді қолданба', en: 'Mobile app'},
        img: MobileIcon
    },
    {
        value: 'web',
        text: {ru: 'Веб платформа', kz: 'Веб платформа', en: 'Web platform'},
        img: LaptopIcon
    },
    {
        value: 'crm',
        text: {ru: 'CRM система', kz: 'CRM жүйесі', en: 'CRM system'},
        img: CRMIcon
    },
    {
        value: 'other',
        text: {ru: 'Другое', kz: 'Басқа', en: 'Other'},
        img: MoreVerticalIcon
    },
];

const dictionary = {
    title: {ru: 'Оставить заявку',kz: 'Өтінішті жіберіңіз',en: 'Leave an application'},
    step: {ru: 'Шаг', kz: 'Қадам', en: 'Step'},
    groupLabels: [
        {ru: '', kz: '', en: ''},
        {ru: 'Выберите формат', kz: 'Форматты таңдаңыз', en: 'Choose format'},
        {ru: 'Выберите ПО (можете выбрать несколько)', kz: 'Бағдарламалық құралды таңдаңыз (біреуден көп таңдауға болады)', en: 'Select software (you can choose more than one)'},
        {ru: 'Заполните анкету', kz: 'Форманы толтырыңыз', en: 'Fill in the form'}
    ],
    nextBtn: {ru: 'Продолжить', kz: 'Жалғастыру', en: 'Proceed'},
    sendBtn: {ru: 'Отправить', kz: 'Жіберу', en: 'Send'},
    outsourceTitle: {ru: 'Аутсорсинг', kz: 'Аутсорсинг', en: 'Outsourcing'},
    outsourceText: {ru: 'Заказная разработка', kz: 'Арнайы әзірлеу', en: 'Custom development'},
    productionTitle: {ru: 'Продуктовая разработка', kz: 'Өнімді әзірлеу', en: 'Product development'},
    productionText: {ru: 'Cоздание и вывод на рынок продукта', kz: 'Нарыққа тауарды жасау және шығару', en: 'Creation and launch of the product'},
    firstnameLabel: {ru: 'Имя', kz: 'Аты', en: 'First name'},
    lastnameLabel: {ru: 'Фамилию', kz: 'Тегі', en: 'Last name'},
    companyNameLabel: {ru: 'Название компании', kz: 'Компанияның Аты', en: 'Company name'},
    emailLabel: {ru: 'Эл. адрес', kz: 'Электрондық пошта', en: 'Email'},
    successTitle: {ru: 'Ваша заявка успешно отправлена!', kz: 'Өтінішіңіз сәтті жіберілді!', en: 'Your application has been successfully sent!'},
    successText: {ru: 'Мы свяжемся с вами в ближайшее время', kz: 'Біз сізге жақын арада хабарласамыз', en: 'We will contact you as soon as possible'},
    successBtn: {ru: 'Оставить еще заявку', kz: 'Басқа өтініш қалдыру', en: 'Leave another application'},
    failTitle: {ru: 'Что-то пошло не так, попробуйте еще раз', kz: 'Бірдеңе дұрыс болмады, қайталап көріңіз', en: 'Something went wrong, please try again'},
    failBtn: {ru: 'Попробовать еще раз', kz: 'Қайталау', en: 'Try again'},
}

// const API = axios.create({baseURL: 'http://localhost:3000/api/applications', validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"} });

const Application = ({lang}) => {
    // const lang = getLang();

    const [formData, setFormData] = useState(initialState);
    const [currentStep, setCurrentStep] = useState(1);
    const [readyToSend, setReadyToSend] = useState(false);

    const [errors, setErrors] = useState(initErrState);
    const [submitionResult, setSubmitionResult] = useState('');

    const handleChange = (e) =>{
        // e.preventDefault();
        const name = e.currentTarget.name;
        let value = e.currentTarget.value;
        switch (name) {
            case 'os':
                let newOS = formData.os;
                if(newOS.includes(value))
                    newOS = newOS.filter(el => el !== value);
                else    
                    newOS.push(value);
                setFormData({...formData, os: newOS});

                break;
            default:
                setFormData({...formData, [name]: value});
                break;
        }
        let cnt = 0;
        for (const key in formData) {
            if (Object.hasOwnProperty.call(formData, key)) {
                const data = formData[key];
                if(data && data.length>0)
                    cnt++;
            }
        }
        if(cnt === 6)
            setReadyToSend(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let readyToSubmit = true;
        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)){
            setErrors({...errors, email: 'Некорректный e-mail'});
            readyToSubmit = false;
        }else{
            setErrors({...errors, email: ''});
        }
        // submit
        if(readyToSubmit){
            setSubmitionResult(null);
            setCurrentStep(4);
            try {
                // const data = await API.post('/', {...formData, lang});
                const data = await axios.post('/api/applications', {...formData, lang}, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
                if(data.status >= 200 && data.status < 300)
                    setSubmitionResult('success');
                else
                    setSubmitionResult('fail');
            } catch (error) {
                setSubmitionResult('fail');
            }
        }
    }

    const clear = (e) =>{
        e.preventDefault();
        setFormData(initialState);
        setErrors(initErrState);
        setReadyToSend(false);
        setCurrentStep(1);
    }

    return (
        <div id="application" >
            <div className="container">
                <div className="text">
                    <div className="bold-40-48">{dictionary.title[lang]}</div>
                    <div id="progress-bar">
                        <div className={`progress ${currentStep<3 ? `progress-${currentStep}` : ''}`}></div>
                    </div>
                    {currentStep<4 && (
                        <div className="text">
                            <div className="semibold-24-32">{dictionary.step[lang]} {currentStep}/3</div>
                            <div className="regular-16-24">{dictionary.groupLabels[currentStep][lang]}</div>
                        </div>
                    )}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={`form-group ${currentStep===1 ? 'active' : ''}`}>
                        <div className="radio-row">
                            <label className="col">
                                <input type="radio" name="format" value="outsource" checked={formData.format==='outsource'} onChange={handleChange}/>
                                <div className="radio">
                                    <div className="checkmark">
                                        <div className="radio-button">
                                            <div className="circle"></div>
                                        </div>
                                    </div>
                                    <div className="text">
                                        <div className="semibold-24-32">{dictionary.outsourceTitle[lang]}</div>
                                        <div className="regular-16-24">{dictionary.outsourceText[lang]}</div>
                                    </div>
                                </div>
                            </label>

                            <label className="col">
                                <input type="radio" name="format" value="production" checked={formData.format==='production'} onChange={handleChange}/>
                                <div className="radio">
                                    <div className="checkmark">
                                        <div className="radio-button">
                                            <div className="circle"></div>
                                        </div>
                                    </div>
                                    <div className="text">
                                        <div className="semibold-24-32">{dictionary.productionTitle[lang]}</div>
                                        <div className="regular-16-24">{dictionary.productionText[lang]}</div>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div className="btns">
                            <button type="button" className="btn" disabled={!formData.format} onClick={(e)=>{e.preventDefault(); setCurrentStep(2)}}>{dictionary.nextBtn[lang]}</button>
                        </div>
                    </div>
                    <div className={`form-group ${currentStep===2 ? 'active' : ''}`}>
                        <div className="os-row">
                            {osArr && osArr.map((os, key)=>(
                                <label className="col" key={key}>
                                    <input type="checkbox" name="os" value={os.value} checked={formData.os && formData.os.includes(os.value)} onChange={handleChange}/>
                                    <div className="os">
                                        <div className="os-body">
                                            <div className="os-image">
                                                <div className="img">
                                                   <Image src={os.img} alt={os.text[lang]}/>
                                                </div>
                                            </div>
                                            <div className="semibold-16-24">{os.text[lang]}</div>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                        <div className="btns">
                            <button type="button" className="btn" disabled={formData.os.length===0} onClick={(e)=>{e.preventDefault(); setCurrentStep(3)}}>{dictionary.nextBtn[lang]}</button>
                        </div>
                    </div>
                    <div className={`form-group ${currentStep===3 ? 'active' : ''}`}>
                        <div className="input-row">
                            <div className="col">
                                <label className={`${formData.firstname ? '' : 'placeholder'}`} htmlFor="input_firstname">{dictionary.firstnameLabel[lang]}</label>
                                <input type="text" name="firstname" id="input_firstname" value={formData.firstname} onChange={handleChange} />
                            </div>
                            <div className="col">
                                <label className={`${formData.lastname ? '' : 'placeholder'}`} htmlFor="input_lastname">{dictionary.lastnameLabel[lang]}</label>
                                <input type="text" name="lastname" id="input_lastname" value={formData.lastname} onChange={handleChange} />
                            </div>
                            <div className="col">
                                <label className={`${formData.companyName ? '' : 'placeholder'}`} htmlFor="input_company">{dictionary.companyNameLabel[lang]}</label>
                                <input type="text" name="companyName" id="input_company" value={formData.companyName} onChange={handleChange} />
                            </div>
                            <div className="col">
                                <label className={`${formData.email ? '' : 'placeholder'} ${errors.email ? 'error' : ''}`} htmlFor="input_email">{dictionary.emailLabel[lang]}{!formData.email && ' (example@gmail.com)'}</label>
                                <input type="text" name="email" id="input_email" value={formData.email} onChange={handleChange} />
                                <div className="error">{errors.email}</div>
                            </div>
                        </div>
                        <div className="btns">
                            <button type="submit" className="btn" disabled={!readyToSend}>{dictionary.sendBtn[lang]}</button>
                        </div>
                    </div>
                    <div className={`form-group ${currentStep===4 ? 'active' : ''}`}>
                        {submitionResult ? (
                            <>
                                <div className="final-step">
                                    <div className={`image ${submitionResult}`}>
                                        <i></i>
                                    </div>
                                    {submitionResult === 'success' ? (
                                        <div className="text-center">
                                            <div className="semibold-16-24">{dictionary.successTitle[lang]}</div>
                                            <div className="regular-16-24">{dictionary.successText[lang]}</div>
                                        </div>
                                    ) : (                                    
                                        <div className="semibold-16-24">{dictionary.failTitle[lang]}</div>
                                    )}
                                </div>
                                <div className="btns">
                                    <button type="button" className="btn" onClick={clear}>
                                        {submitionResult === 'success' ? dictionary.successBtn[lang] : dictionary.failBtn[lang]}
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