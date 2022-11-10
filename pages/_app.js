import { useRouter } from 'next/router';
import { IntlProvider } from "react-intl";

import en from '../lang/en.json';
import ru from '../lang/ru.json';
import kz from '../lang/kz.json';

import '../styles/globals.scss';
import '../styles/colors.scss';
import '../styles/flexbox.scss';
import '../styles/inputs.scss';
import '../styles/loading.scss';
import '../styles/typography.scss';
import '../styles/header.scss';
import '../styles/about.scss';
import '../styles/application.scss';
import '../styles/footer.scss';
import '../styles/partners.scss';
import '../styles/projects.scss';
import '../styles/services.scss';
import '../styles/topblock.scss';
import '../styles/vacancies.scss';

// admin
import '../styles/login.scss';
import '../styles/admin.scss';




const messages = {en, ru, kz};

function getDirection(locale) {
  if (locale === "ar") {
    return "rtl";
  }

  return "ltr";
}

function MyApp({ Component, pageProps }) {
  const {locale} = useRouter();

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Component {...pageProps}/>
    </IntlProvider>
  )
}

export default MyApp;