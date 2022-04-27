import 'normalize.css';
import '/public/styles/styles.css';

import React from 'react';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: any) {
    return (
        <React.StrictMode>
                <Head>
                    <title>My global chat</title>
                </Head>
                <Component {...pageProps} />
        </React.StrictMode>
    );
}