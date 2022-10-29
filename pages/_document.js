import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const originalRenderPage = ctx.renderPage
    
        // Run the React rendering logic synchronously
        ctx.renderPage = () =>
          originalRenderPage({
            // Useful for wrapping the whole react tree
            enhanceApp: (App) => App,
            // Useful for wrapping in a per-page basis
            enhanceComponent: (Component) => Component,
          })
    
        // Run the parent `getInitialProps`, it now includes the custom `renderPage`
        const initialProps = await Document.getInitialProps(ctx)
    
        return initialProps
      }
    render() {
        return (
            <Html className='scroll-smooth' style={{scrollBehavior:'smooth'}} lang={this.props.locale}>
                <Head>
                  <link rel="icon" href="/favicon.ico" />
                  <link rel="alternate" href={`${process.env.BASE_URL}`} hrefLang="x-default" />
                  <link rel="alternate" href={`${process.env.BASE_URL}`} hrefLang="en" />
                  <link rel="alternate" href={`${process.env.BASE_URL}/kz`} hrefLang="kz" />
                  <link rel="alternate" href={`${process.env.BASE_URL}/ru`} hrefLang="ru" />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
};
  
export default MyDocument