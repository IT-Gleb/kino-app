import { Suspense, useState, useRef } from "react";
import {
  Form,
  defer,
  Await,
  useLoaderData,
  useAsyncValue,
  redirect,
  useNavigate,
} from "react-router-dom";
import { now_Date } from "../../libs/libs";
import axios from "axios";
import "./newDaySeans.css";
import Spinner1 from "../spinner/Spinner";

const FilmsUrl = `https://639e05c83542a26130555cae.mockapi.io/Films?orderBy=title`;

async function getAllFilms() {
  try {
    // const res = await (await fetch(FilmsUrl),
    //           {
    //             headers: {
    //               "Content-type": "application/json; charset=UTF-8",
    //               "Sec-Fetch-Mode": "no-cors",
    //             },
    //           }).json();
    const res = await axios.get(FilmsUrl).then((res) => res.data);
    return res;
  } catch (error) {
    return new Error(error);
  }
}

export const loader = async () => {
  return defer({
    allFilms: getAllFilms(),
  });
};

function getDatafromForm(paramFormData) {
  const newDaySeansData = paramFormData;
  let newObj = { day: "", seanses: [] };
  newObj["day"] = newDaySeansData["newDate"];
  newObj.seanses = [];
  let tmpObj = {};
  let objSize = Math.round((Object.entries(newDaySeansData).length - 1) / 2);

  // console.log(newDaySeansData);

  let indx = 0;
  while (indx < objSize) {
    tmpObj = {};
    indx++;
    tmpObj["number"] = indx;
    tmpObj["seans"] = newDaySeansData["seans" + String(indx)];
    tmpObj["title"] = newDaySeansData["title" + String(indx)];
    newObj["seanses"].push(tmpObj);
  }

  return newObj;
}

async function addNewRepData(paramData, paramId) {
  const Url_add = "https://639e05c83542a26130555cae.mockapi.io/IdSeanses";
  let Url_id = `https://639e05c83542a26130555cae.mockapi.io/IdSeanses?filter=${paramId}`;
  let resSize = 0;
  // const requestOptions = {
  //   // method: "POST",
  //   Headers: { "Content-Type": "application/json" },
  //   body: paramData,
  // };
  try {
    // console.log(paramData);
    // await axios.post(Url, paramData);
    const res = await axios.get(Url_id).then((res) => res.data);
    resSize = Object.keys(res).length;
    // console.log(res);
    try {
      if (resSize < 1) {
        Url_id = Url_add;
        await axios.post(Url_id, paramData);
      } else {
        Url_id = Url_add + `/${res[0]["id"]}`;
        // console.log(Url_id);
        await axios.put(Url_id, paramData);
      }
      return true;
    } catch (error) {
      return new Error(error);
    }
  } catch (error) {
    return new Error(error);
  }
}

export async function action({ request }) {
  const fData = await request.formData();
  let newRep = Object.fromEntries(fData);
  // console.log(newRep);
  newRep = getDatafromForm(newRep);
  // console.log(newRep);
  await addNewRepData(newRep, newRep["day"]);
  return redirect("/seanses/1");
}

function RowSeans({ FilmsList, nomerS, seansFilm }) {
  const [value, setValue] = useState("");

  function clickHandler(e) {
    e.preventDefault();

    let myVal = FilmsList.current.selectedIndex;
    if (myVal === -1) {
      window.alert("Выберите фильм из списка...");
      FilmsList.current.selectedIndex = 0;
      FilmsList.current.focus();
      return;
    }
    setValue(FilmsList.current.options[FilmsList.current.selectedIndex].text);
  }
  return (
    <div className="row">
      <div className="col s1">{nomerS}</div>

      <div className="col s2 ">
        <label htmlFor={"newSeans" + String(nomerS)}>
          Сеанс:
          <select
            className="browser-default"
            name={"seans" + String(nomerS)}
            id={"newSeans" + String(nomerS)}
          >
            <option>{seansFilm}</option>
          </select>
        </label>
      </div>

      <div className="col s8 ">
        <label htmlFor={"newFilm" + String(nomerS)}>
          Введите наименование фильма:
          <input
            type="text"
            name={"title" + String(nomerS)}
            id={"newFilm" + String(nomerS)}
            defaultValue={value}
            autoComplete="off"
            required
          />
        </label>
      </div>
      <div className="col s1 ">
        <label htmlFor={"btn" + String(nomerS)}>
          Фильм
          <button
            className="btn-floating btn-small blue-grey"
            title="Добавить фильм из списка"
            data-id={nomerS}
            id={"btn" + String(nomerS)}
            onClick={clickHandler}
          >
            +
          </button>
        </label>
      </div>
    </div>
  );
}

