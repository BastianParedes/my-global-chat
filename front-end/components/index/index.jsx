import React from "react";
import styles from './styles.module.css';

export default function Index() {

    let username = React.useRef('');

    let goToChat = () => {
        if (username.current.replaceAll(' ', '') === '') {
            alert('No has ingresado un nombre de usuario.');
            return;
        } else if (username.current.length >= 15) {
            alert('El nombre de usuario debe contener menos de 15 carateres.');
            return
        };
    
        sessionStorage.setItem('username', username.current);
        location.pathname = '/chatRoom';
    }

    let onKeyDown = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            goToChat();
        };
    }
    

    return (
        <main className={styles["main"]}>
            <div className={styles["container"]}>
                <h2 className={styles["username-tittle"]}>Nombre de usuario</h2>
                <input type="text" className={styles["username-ipnut"]} maxLength={14} onKeyDown={onKeyDown} onChange={(event) => username.current = event.target.value}/>
                <button className={styles["username-btn"]} onClick={goToChat}>Ir al chat</button>
            </div>
        </main>
    );
}

