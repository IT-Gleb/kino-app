import React, { Suspense } from "react";
// import "materialize-css";
import { images22 } from "../../images";
import TopHeader from "../TopHeader/TopHeader";
// import MyCarousel from "../myCarousel/myCarousel";
const MyCarousel = React.lazy(() => import("../myCarousel/myCarousel"));

function Header() {
  return (
    <>
      <div className="header">
        <TopHeader />

        <div className="row brown blue-grey darken-4">
          <div className="container">
            <div className="col my-row s12 m12 blue-grey darken-4">
              <Suspense
                fallback={
                  <h4 className="center grey-text">Loading image gallery...</h4>
                }
              >
                <MyCarousel>
                  {images22.map((image, indx) => {
                    return (
                      <img
                        src={image}
                        key={indx}
                        className="mycarousel-item"
                        alt=""
                      />
                    );
                  })}
                </MyCarousel>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
