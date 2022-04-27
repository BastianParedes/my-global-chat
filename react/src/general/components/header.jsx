    
function Header() {
    return (
        <header>
            <img src={require("../images/logo.png")} alt="Bastián Paredes" className="logo"/>
            <h1 className="header-tittle">Chat global</h1>
        </header>
    )
}

export default Header;