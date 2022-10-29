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
        <html lang="ru" style={{scrollBehavior:'smooth'}} />
        <title>RA Group</title>
        <meta name='description' content='Цифровые решения для вашего бизнеса'/>
      </Head>
      <Header lang="ru"/>
      <TopBlock lang="ru"/>
      <Services lang="ru"/>
      <About lang="ru"/>
      <Projects lang="ru"/>
      <Partners lang="ru"/>
      <Application lang="ru"/>
      <Vacancies lang="ru"/>
      <Footer lang="ru"/>
    </div>
  )
}
