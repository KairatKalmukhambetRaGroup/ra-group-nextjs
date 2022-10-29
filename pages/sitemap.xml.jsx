import React from 'react';

const Sitemap = () => {
    return null;
};

export const getServerSideProps = async ({ res }) => {

    // const BASE_URL = 'http://localhost:3000';
    const BASE_URL = process.env.BASE_URL;

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml">
            <url>
                <loc>${BASE_URL}</loc>
                <xhtml:link
                    rel="alternate"
                    hreflang="ru"
                    href="${BASE_URL}/ru"/>
                <xhtml:link
                    rel="alternate"
                    hreflang="kz"
                    href="${BASE_URL}/kz"/>
                <xhtml:link
                    rel="alternate"
                    hreflang="en"
                    href="${BASE_URL}"/>
            </url>
            <url>
                <loc>${BASE_URL}/kz</loc>
                <xhtml:link
                    rel="alternate"
                    hreflang="ru"
                    href="${BASE_URL}/ru"/>
                <xhtml:link
                    rel="alternate"
                    hreflang="kz"
                    href="${BASE_URL}/kz"/>
                <xhtml:link
                    rel="alternate"
                    hreflang="en"
                    href="${BASE_URL}"/>
            </url>
            <url>
                <loc>${BASE_URL}/ru</loc>
                <xhtml:link
                    rel="alternate"
                    hreflang="ru"
                    href="${BASE_URL}/ru"/>
                <xhtml:link
                    rel="alternate"
                    hreflang="kz"
                    href="${BASE_URL}/kz"/>
                <xhtml:link
                    rel="alternate"
                    hreflang="en"
                    href="${BASE_URL}"/>
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