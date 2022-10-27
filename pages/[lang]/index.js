import Header from '../../components/Header';
import TopBlock from '../../components/TopBlock';
import Services from '../../components/Services';
import About from '../../components/About';
import Projects from '../../components/Projects';
import Partners from '../../components/Partners';
import Application from '../../components/Application';
import Vacancies from '../../components/Vacancies';
import Footer from '../../components/Footer';
import { getLang } from '../../utilities/lang';

export default function Home() {
  const lang = getLang();
  return (
    <div>
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
