import React from 'react';
import Head from 'next/head';
import { cdnbaseurl } from '../Services/constante';

function Seo({ children, title, description, image, url }) {
    
    const meta_description = description ?? "Trender a new social network for everyone who respect your data. ";
    const meta_title = `${title ?? "Home"} - Trender`;
    const meta_image = image ?? `${cdnbaseurl}/assets/icons/circles/chatzone_255.png`;
    const meta_url = url ?? "https://trenderapp.com";

    return (
        <Head>
            <title>{meta_title}</title>
            <meta name="description" content={meta_description} />
            <link rel="icon" href={`${cdnbaseurl}/assets/icons/circles/chatzone_255.png`} />

            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="apple-mobile-web-app-capable" content="yes" />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={meta_title} />
            <meta property="og:site_name" content={meta_title} />
            <meta property="og:description" content={meta_description} />
            <meta property="og:image" content={meta_image} />
            <meta property="og:keywords" content="Trender,Community chat,Free social network,Free app for mobile,Free NFT share,Free data,Free share,BlockChain,Cryptocurrency,Bitcoin,NFT,Trend,Share,French,Private data,Friendly"></meta>

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={meta_url} />
            <meta name="twitter:title" content={meta_title} />
            <meta name="twitter:description" content={meta_description} />
            <meta name="twitter:image" content={meta_image} />
            { children }
            {
                process.env.NEXT_PUBLIC_NODE_ENV === "PROD" && <script async src="https://www.googletagmanager.com/gtag/js?id=G-BBH64R6EXF"></script>
            }
            {
                process.env.NEXT_PUBLIC_NODE_ENV === "PROD" && <script async dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                  
                    gtag('config', "G-BBH64R6EXF");`
                  }}
                />
            }
        </Head>
    )
};

export default Seo;