import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import Spinner1 from "../spinner/Spinner";
import "./pagination.css";

const AllFilms = async () => {
  //   let thisLength = 0;
  const Url = "https://639e05c83542a26130555cae.mockapi.io/Films";
  try {
    const response = await (await fetch(Url)).json();
    // console.log(response);
    return response.length;
    // console.log(thisLength);
    // return thisLength;
  } catch (error) {
    return error;
  }
};

function FilmPagination({ ItemsOnPage = 1, CurrentPage }) {
  const [FilmsCount, setFilmsCount] = useState(0);
  const [allPages, setAllPages] = useState(0);
  const [allLinks, setAllLinks] = useState([0]);
  const oneZapros = useRef(false);

  useEffect(() => {
    if (!oneZapros.current) {
      AllFilms().then((response) => {
        setFilmsCount(response);
      });
      oneZapros.current = true;
    }
    // console.log(PCount);
    // setPages(PCount);
  }, []);

  useEffect(() => {
    setAllPages(Math.ceil(FilmsCount / ItemsOnPage));
  }, [ItemsOnPage, FilmsCount]);

  useEffect(() => {
    let p = 0;
    let temparray = [];
    if (allLinks.length < allPages) {
      while (temparray.length < allPages) {
        p = p + 1;
        temparray.push({
          link: "/films/" + String(p),
          text: String(p),
        });
      }
      //   console.log(temparray);
      setAllLinks(temparray);
    }
  }, [allPages, allLinks.length, ItemsOnPage]);

  if (ItemsOnPage <= 0) ItemsOnPage = 1;
  return (
    <div className="row white lighten-2">
      <div className="container">
        <div className="col s12 m12 l12">
          {FilmsCount > 0 ? (
            <>
              <ul className="paginationPage">
                <li>
                  <span>Страницы:</span>
                </li>
                {allLinks.map((link, index) => {
                  return (
                    <li className="pagination-item" key={index}>
                      <NavLink
                        to={link.link}
                        className={({ isActive }) =>
                          isActive ? "active_current" : ""
                        }
                      >
                        {link.text}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <>
              <Spinner1 />
              <span>Страниц: Не установлено</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(FilmPagination);
