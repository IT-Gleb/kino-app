import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ParamKinozal } from "../context/searchContext";
import {
  updateRe,
  // saveZalData,
} from "../../store-tickets/ticketsSlice";
import "./tickets.css";

function SaveButton() {
  const { seansValue } = useContext(ParamKinozal);
  const dispatch = useDispatch();

  const handleSaveClick = () => {
    if (seansValue.Seans === undefined || seansValue.Dt === undefined)
      return false;
    dispatch(updateRe(3));
  };
  return (
    <div className="col s12">
      <button className="zakazBtn" onClick={handleSaveClick}>
        Сделать заказ
      </button>
    </div>
  );
}

function TickedItem(paramTicked) {
  return (
    <div className="ticked-Wrapped">
      <div className="ticked-header">Билет</div>
      <div className="ticked-Body">
        <dl>
          <dt>Дата:</dt>
          <dd>{paramTicked.paramTicket.day}</dd>
          <dt>Сеанс:</dt>
          <dd>{paramTicked.paramTicket.seans}</dd>
        </dl>
        <dl>
          <dt>Ряд:</dt>
          <dd>{paramTicked.paramTicket.ryad}</dd>
          <dt>Место:</dt>
          <dd>{paramTicked.paramTicket.num}</dd>
        </dl>
        <dl>
          <dt>Цена:</dt>
          <dd>{paramTicked.paramTicket.cost}руб.</dd>
        </dl>
      </div>
      <div className="ticked-footer"></div>
    </div>
  );
}

function TicketsRyad({ paramShowBtn }) {
  const [ticks, setTicks] = useState([]);
  const [mCost, setMcost] = useState(0);
  const tickets = useSelector((state) => state.alltickets.tickets);
  const [isShowBtn, setShowBtn] = useState(false);

  // console.log(tickets.length);
  //console.log("Render TicketsRyad");

  useEffect(() => {
    let tick = [];
    if (tickets) {
      tick = tickets.filter((value) => {
        return value.active === true;
      });

      setTicks(tick);
    }

    if (tick) {
      let tmpCost = tick.reduce((currentSum, paramObj) => {
        return currentSum + paramObj.cost;
      }, 0);
      setMcost(tmpCost);
    }

    setShowBtn(tick.length > 0);
    // console.log(tick.length);
  }, [tickets]);

  //console.log(paramShowBtn);

  return (
    <>
      <div className="rowRyad">
        <div className="cost-line">Билетов на сумму: {mCost} руб.</div>
        {ticks && ticks.length > 0 ? (
          ticks.map((ticked) => {
            return <TickedItem key={ticked.id} paramTicket={ticked} />;
          })
        ) : (
          <h5 className="center">У Вас нет билетов в заказе (..)</h5>
        )}
      </div>
      {paramShowBtn && <div className="row">{isShowBtn && <SaveButton />}</div>}
    </>
  );
}

export default React.memo(TicketsRyad);
