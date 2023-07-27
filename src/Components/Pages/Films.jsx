import React from "react";
import CardFilm from "../CardFilm/CardFilm";
import { Await, defer, useLoaderData, useAsyncValue } from "react-router";
import { Suspense, useContext } from "react";
import FilmPagination from "../Pagination/FilmPagination";
import {
  BaseImagePath,
  MAXITEMSONPAGE,
  noFakePathinImage,
} from "../../libs/libs";
import { SearchInput } from "../SearchFilms/SearchInput";
import { SearchContext } from "../context/searchContext";
import SerchedFilms from "../searchedFilms/sFilms";
import Spinner1 from "../spinner/Spinner";

const FilmsUrl = `https://639e05c83542a26130555cae.mockapi.io/Films?page=1&limit=${MAXITEMSONPAGE}&sortBy=title`;

function ResolvedFilms() {
  const resFilms = useAsyncValue();
  return (
    <>
      {resFilms.map((film) => {
        return (
          <div key={film.id} className="col s12 m4 l3">
            <CardFilm
              title={film.title}
              // imageUrl={filmImages[getRndInteger(0, filmImages.length - 1)]}
              imageUrl={BaseImagePath + noFakePathinImage(film.imageUrl)}
              textContent={film.description}
            />
          </div>
        );
      })}
    </>
  );
}

function Films() {
  const { afilms } = useLoaderData();
  const { searchText } = useContext(SearchContext);

  return (
    <>
      <div className="row white">
        <div className="col s6 m6 l6">
          <h4 className="flow-text">Популярные фильмы</h4>
        </div>
        <div className="col s6 m6 l6">
          <SearchInput />
        </div>
      </div>
      <FilmPagination ItemsOnPage={MAXITEMSONPAGE} CurrentPage={1} />
      <div className="row white">
        <Suspense fallback={<Spinner1 />}>
          <Await resolve={afilms}>
            {searchText === "" ? <ResolvedFilms /> : <SerchedFilms />}
          </Await>
        </Suspense>
      </div>
      <FilmPagination ItemsOnPage={MAXITEMSONPAGE} CurrentPage={1} />
    </>
  );
}

async function getFilms() {
  try {
    // console.log(FilmsUrl);
    const res = await (await fetch(FilmsUrl)).json();
    // console.log(res);
    return res;
  } catch (error) {
    // console.log(error.message);
    return error;
  }
}

export const filmsLoader = async (request) => {
  // console.log(request);
  // console.log({ request, params });
  return defer({
    afilms: getFilms(),
  });
};

export default React.memo(Films);
