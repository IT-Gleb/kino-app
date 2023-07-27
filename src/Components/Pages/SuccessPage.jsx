import React, { useState, useRef, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { nowDay } from "../../libs/libs";
import { ParamKinozal } from "../context/searchContext";
import TicketsRyad from "../tickets/Tickets";
import { clearTikets } from "../../store-tickets/ticketsSlice";

const MAX_SEC = 25;

const MemoPageBody = React.memo(function PageBody() {
  const { seansValue } = useContext(ParamKinozal);
  //console.log("Render pageBody");

  return (
    <div className="row">
      <div className="col s12 center">
        <h4>Поздравляем с успешным заказом Билетов</h4>
      </div>
      <div className="col s12 center">
        <dl>
          <dt>
            <b>Фильм:</b>
          </dt>
          <dd>
            <h4>{seansValue.Title}</h4>
            <div className="divider"></div>
          </dd>
          <dt>
            <b>Дата сеанса:</b>{" "}
          </dt>
          <dd>
            <h5>{nowDay(seansValue.Dt) + " >> " + seansValue.Dt}</h5>
            <div className="divider"></div>
          </dd>
          <dt>
            <b>Время сеанса:</b>
          </dt>
          <dd>
            <h5>{seansValue.Seans}</h5>
            <div className="divider"></div>
          </dd>
        </dl>
      </div>
    </div>
  );
});

function SuccessPage() {
  const [Count, setCount] = useState(MAX_SEC);
  const timerRef = useRef(-1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { seansValue } = useContext(ParamKinozal);
  let nav_url = "/seanses/" + seansValue.Dt;

  useEffect(() => {
    if (timerRef.current === -1) {
      timerRef.current = setInterval(() => {
        setCount((prev) => {
          return prev - 1;
        });
      }, 1100);
    }

    return () => {
      if (timerRef.current !== -1) {
        clearInterval(timerRef.current);
        timerRef.current = -1;
        //console.log("Stop Timer");
      }
    };
  }, []);

  useEffect(() => {
    if (Count <= 0) {
      dispatch(clearTikets());
      navigate(nav_url);
    }
  }, [Count, nav_url, navigate, dispatch]);

  //console.log("Render main");
  return (
    <>
      <MemoPageBody />
      <TicketsRyad paramShowBtn={false} />

      <div className="col s12 center">
        <p>Скоро вы перейдете на страницу с сеансами:</p>
        <span>{Count}</span>
      </div>
      <div className="divider"></div>
    </>
  );
}

export default SuccessPage;
