import React from 'react';

const Sitemap = () => {
    return null;
};

export const getServerSideProps = async ({ res }) => {

    // const BASE_URL = 'http://localhost:3000';
    const BASE_URL = 'https://ragroup.org';

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml">
            <url>
                <loc>${BASE_URL}/en/index.js</loc>
                <xhtml:link
                    rel="alternate"
                    hreflang="ru"
                    href="${BASE_URL}/ru/index.js"/>
                <xhtml:link
                    rel="alternate"
                    hreflang="kz"
                    href="${BASE_URL}/kz/index.js"/>
                <xhtml:link
                    rel="alternate"
                    hreflang="en"
                    href="${BASE_URL}/en/page.js"/>
            </url>
            <url>
                <loc>${BASE_URL}/kz/index.js</loc>
                <xhtml:link
                    rel="alternate"
                    hreflang="ru"
                    href="${BASE_URL}/ru/index.js"/>
                <xhtml:link
                    rel="alternate"
                    hreflang="kz"
                    href="${BASE_URL}/kz/index.js"/>
                <xhtml:link
                    rel="alternate"
                    hreflang="en"
                    href="${BASE_URL}/en/page.js"/>
            </url>
            <url>
                <loc>${BASE_URL}/ru/index.js</loc>
                <xhtml:link
                    rel="alternate"
                    hreflang="ru"
                    href="${BASE_URL}/ru/index.js"/>
                <xhtml:link
                    rel="alternate"
                    hreflang="kz"
                    href="${BASE_URL}/kz/index.js"/>
                <xhtml:link
                    rel="alternate"
                    hreflang="en"
                    href="${BASE_URL}/en/page.js"/>
            </url>
        </urlset>
    `;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;