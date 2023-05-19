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
    <>
      <Head>
        {/* <html lang="en" style={{scrollBehavior:'smooth'}} /> */}
        <title>RA Group</title>
        <meta name='description' content='Digital solutions for your business'/>
      </Head>
      <Header lang="en"/>
      <TopBlock lang="en"/>
      <Services lang="en"/>
      <About lang="en"/>
      <Partners lang="en"/>
      <Projects lang="en"/>
      <Application lang="en"/>
      {/* <Vacancies lang="en"/> */}
      <Footer lang="en"/>
    </>
  )
}
