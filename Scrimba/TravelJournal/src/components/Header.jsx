import logo from "../../images/logo.png"

const Header = () => {
    return (
        <header>
            <img src={logo} className="logo" />
            <h3>my travel journal</h3>
        </header>
    )
}

export default Header