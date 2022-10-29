import Router, { useRouter } from "next/router";


export function getLang() {
    const router = useRouter();
    const {lang} = router.query;
    console.log(lang)
    if(lang){
        if(lang === 'ru' || lang === 'en' || lang === 'kz')
            return lang;
        router.push('/', undefined, {shallow: true});
    }
    return 'en'
};
export function setLang(newLang){
    // router.push(newLang)
    Router.push(newLang, undefined, {shallow: true});

    // window.location.href = `/${newLang}/`;
}