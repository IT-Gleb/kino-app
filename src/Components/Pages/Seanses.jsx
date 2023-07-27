import { useContext } from "react";
import { Suspense } from "react";
import {
  Await,
  defer,
  useAsyncValue,
  useLoaderData,
  useNavigate,
} from "react-router";
import { NavLink } from "react-router-dom";
import {
  nowDay,
  // get_Day,
  now_Date,
  dateToLocale,
  getMonthStr,
  dateStringFromData,
} from "../../libs/libs";
import { ParamKinozal } from "../context/searchContext";
import Spinner1 from "../spinner/Spinner";
import styles from "./Seanses.module.css";

async function getSeans({ params }) {
  // const Url = `https://639e05c83542a26130555cae.mockapi.io/Films/45/seanses/45`;
  let par1 = "2023-01-05";
  // console.log(params.seansId);
  if (params.seansId === "1") {
    par1 = now_Date();
    // console.log(par1);
  } else {
    par1 = params.seansId;
  }
  // console.log(par1);
  const Url = `https://639e05c83542a26130555cae.mockapi.io/IdSeanses?filter=${par1}`;
  // const Url = `https://639e05c83542a26130555cae.mockapi.io/IdSeanses/${params.seansId}`;
  // const Url = `https://639e05c83542a26130555cae.mockapi.io/idSeanses?filter=${par1}`;

  try {
    const res = await (await fetch(Url)).json();
    // console.log(res);
    return res;
  } catch (error) {
    return new Error("Can't get data from seanses page...");
  }
}

export const loader = async (params) => {
  return defer({
    seans: getSeans(params),
  });
};

function NewSeanses({ paramStrData, paramMaxItem }) {
  let strMonth = getMonthStr(paramStrData, paramMaxItem);
  let items = [];
  let ind = 0;
  let dt = null;
  let itemObj = { day: "", fullDay: "", sDay: "" };
  let strD = "0";
  if (paramMaxItem > 0) {
    ind = 0;
    while (ind < paramMaxItem) {
      itemObj = { day: "", fullDay: "" };
      dt = new Date(paramStrData);
      dt.setDate(dt.getDate() + ind);
      strD = String(dt.getDate()).padStart(2, "0");
      itemObj.day = strD;
      itemObj.fullDay = dateStringFromData(dt);
      itemObj.sDay = nowDay(itemObj.fullDay);
      items[ind] = itemObj;
      ind++;
    }
  }

  return (
    <div className="row">
      <h5 className="center flow-text">Ближайшие сеансы {strMonth}</h5>
      <ul className={styles.seansesList}>
        {items.map((item, i) => {
          return (
            <li key={i}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.seansLink
                }
                to={"/seanses/" + item.fullDay}
              >
                {item.day}
                <br />
                {item.sDay}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function TableRow({ num, nameFilm, seansData, clickHandle }) {
  return (
    <tr>
      <td>{num}</td>
      <td className={styles.td_class} onClick={clickHandle}>
        <h5 className="flow-text">{nameFilm}</h5>
      </td>
      <td>
        <h6 className="flow-text">{seansData}</h6>
      </td>
    </tr>
  );
}

function ResolvedSeans() {
  const ResSeans = useAsyncValue();
  const navigate = useNavigate();
  const baseUrl = "/kinozal";
  const { setSeansValue } = useContext(ParamKinozal);
  let strNowDate = now_Date();
  // console.log(strNowDate);

  const handleKinozal = (paramDt, paramSeans, paramTitle) => {
    let newSeansValue = { Dt: undefined, Seans: undefined, Title: undefined };
    newSeansValue.Dt = paramDt;
    newSeansValue.Seans = paramSeans;
    newSeansValue.Title = paramTitle;
    setSeansValue(newSeansValue);

    // alert(paramDt + "  :  " + paramSeans + "  :  " + paramTilte);
    navigate(baseUrl);
  };

  // console.log(ResSeans);
  return (
    <>
      <NewSeanses paramStrData={strNowDate} paramMaxItem={7} />

      <h6 className="center flow-text">
        <b>сеансы на: </b>
        <span style={{ color: "green" }}>
          {nowDay(ResSeans[0].day) + " " + dateToLocale(ResSeans[0].day) + "г."}
        </span>
      </h6>
      <table className="centered striped responsive-table">
        <thead>
          <tr>
            <th>N/N</th>
            <th>Название фильма</th>
            <th>Сеанс</th>
          </tr>
        </thead>
        <tbody>
          {ResSeans.map((item) => {
            return item.seanses.map((seans, indx) => {
              return (
                <TableRow
                  key={indx}
                  num={seans.number}
                  nameFilm={seans.title}
                  seansData={seans.seans}
                  clickHandle={() =>
                    handleKinozal(ResSeans[0].day, seans.seans, seans.title)
                  }
                />
              );
            });
          })}
        </tbody>
      </table>
    </>
  );
}

function Seanses() {
  const { seans } = useLoaderData(); //useAsyncValue();

  return (
    <>
      <Suspense fallback={<Spinner1 />}>
        <Await
          resolve={seans}
          errorElement={<p className="center">Ошибка при загрузке данных!!!</p>}
        >
          <ResolvedSeans />
        </Await>
      </Suspense>
    </>
  );
}

export default Seanses;
