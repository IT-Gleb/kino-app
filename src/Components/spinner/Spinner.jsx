import spiner from "../../../src/accets/imgs/spinner1.png";
import "./spiner.css";

function Spinner1() {
  return (
    <div className="row">
      <div className="col s12 center">
        <img className="rotaited" src={spiner} alt="Loading..."></img>
      </div>
    </div>
  );
}

export default Spinner1;
