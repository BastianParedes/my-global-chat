

function Message(props) {
    let date = new Date();
    let currentHour = date.getHours();
    let hour = currentHour <= 9 ?  '0' + currentHour : currentHour;
    let currentMinutes = date.getMinutes();
    let minutes = currentMinutes <= 9 ?  '0' + currentMinutes : currentMinutes;

    return (
        <div className={"message-div " + props.className}>
            <div className="container-message-text-in-chat">
                <span className="message-username">{props.username}</span>
                <p className="message-content">{props.message}</p>
            </div>
            <div className="container-message-hour">
                <span className="message-hour">{`${hour}:${minutes}`}</span>
            </div>
        </div>
    );
}

export default Message;