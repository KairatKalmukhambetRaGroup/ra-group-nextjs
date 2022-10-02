import Head from 'next/head'
// import Image from 'next/image'

import Header from '../../components/Header';
import TopBlock from '../../components/TopBlock';
import Services from '../../components/Services';
import About from '../../components/About';
import Projects from '../../components/Projects';
import Partners from '../../components/Partners';
import Application from '../../components/Application';
import Vacancies from '../../components/Vacancies';
import Footer from '../../components/Footer';

export default function Home() {
  return (
    <div>
      <Head>
        <title>RA Group</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <TopBlock />
      <Services />
      <About />
      <Projects />
      <Partners />
      <Application />
      <Vacancies />
      <Footer />
    
    </div>
  )
}
