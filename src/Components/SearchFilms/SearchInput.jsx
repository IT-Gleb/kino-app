import { debounce } from "lodash";
import { useCallback, useContext, useRef, useState } from "react";
import { CheckContext, SearchContext } from "../context/searchContext";
import styles from "./search.module.css";

function SearchInput() {
  const handled_input = useRef();
  const [strValue, setStrValue] = useState("");
  const { setSearchText } = useContext(SearchContext);
  const { isChecked, setIsChecked } = useContext(CheckContext);
  const [placeholder_text, setPlaceholderText] = useState(
    "Введите наименование фильма"
  );

  const deb_Func = useCallback(
    debounce((paramStr) => {
      setSearchText(paramStr);
    }, 800),
    []
  );

  const handleCancelClick = () => {
    setStrValue("");
    setSearchText("");
    setIsChecked(false);
    handled_input.current.focus();
  };

  const handleChange = (event) => {
    setStrValue(event.target.value);
    deb_Func(event.target.value);
  };

  const handleCheck = (event) => {
    setIsChecked(event.target.checked);
    if (!isChecked) setPlaceholderText("Введите что-нибудь");
    else setPlaceholderText("Введите наименование фильма");

    handled_input.current.focus();
  };

  return (
    <>
      <div className={styles.search_div}>
        <label className={styles.check_label} htmlFor="iFields">
          {isChecked ? "Искать везде:" : ""}
          <br />
          <input
            type="checkbox"
            checked={isChecked}
            // value={isChecked}
            onChange={handleCheck}
            title="Поиск по всем полям"
            name="inputFields"
            id="iFields"
          />
          <span></span>
        </label>
        <label className={styles.search_label} htmlFor="searchq">
          {isChecked ? "" : "Искать по наименованию:"}
          <br />
          <input
            className="browser-default"
            ref={handled_input}
            type="text"
            name="q"
            id="searchq"
            autoComplete="off"
            autoFocus
            placeholder={placeholder_text}
            value={strValue}
            onChange={handleChange}
          ></input>
          {strValue.length > 0 ? (
            <svg
              className={styles.deleted_btn}
              onClick={handleCancelClick}
              width="15px"
              height="15px"
              viewBox="0 0 512 512"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xlinkTitle="Очистить"
              title="Очистить"
            >
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="work-case"
                  fill="#000000"
                  transform="translate(91.520000, 91.520000)"
                >
                  <polygon
                    id="Close"
                    points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48"
                  ></polygon>
                </g>
              </g>
            </svg>
          ) : (
            ""
          )}
        </label>
      </div>
    </>
  );
}

export { SearchInput };