function ListFilms({ FilmList }) {
  const listallFilms = useAsyncValue();
  //   console.log(listallFilms);

  return (
    <div className="row">
      <div className="col s12 m12 l12">
        <h5 className="center flow-text">Фильмы:</h5>
        <select
          className="browser-default"
          ref={FilmList}
          //   multiple
          size="20"
          name="Films"
          id="listFilms"
          style={{ minHeight: "23vh", fontSize: "1.4em", marginBottom: "20px" }}
        >
          {listallFilms.map((item, indx) => {
            return <option key={indx}>{item.title}</option>;
          })}
        </select>
      </div>
    </div>
  );
}

function NewDaySeans() {
  const { allFilms } = useLoaderData();
  const [strDate, setStrDate] = useState(now_Date);
  const navigate = useNavigate();
  const fList = useRef();
  //   console.log(strDate);
  const handleDatevalue = (event) => {
    setStrDate(event.target.value);
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="row">
      <div className="container">
        <div className="col s12 m12 l12 white">
          <h4 className="center flow-text">
            Добавить новый репертуар на день.
          </h4>
        </div>
        <Suspense fallback={<Spinner1 />}>
          <Await
            resolve={allFilms}
            errorElement={
              <h5 className="center">
                Ошибка при загрузке списка фильмов...:(
              </h5>
            }
          >
            <ListFilms FilmList={fList} />
          </Await>
        </Suspense>
        <div className="row">
          <Form className="col s12 m12 l12 " method="post">
            <fieldset>
              <div className="row" style={{ marginBottom: "50px" }}>
                <div className="col s12">
                  <label htmlFor="newDate">
                    Введите дату репертуара:
                    <input
                      type="date"
                      name="newDate"
                      id="newDate"
                      // defaultValue={strDate}
                      value={strDate}
                      onChange={handleDatevalue}
                    />
                  </label>
                </div>
              </div>
              <RowSeans
                FilmsList={fList}
                nomerS={1}
                seansFilm={"09:00-10:30"}
              />
              <RowSeans
                FilmsList={fList}
                nomerS={2}
                seansFilm={"11:00-12:30"}
              />
              <RowSeans
                FilmsList={fList}
                nomerS={3}
                seansFilm={"13:00-14:30"}
              />
              <RowSeans
                FilmsList={fList}
                nomerS={4}
                seansFilm={"15:00-16:30"}
              />
              <RowSeans
                FilmsList={fList}
                nomerS={5}
                seansFilm={"17:00-18:30"}
              />
              <RowSeans
                FilmsList={fList}
                nomerS={6}
                seansFilm={"19:00-20:30"}
              />
              <RowSeans
                FilmsList={fList}
                nomerS={7}
                seansFilm={"21:00-22:30"}
              />
              <div className="row" style={{ marginTop: "25px" }}>
                <div className="col s12 m12 l12 center">
                  <button className="btn green lighten-2" type="submit">
                    Отправить репертуар на сервер
                  </button>
                  <button
                    className="btn red lighten-1"
                    type="cancel"
                    style={{ marginLeft: "30px" }}
                    onClick={handleCancel}
                  >
                    Отменить
                  </button>
                </div>
              </div>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default NewDaySeans;
