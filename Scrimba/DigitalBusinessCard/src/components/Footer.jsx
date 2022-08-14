import twitter from "../images/twitter.png"
import facebook from "../images/facebook.png"
import instagram from "../images/instagram.png"
import github from "../images/github.png"

const Footer = () => {
    return (
        <div className="footer-container">
            <img src={twitter} className="footer-img" />
            <img src={facebook} className="footer-img" />
            <img src={instagram} className="footer-img" />
            <img src={github} className="footer-img" />
        </div>
    )
}

export default Footer;