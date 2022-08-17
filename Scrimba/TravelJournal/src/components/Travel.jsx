import path from '../../images/path.png'

const Travel = (props) => {
    return (
        <div className="travel-container">
            <img src={props.item.imageUrl} className="travel-img" />
            <div className="travel-info-container">
                <img src={path} className="travel-path" />
                <span className="travel-location">{props.item.location}</span>
                <a href={props.item.googleMapsUrl} className="travel-google-maps-url">View on Google Maps</a>
                <h2 className="travel-title">{props.item.title}</h2>
                <p className="travel-dates"><strong>{props.item.startDate} - {props.item.endDate}</strong></p>
                <p className="travel-description">{props.item.description}</p>
            </div>
        </div>
    )
}

export default Travel