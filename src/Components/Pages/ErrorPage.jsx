import { useNavigate, useRouteError } from "react-router-dom";
import TopHeader from "../TopHeader/TopHeader";

function ErrorPage() {
  const error = useRouteError();
  // console.error(error);
  const toHome = useNavigate();

  return (
    <>
      <TopHeader />
      <div className="row">
        <div className="container">
          <div className="col s12 m12 l12">
            <h3 className="flow-text center">
              OOps! Страница не найдена или возникла ошибка :(
            </h3>
            <h4 className="flow-text center">
              {error.statusText || error.message}
            </h4>

            <div className="center">
              <button
                className="btn waves-effect waves-light"
                onClick={() => {
                  toHome("/");
                }}
              >
                На главную
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
