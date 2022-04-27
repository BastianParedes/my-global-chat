import React from "react";
import io from 'socket.io-client';
import '../styles/chat.css';
import Message from "./message.jsx";



const socket = io('https://my-global-chat.herokuapp.com/');




export default function MainChat() {

    let [chat, setChat] = React.useState([]);
    let [recievedMessage, setRecievedMessage] = React.useState({className: 'recieved-message', username:'Sistema', message: 'Hola nuevo usuario! Envía tu mensajes para que todo el mundo los vea! :)'});
    let [sendingText, setSendingText] = React.useState('');
    let username = sessionStorage.getItem('username');
    let messagesSection = React.useRef();
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



    let onClick = (event) => {
        if (sendingText.replaceAll(' ', '') === '') {
            return;
        };
        
        sendMessage();
    };



    let onKeyDown = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
        };
        
        if (sendingText.replaceAll(' ', '') === '' || event.keyCode !== 13) {
            return;
        };

        sendMessage();
    };



    React.useEffect(() => {
        socket.on('messageFromServer', data => {
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
        <main>
            <div className="messages-section" ref={messagesSection}>
                {chat.map((info, pos) => <Message key={pos} className={info.className} username={info.username} message={info.message}/>)}
            </div>
            <div className="send-messages-section">
                <textarea className="sending-text" placeholder="Mensaje" resize="none" value={sendingText} onChange={event => {setSendingText(event.target.value)}} onKeyDown={onKeyDown}></textarea>
                <button className="send-text-btn" onClick={onClick}><i className='bx bx-send' ></i></button>
            </div>
        </main>
    );
}

