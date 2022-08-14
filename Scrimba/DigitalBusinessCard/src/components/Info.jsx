import avatar from "../images/avatar.png"
import mail from "../images/mail.png"
import linkedIn from "../images/linked-in.png"

const Info = () => {
    return (
        <div className="info-container">
            <img src={avatar} className="avatar" />
            <h2 className="info-name">Laura Smith</h2>
            <p className="info-profession">Frontend Developer</p>
            <p className="info-website">laurasmith.website</p>
            <div className="info-button-container">
                <button className="button email-button">
                    <img src={mail} className="button-image" />
                    Email
                </button>
                <button className="button linked-in-button">
                    <img src={linkedIn} className="button-image" />
                    LinkedIn
                </button>
            </div>
        </div>
    )
}

export default Info;