import { Suspense, useContext } from "react";
import { useLoaderData } from "react-router";
import FilmPagination from "../Pagination/FilmPagination";
import CardFilm from "../CardFilm/CardFilm";
import { BaseImagePath } from "../../libs/libs";
import { noFakePathinImage, MAXITEMSONPAGE } from "../../libs/libs";
import { SearchInput } from "../SearchFilms/SearchInput";
import { SearchContext } from "../context/searchContext";
import SerchedFilms from "../searchedFilms/sFilms";
import Spinner1 from "../spinner/Spinner";

var CURRENTPAGE = 0;

export async function loader({ params }) {
  CURRENTPAGE = params.pageId;
  // console.log(CURRENTPAGE);
  const Url = `https://639e05c83542a26130555cae.mockapi.io/Films?page=${CURRENTPAGE}&limit=${MAXITEMSONPAGE}&sortBy=title`;
  try {
    const res = await (await fetch(Url)).json();
    return res;
  } catch (error) {
    return new Error("Can't Yrodes get data from films page...");
  }
}

function ResFilms({ resFilms }) {
  return resFilms.map((film) => {
    return (
      <div key={film.id} className="col s12 m4 l3">
        <CardFilm
          title={film.title}
          imageUrl={BaseImagePath + noFakePathinImage(film.imageUrl)}
          textContent={film.description}
        />
      </div>
    );
  });
}

function FilmsPage() {
  const sfilms = useLoaderData();
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
      <FilmPagination ItemsOnPage={MAXITEMSONPAGE} CurrentPage={CURRENTPAGE} />
      <div className="row white">
        <Suspense fallback={<Spinner1 />}>
          {searchText.trim().length < 2 ? (
            <ResFilms resFilms={sfilms} />
          ) : (
            <SerchedFilms />
          )}
        </Suspense>
      </div>
      <FilmPagination ItemsOnPage={MAXITEMSONPAGE} CurrentPage={CURRENTPAGE} />
    </>
  );
}

export default FilmsPage;
