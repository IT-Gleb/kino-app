import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./mainmenu.css";

function MainMenu({ value }) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    setMenuItems((current) => {
      current = value.map((item, indx) => {
        if (item.title === "Параметры") {
          return (
            <li className="main-menu-item" id="main-submenu" key={indx}>
              {item.title}
              {/* DropDown structure */}
              <ul className="submenu1 brown darken-2">
                <li className="submenu1-item">
                  <Link to="/seanses/add">Добавить репертуар</Link>
                </li>
                <li className="divider" tabIndex="-1"></li>
                <li className="submenu1-item">
                  <Link to="addFilm">Добавить фильм</Link>
                </li>
              </ul>
            </li>
          );
        } else
          return (
            <li className="main-menu-item" key={indx}>
              <Link to={item.page}> {item.title}</Link>
            </li>
          );
      });
      return current;
    });
  }, [value]);

  return (
    <div className="row brown darken-4">
      <div className="container">
        <div className="col s12 m12 l12 brown darken-2 grey-text text-lighten-5">
          <ul className="Main-menu">
            <li></li>
            {menuItems}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(MainMenu);
