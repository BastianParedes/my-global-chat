import React from "react";

import './general/styles/normalize.css';
import './general/styles/general.css';

import Header from './general/components/header.jsx';
import MainUser from './user/components/mainUser.jsx';
import MainChat from './chat/components/mainChat.jsx';
import Footer from './general/components/footer.jsx';



export default function App() {
    let [page, setPage] = React.useState('/user');

    let changePage = () => {
        setPage('/chat');
    }


    
    return <>
        <Header />
        {page === '/user' ? <MainUser changePage={changePage}/> : page === '/chat' ? <MainChat /> : <></>}
        <Footer />
    </>;
};