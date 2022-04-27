import React from 'react';
import { GrSend } from 'react-icons/gr'
import io from 'socket.io-client';
import styles from './styles.module.css';
import Message from '../message';



const socket = io('https://my-global-chat.herokuapp.com/');

export default function MainChat() {

    let [chat, setChat]: any = React.useState([]);
    let [recievedMessage, setRecievedMessage] = React.useState({className: 'recieved-message', username:'Sistema', message: 'Hola nuevo usuario! Envía tu mensajes para que todo el mundo los vea! :)'});
    let [sendingText, setSendingText] = React.useState('');
    let [username, setUsername] = React.useState('');
    let messagesSection: any = React.useRef();
    let scrollBarWasAtBottom = React.useRef(false);



    let moveScrollBar = () => {
        if (scrollBarWasAtBottom.current) {
            messagesSection.current.scrollTo(0, messagesSection.current.scrollHeight);
        }
    }



    let sendMessage = () => {
        scrollBarWasAtBottom.current = messagesSection.current.scrollTop + messagesSection.current.clientHeight === messagesSection.current.scrollHeight;
        socket.emit('messageFromUser', {username, message: sendingText});
        setChat([...chat, {className: 'sended-message', username, message: sendingText}]);
        setSendingText('');
        moveScrollBar();
    };



    let onClick = () => {
        if (sendingText.replaceAll(' ', '') === '') {
            return;
        };
        
        sendMessage();
    };



    let onKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            event.preventDefault();
        };
        
        if (sendingText.replaceAll(' ', '') === '' || event.keyCode !== 13) {
            return;
        };

        sendMessage();
    };




    React.useEffect(() => {
        setUsername(sessionStorage.getItem('username') || '');
        socket.on('messageFromServer', (data: any) => {
            setRecievedMessage({className: 'recieved-message', username: data['username'], message: data['message']});
        });
    }, []);


    


    React.useEffect(() => {
        scrollBarWasAtBottom.current = messagesSection.current.scrollTop + messagesSection.current.clientHeight === messagesSection.current.scrollHeight;
        setChat([...chat, recievedMessage]);
        moveScrollBar();
    }, [recievedMessage]);



    React.useEffect(() => {
        if (scrollBarWasAtBottom.current) {
            messagesSection.current.scrollTo(0, messagesSection.current.scrollHeight);
        }
    }, [chat]);



    return (
        <main className={styles['main']}>
            <div className={styles['messages-section']} ref={messagesSection}>
                {chat.map((info:any, pos:number) => <Message key={pos} className={info.className} username={info.username} message={info.message}/>)}
            </div>
            <div className={styles['send-messages-section']}>
                <textarea className={styles['sending-text']} placeholder='Mensaje' resize='none' value={sendingText} onChange={event => {setSendingText(event.target.value)}} onKeyDown={onKeyDown}></textarea>
                <button className={styles['send-text-btn']} onClick={onClick}><GrSend /></button>
            </div>
        </main>
    );
}

