import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="row brown darken-4">
        <div className="container valign-wrapper blue-grey darken-4">
          <div className="col s6 m6 l6  grey-text text-lighten-1">
            <span
              className="flow-text "
              style={{ fontSize: `12px`, textTransform: `lowercase` }}
            >
              &copy; CopyRight by Gleb Torgashin
            </span>
          </div>
          <div className="col s6 m6 l6 right lime-text accent-1">
            <div className="m-logo right">
              React cinema ver 1.0
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M18 10.48l4-3.98v11l-4-3.98V18c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v4.48zm-2-.79V6H4v12h12V9.69zM10 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0 1c1.34 0 4 .67 4 2v1H6v-1c0-1.33 2.66-2 4-2z"
                    fill="#f4ff81"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
