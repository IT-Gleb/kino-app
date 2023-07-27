import React, { useState, useContext, useEffect } from "react";
import {
  BaseImagePath,
  noFakePathinImage,
  getParamStr,
  getSearchData,
} from "../../libs/libs";
import CardFilm from "../CardFilm/CardFilm";
import { SearchContext } from "../context/searchContext";
import { CheckContext } from "../context/searchContext";

function SerchedFilms() {
  const { searchText } = useContext(SearchContext);
  const { isChecked } = useContext(CheckContext);
  const [searchQuery, setSearchQuery] = useState([]);

  useEffect(() => {
    if (searchText.trim().length > 1) {
      let paramTitle = "";
      let searchUrl = "";
      paramTitle = getParamStr(isChecked, searchText.trim().toLowerCase());
      searchUrl = `https://639e05c83542a26130555cae.mockapi.io/${paramTitle}`;
      const searchData = async () => {
        try {
          const result = await getSearchData(searchUrl);
          // console.log(result);
          setSearchQuery(result);
        } catch (error) {
          return new Error(error.message);
        }
      };
      searchData();
    }
  }, [searchText, isChecked]);

  return (
    <>
      {searchQuery.length > 0 ? (
        searchQuery.map((film) => {
          return (
            <div key={film.id} className="col s12 m4 l3">
              <CardFilm
                title={film.title}
                imageUrl={BaseImagePath + noFakePathinImage(film.imageUrl)}
                textContent={film.description}
              />
            </div>
          );
        })
      ) : (
        <h3 className="center">Ничего не найдено :-(</h3>
      )}
    </>
  );
}

export default SerchedFilms;
