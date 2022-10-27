import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html className='scroll-smooth' style={{scrollBehavior:'smooth'}}>
                <Head>
                    <title>RA Group</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta name='description' content='A place to find a great film to watch'/>
                </Head>
                <body className='bg-gray-50 screen'>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
};
  
export default MyDocument