import type { NextPage } from 'next';

import Header from '../components/common/header';
import Index from '../components/index';
import Footer from '../components/common/footer';

const Home: NextPage = () => {
    return (
        <>
            <Header />
            <Index />
            <Footer />
        </>
    );
}

export default Home;
