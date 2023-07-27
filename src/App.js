import { Outlet } from "react-router";
import { v4 as uuidv4 } from "uuid";
import Footer from "./Components/Footer/Footer";

import Header from "./Components/Header/header";
import MainMenu from "./Components/MainMenu/MainMenu";

function App() {
  return (
    <>
      <Header />
      <main>
        <MainMenu
          value={[
            { id: { uuidv4 }, title: "Фильмы", page: "/films/1" },
            { id: { uuidv4 }, title: "Репертуар", page: "/seanses/1" },
            {
              id: { uuidv4 },
              title: "Кинозал",
              page: "/kinozal",
            },
            { id: { uuidv4 }, title: "Параметры", page: "menu1" },

            // {
            //   id: { uuidv4 },
            //   title: "Добавить фильм",
            //   page: "addFilm",
            // },
            // {
            //   id: { uuidv4 },
            //   title: "Добавить репертуар",
            //   page: "/seanses/add",
            // },
          ]}
        />

        <div className="row">
          <div className="container">
            <div className="col s12 m12 l12 white">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
