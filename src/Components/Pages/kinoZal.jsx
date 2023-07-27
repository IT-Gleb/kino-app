import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { dateToLocale, nowDay } from "../../libs/libs";
import { ParamKinozal } from "../context/searchContext";
import zalfromFileData from "../../json/kino-zal.json";
import "./kinoZal.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addTicket,
  removeTicket,
  initTikets,
  //  clearTikets,
  updateRe,
  // saveZalData,
} from "../../store-tickets/ticketsSlice";
import { cloneDeep } from "lodash";
import { useNavigate } from "react-router";
import TicketsRyad from "../tickets/Tickets";

const RYADNAME = "ryad";

function Mbutton({ paramObj }) {
  const { seansValue } = useContext(ParamKinozal);
  const [isActive, setIsActive] = useState(paramObj.active);
  const dispatch = useDispatch();

  const handleClick = () => {
    let aData = {};

    if (seansValue.Seans === undefined || seansValue.Dt === undefined)
      return false;

    aData = { ...paramObj };
    aData.day = seansValue.Dt;
    aData.seans = seansValue.Seans;
    //    aData = Object.assign({}, paramObj);
    //console.log(aData);
    aData.active = !aData.active;
    //console.log(aData);
    //    console.log("Now");
    paramObj.active = aData.active;

    //    console.log(paramObj);
    setIsActive(paramObj.active);
    // console.log(aData.active, aData.id);
    if (aData.active) {
      dispatch(addTicket(aData));
      // console.log(zalfromFileData);
    }

    //Удалить если есть такой в массиве
    if (!aData.active) {
      dispatch(removeTicket(aData));
      //  console.log(zalfromFileData);
    }
  };

  return (
    <button
      key={paramObj.id}
      title={`Стоимость = ${paramObj.cost} руб.`}
      onClick={handleClick}
      className={isActive ? "active-mesto" : "mesto"}
    >
      {paramObj.num}
    </button>
  );
}

function RowRyad({ RyadItems }) {
  const [buttons, setButtons] = useState([]);
  //console.log(RyadItems);
  // console.log(paramTickets);

  useEffect(() => {
    //Add id
    let btnObj = {};
    let tmp = [];
    if (RyadItems && RyadItems.length > 0) {
      for (let i = 0; i < RyadItems.length; i++) {
        btnObj = RyadItems[i];
        // btnObj.id = uuidv4();
        tmp.push(btnObj);
      }
      setButtons(tmp);
    }
  }, [RyadItems]);

  return (
    <>
      <div className="row">
        <div className="col s12 buttons--line">
          {buttons.map((btn) => {
            return <Mbutton key={btn.id} paramObj={btn} />;
          })}
        </div>
      </div>
    </>
  );
}

function SaveToStorage(paramName, paramData) {
  let StringData = JSON.stringify(paramData);
  window.localStorage.setItem(paramName, StringData);
  //console.log("Сохранил данные");
}

function KinoZal() {
  const { seansValue } = useContext(ParamKinozal);
  const checkNull = useSelector((state) => state.alltickets.reUpdate);
  const dispatch = useDispatch();
  //let zalData = {};
  const [zalData, setZalData] = useState({});
  const tickets = useSelector((state) => state.alltickets.tickets);
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  let dtSeans = "не определено";
  let vSeans = "не определено";
  let vNameFilm = "не определено";
  let fName = String(seansValue.Dt) + "/" + String(seansValue.Seans);
  let nav_url = "/не определено";
  //console.log(fName);
  let tmpZalData = {};

  const clearZalData = () => {
    tmpZalData = {};
    tmpZalData = cloneDeep(zalfromFileData);
  };

  const checkData = () => {
    tmpZalData = JSON.parse(window.localStorage.getItem(fName));
    if (tmpZalData === null) {
      clearZalData();
      setIsLoaded(false);
    } else {
      setIsLoaded(true);
    }
    setZalData(tmpZalData);
    dispatch(initTikets(tmpZalData.tickets));
  };

  useEffect(() => {
    if (checkNull === 0) {
      checkData();
    }
    if (checkNull === 3) {
      //Сохранить данные в localStorage
      zalData.tickets = cloneDeep(tickets);
      SaveToStorage(fName, zalData);

      //Очистить данные
      clearZalData();
      setZalData(tmpZalData);
      //dispatch(clearTikets());
      dispatch(updateRe(0));
      //Перейти на страницу успешного
      nav_url = "/successTicket";
      navigate(nav_url);
    }
    //console.log(checkNull);
  }, [checkNull]);

  return (
    <>
      <div className="row">
        <div className="container">
          <div className="col s12">
            <table className="centered responsive-table">
              <thead>
                <tr>
                  <th>Название фильма</th>
                  <th>Сеанс</th>
                  <th>Дата</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="named">
                    {seansValue.Title !== undefined
                      ? seansValue.Title
                      : vNameFilm}
                  </td>
                  <td className="bolded">
                    {seansValue.Seans !== undefined ? seansValue.Seans : vSeans}
                  </td>
                  <td>
                    {seansValue.Dt !== undefined
                      ? nowDay(seansValue.Dt) +
                        " " +
                        dateToLocale(seansValue.Dt)
                      : dtSeans}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <h4 className="center">Схема кинозала</h4>
        </div>
      </div>

      <div className="row">
        <div className="col s12">
          <div className="allRyads">
            <div className="ekran center">Экран</div>
            <div className="proxod"></div>
            {zalData && (
              <>
                <RowRyad RyadItems={zalData[RYADNAME + String(1)]} />
                <RowRyad RyadItems={zalData[RYADNAME + String(2)]} />
                <RowRyad RyadItems={zalData[RYADNAME + String(3)]} />
                <RowRyad RyadItems={zalData[RYADNAME + String(4)]} />
                <div className="proxod2"></div>
                <RowRyad RyadItems={zalData[RYADNAME + String(5)]} />
                <RowRyad RyadItems={zalData[RYADNAME + String(6)]} />
                <RowRyad RyadItems={zalData[RYADNAME + String(7)]} />
                <RowRyad RyadItems={zalData[RYADNAME + String(8)]} />
                <div className="proxod"></div>
                <RowRyad RyadItems={zalData[RYADNAME + String(9)]} />
                <RowRyad RyadItems={zalData[RYADNAME + String(10)]} />
                <RowRyad RyadItems={zalData[RYADNAME + String(11)]} />
                <RowRyad RyadItems={zalData[RYADNAME + String(12)]} />
                <div className="proxod2"></div>
              </>
            )}
          </div>
          <TicketsRyad paramShowBtn={!isLoaded} />
        </div>
      </div>
    </>
  );
}

export default KinoZal;
