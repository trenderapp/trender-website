import React from 'react';
import Head from 'next/head';
import { cdnbaseurl } from '../Services/constante';

function Seo({ children, title, description, image, url }) {
    
    const meta_description = description ?? "Trender is a free social network designed to help creators become recognized. You can easily create the next big trend and join a community of like-minded creators. Our premium subscriptions offer features like automatic posting to Twitch and YouTube, photo NFTs through crypto wallet connection (WEB3), advanced post analytics, and a reputation system. Our platform also includes AI-powered security, enhanced moderation, creator monetization, and copyright protection.";
    const meta_title = `${title ? `${title} - Trender` : `Trender - Create the Next Trend and Become a Recognized Creator`}`;
    const meta_image = image ?? `${cdnbaseurl}/assets/icons/circles/chatzone_255.png`;
    const meta_url = url ?? "https://www.trenderapp.com";
    const keywords = "Trender, social network, trend, creator, free, premium subscription, Twitch, YouTube, NFT, crypto, WEB3, AI, security, moderation, analytics, monetization, copyright protection, data proctection, friendly";

    return (
        <Head>
            <title>{meta_title}</title>
            <meta name="description" content={meta_description} />
            <link rel="icon" href={`${cdnbaseurl}/assets/icons/circles/chatzone_255.png`} />
            <link rel="canonical" href="https://www.trenderapp.com" />
            <meta name="keywords" content={keywords} />

            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="apple-mobile-web-app-capable" content="yes" />

            {
            /**
             * <meta name="yandex-verification" content="XXXXXXXXXXXXXXXX" /> <!-- Vérification de propriété -->
             <meta name="yandex" content="noindex,follow" /> <!-- Indique à Yandex de ne pas indexer la page -->
            <meta name="robots" content="noyaca" /> <!-- Indique à Yandex de ne pas indexer les liens externes sur la page -->

            */
            }
            <meta property="og:type" content="website" />
            <meta property="og:title" content={meta_title} />
            <meta property="og:site_name" content={meta_title} />
            <meta property="og:description" content={meta_description} />
            <meta property="og:image" content={meta_image} />
            <meta property="og:keywords" content={keywords} />

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