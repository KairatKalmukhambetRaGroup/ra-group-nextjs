import React, { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";

import RagmirsotLogo from '../utilities/project-imgs/ragmirsot-logo.svg';
import ZakyatLogo from '../utilities/project-imgs/zakyat-logo.svg';
import QRCoderLogo from '../utilities/project-imgs/qrcoder-logo.svg';

import RagmirsotScreenshot from '../utilities/project-imgs/ragmirsot-screenshot.png';
import ZakyatScreenshot from '../utilities/project-imgs/zakyat-screenshot.png';
import QRCoderScreenshot from '../utilities/project-imgs/qrcoder-screenshot.png';

import Image from "next/image";
import { useRouter } from "next/router";

const carousel = [
    {
        logo: RagmirsotLogo,
        image: RagmirsotScreenshot,
        imgHasPadding: true,
        bg: "#E7E7E7",
        btnColor: "#090909",
        btnBackground: "#FFFFFF",
        btnBorder: "none",
        textColor: "#090909",
        link: "https://ragmirsot.com",
        description: {
            ru: "Компания занимается консалтинговыми услугами для различных отраслей промышленности и сферы услуг.",
            en: "",
            kz: ""
        },
        works: [
            {
                ru: "Дизайн логотипа и айдентики",
                en: "Logo and identity design",
                kz: "Логотип және айдентика дизайны",
            },
            {
                ru: "Дизайн сайта и админ панели",
                en: "Design of webite and admin panel",
                kz: "Веб-сайт пен әкімші панелінің дизайны",
            },
            {
                ru: "Верстка сайта и админ панели",
                en: "Webite and admin panel layout",
                kz: "Веб-сайт және әкімші панелінің версткасы",
            },
        ]
    },
    {
        logo: ZakyatLogo,
        image: ZakyatScreenshot,
        imgHasPadding: true,
        bg: "linear-gradient(105.9deg, #474747 2.04%, #1D1D1D 97.69%)",
        btnColor: "#FFFFFF",
        btnBackground: "none",
        btnBorder: "1px solid #FFFFFF",
        textColor: "#FFFFFF",
        link: "https://ragroupinvest.com",
        description: {
            ru: "RAG ZAKYAT INVESTMENT занимается инвестициями в коммерческие предприятия",
            en: "",
            kz: ""
        },
        works: [
            {
                ru: "Дизайн логотипа и айдентики",
                en: "Logo and identity design",
                kz: "Логотип және айдентика дизайны",
            },
            {
                ru: "Дизайн лендинга и админ панели",
                en: "Design of landing page and admin panel",
                kz: "Лендинг беті мен әкімші панелінің дизайны",
            },
            {
                ru: "Верстка",
                en: "Layout",
                kz: "Верстка",
            },
        ]
    },
    {
        logo: QRCoderLogo,
        image: QRCoderScreenshot,
        imgHasPadding: false,
        bg: "#FFFFFF",
        btnColor: "#645DD1",
        btnBackground: "none",
        btnBorder: "1px solid #645DD1",
        textColor: "#090909",
        link: "https://qr-coder.org",
        description: {
            ru: "Это сайт для создания динамичных и минималистичных QR-визиток для физических и юридических лиц",
            en: "This is a site for creating dynamic and minimalistic QR business cards for individuals and legal entities.",
            kz: "Бұл жеке және заңды тұлғалар үшін динамикалық және минималистік QR визиткаларын жасауға арналған сайт."
        },
        works: [
            {
                ru: "Дизайн многостраничного сайта и профиля пользователя",
                en: "Design of a multi-page site and user profile",
                kz: "Көп бетті сайттың және пайдаланушы профилінің дизайны",
            },
            {
                ru: "Полная верстка",
                en: "Full layout",
                kz: "Толық верстка",
            },
        ]
    },
];


const Projects = () => {
    const delay = 5000;
    const {locale} = useRouter();
    const [currentSlide, setCurrentSlide] = useState(0);
    const timeoutRef = useRef(null);
    const slidesRef = useRef(null);
    const handleSlideClick = (e) => {
        e.preventDefault();
        const index = e.currentTarget.dataset.key;
        setCurrentSlide(Number(index));
    }

    const resetTimeout = () => {
        if(timeoutRef.current){
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(()=>{
        const slide = document.getElementById(`slide${currentSlide}`);
        const left = slide.offsetLeft;
        const slides = slide.parentElement;
        slides.style.left = `-${left}px`;
        resetTimeout();
        timeoutRef.current = setTimeout(() =>
            setCurrentSlide((prevIndex) =>
                prevIndex === carousel.length - 1 ? 0 : prevIndex + 1
            ),
            delay
        );

        return () => {
            resetTimeout();
        };
    },[currentSlide])

    return (
        <div id="projects" className="block">
            <div className="container">
                <div className="mb-56 bold-32-40 bold-40-48-lg text-black-8">// <FormattedMessage id="projects.title" /></div>
                <div className="carousel-wrapper">
                    <div className="carousel" >
                        <div className="slides" ref={slidesRef}>
                            {carousel.map((slide, key)=> (
                                <div className="slide" id={`slide${key}`} key={key} style={{background: slide.bg, color: slide.textColor}}>
                                    <div className="slide-info">
                                        <div className="description">
                                            <Image className="logo" src={slide.logo} />
                                            <div className="regular-16-24">{slide.description[locale]}</div>
                                        </div>
                                        <div className={`mobileImg ${slide.imgHasPadding ? 'hasPadding' : ''}`}>
                                            <Image className="img" src={slide.image} />
                                        </div>
                                        <div className="work">
                                            <div className="bold-20-20">
                                                <FormattedMessage id="projects.slide.work" />
                                            </div>
                                            <div className="works">
                                                {slide.works.map((work, i)=>(
                                                    <div className="work-item" key={i}>
                                                        <div className="check">
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M3.33203 7.99989L6.88759 11.5554L13.9987 4.44434" stroke={slide.textColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </div>
                                                        {work[locale]}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <a href={slide.link} target="_blank" className="slide-btn" style={{border: slide.btnBorder, background: slide.btnBackground, color: slide.btnColor}}>
                                            <FormattedMessage id="projects.slide.go" />
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.6213 3.95312L13.668 7.99979L9.6213 12.0465" stroke={slide.btnColor} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M2.33469 8H13.5547" stroke={slide.btnColor} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </a>
                                    </div>
                                    <div className={`slide-image ${slide.imgHasPadding ? 'hasPadding' : ''}`}>
                                        <Image src={slide.image} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="carousel-pages">
                        {[...carousel.keys()].map(key=>(
                            <div className={`carousel-page ${key == currentSlide ? 'active' : ''}`} data-key={key} onClick={handleSlideClick} key={key}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Projects;