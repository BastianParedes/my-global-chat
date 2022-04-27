
import styles from './styles.module.css';

export default function Message(props) {
    let date = new Date();
    let currentHour = date.getHours();
    let hour = currentHour <= 9 ?  '0' + currentHour : currentHour;
    let currentMinutes = date.getMinutes();
    let minutes = currentMinutes <= 9 ?  '0' + currentMinutes : currentMinutes;

    return (
        <div className={`${styles['message-div']} ${styles[props.className]}`}>
            <div className={styles['container-message-text-in-chat']}>
                <span className={styles['message-username']}>{props.username}</span>
                <p className={styles['message-content']}>{props.message}</p>
            </div>
            <div className={styles['container-message-hour']}>
                <span className={styles['message-hour']}>{`${hour}:${minutes}`}</span>
            </div>
        </div>
    );
}
