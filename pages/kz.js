import Header from '../components/Header';
import TopBlock from '../components/TopBlock';
import Services from '../components/Services';
import About from '../components/About';
import Projects from '../components/Projects';
import Partners from '../components/Partners';
import Application from '../components/Application';
import Vacancies from '../components/Vacancies';
import Footer from '../components/Footer';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        {/* <html lang="kz" style={{scrollBehavior:'smooth'}} /> */}
        <title>RA Group</title>
        <meta name='description' content='Сіздің бизнесіңіз үшін сандық шешімдер'/>
      </Head>
      <Header lang="kz"/>
      <TopBlock lang="kz"/>
      <Services lang="kz"/>
      <About lang="kz"/>
      <Projects lang="kz"/>
      <Partners lang="kz"/>
      <Application lang="kz"/>
      <Vacancies lang="kz"/>
      <Footer lang="kz"/>
    </div>
  )
}
