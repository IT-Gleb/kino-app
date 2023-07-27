import "./cardfilm.css";

function CardFilm({ title, imageUrl, textContent }) {
  return (
    <>
      <div className="card hoverable">
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src={imageUrl} alt="lalala" />
        </div>
        <div className="card-content">
          {/* <button className="btn brown left">link</button> */}
          <span className="card-title activator grey-text text-darken-4 center truncate">
            {title}
          </span>
          <p></p>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            {title}
            {/* <i className="material-icons right">&time;</i> */}
            <i style={{ marginLeft: 30, fontSize: `1.2em` }}>&times;</i>
          </span>
          <p>{textContent}</p>
        </div>
      </div>
    </>
  );
}

export default CardFilm;
