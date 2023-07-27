import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "../src/accets/css/materialize.min.css";
import "../src/accets/css/m_styles.css";
import App from "./App";

import AddPage from "./Components/Pages/AddPage";
import ErrorFilmsPage from "./Components/Pages/ErrorFilms";
import ErrorPage from "./Components/Pages/ErrorPage";
import Films, { filmsLoader } from "./Components/Pages/Films";
import FilmsPage, {
  loader as FilmsPageLoader,
} from "./Components/Pages/FilmsPage";
import NewDaySeans from "./Components/Pages/NewDaySeans";
import Seanses, { loader as seansesLoader } from "./Components/Pages/Seanses";
import {
  loader as NewSeansesLoader,
  action as NewAction,
} from "./Components/Pages/NewDaySeans";
import {
  IsCheckedProvider,
  ParamKinozalProvider,
  SearchProvider,
} from "./Components/context/searchContext";
import KinoZal from "./Components/Pages/kinoZal";
import { Provider } from "react-redux";
import ticketsStore from "./store-tickets/ticketsStore";
import SuccessPage from "./Components/Pages/SuccessPage";

const Mainrouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <Films />,
        loader: filmsLoader,
        errorElement: <ErrorFilmsPage />,
      },
      {
        path: "films/:pageId",
        loader: FilmsPageLoader,
        element: <FilmsPage searchText={""} />,
        errorElement: <ErrorFilmsPage />,
      },
      {
        //        path: `/seanses/:${thisDay("05-01-2023")}`,
        path: "seanses/:seansId",
        loader: seansesLoader,
        element: <Seanses />,
      },
      {
        path: "/kinozal",
        element: <KinoZal />,
      },
      { path: "addFilm", element: <AddPage /> },
      {
        path: "/seanses/add",
        loader: NewSeansesLoader,
        action: NewAction,
        element: <NewDaySeans />,
      },
      { path: "/successTicket", element: <SuccessPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <IsCheckedProvider>
      <SearchProvider>
        <Provider store={ticketsStore}>
          <ParamKinozalProvider>
            <RouterProvider router={Mainrouter} />
          </ParamKinozalProvider>
        </Provider>
      </SearchProvider>
    </IsCheckedProvider>
  </React.StrictMode>
);
