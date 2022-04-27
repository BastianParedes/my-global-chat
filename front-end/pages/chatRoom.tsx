
import type { NextPage } from 'next';

import Header from '../components/common/header';
import MainChat from '../components/chatRoom/mainchat';
import Footer from '../components/common/footer';


const Home: NextPage = () => {
    return (
        <>
            <Header />
            <MainChat />
            <Footer />
        </>
    );

}

export default Home
