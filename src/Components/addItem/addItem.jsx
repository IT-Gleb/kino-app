import React, { useState, useRef } from "react";
import axios from "axios";
import M from "materialize-css";
import { noFakePathinImage } from "../../libs/libs";

// import a_style from "./addItem.module.css";

function AddItemA() {
  const [nameValue, setNameValue] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [stText, setStText] = useState("");
  const [year, setYear] = useState(1980);

  let activeRef = useRef();

  const onChangeText = (event) => {
    setNameValue(event.target.value);
  };

  const onChangeRating = (event) => {
    setRating(event.target.value);
  };

  const onChangeYear = (event) => {
    setYear(event.target.value);
  };

  const postAddMessage = async () => {
    let addUrl = "https://639e05c83542a26130555cae.mockapi.io/Films";
    let filmInformation = addObjectFilm(
      nameValue,
      description,
      noFakePathinImage(imageUrl),
      year,
      rating
    );

    try {
      await axios.post(addUrl, filmInformation);
      // console.log("Ok");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const onBtnClick = (event) => {
    let Ok = false;
    let a_text = { html: "Данные о фильме отправлены успешно!" };
    event.preventDefault();
    // if (window.confirm("Отправляем сообщение???")) {
    // console.log(addObjectFilm(nameValue, description, imageUrl, rating));
    if (nameValue.length <= 3) {
      M.toast({ html: "Нет наименования фильма." });
      return Ok;
    }
    Ok = postAddMessage();
    if (Ok) {
      setNameValue("");
      setDescription("");
      setImageUrl("");
      setYear(1980);
      setRating(0);
      setStText("Данные отправдены успешно");
    } else {
      setStText("Данные не удалось отправить на сервер");
      a_text.html = "Данные не удалось отправить на сервер";
      // M.toast({ html: "Данные не удалось отправить на сервер" });
    }
    M.toast(a_text);
    activeRef.current.focus();
    return Ok;
  };

  function addObjectFilm(
    paramTitle,
    paramDescription,
    paramImageUrl,
    paramYear,
    paramRating
  ) {
    let objFilm = {
      title: "",
      description: "",
      imageUrl: "",
      year: 1980,
      rating: 0,
    };
    objFilm.title = paramTitle;
    objFilm.description = paramDescription;
    objFilm.imageUrl = paramImageUrl;
    objFilm.year = paramYear;
    objFilm.rating = paramRating;

    // return JSON.stringify(objFilm);
    return objFilm;
  }

  const onChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const onChangeImageUrl = (event) => {
    setImageUrl(event.target.value);
  };

  return (
    <div className="row">
      {/* {M.AutoInit} */}
      <form className="col s12 m6 offset-m3 grey lighten-4 center" action="#">
        <div className="input-field col s6">
          <label htmlFor="addName">Наименование фильма</label>
          <input
            ref={activeRef}
            type="text"
            id="addName"
            name="addName"
            maxLength={40}
            value={nameValue}
            onChange={onChangeText}
            // placeholder="Введите наименование..."
            className="validate"
            required
            autoComplete="off"
            autoFocus
          ></input>
        </div>
        <div className="input-field col s6">
          <label htmlFor="addRating">Рейтинг фильма</label>
          <input
            id="addRating"
            name="addRating"
            value={rating}
            onChange={onChangeRating}
            type="text"
            autoComplete="off"
            maxLength={3}
            // placeholder="Рейтинг кинофильма..."
            className="validate"
            required
          ></input>
        </div>
        <div className="input-field col s6">
          <label htmlFor="addYear">Год выпуска фильма</label>
          <input
            id="addYear"
            name="addYear"
            value={year}
            onChange={onChangeYear}
            type="text"
            maxLength={4}
            autoComplete="off"
            // placeholder="Год выхода на экран..."
            className="validate"
            required
          ></input>
        </div>
        <div className="input-field col s12">
          <label htmlFor="textarea1">Описание фильма</label>
          <textarea
            id="textarea1"
            name="description"
            value={description}
            className="materialize-textarea"
            rows="5"
            cols="33"
            // placeholder="описание фильма"
            onChange={onChangeDescription}
          ></textarea>
        </div>
        <div className="file-field input-filed col s6">
          <div className="btn">
            <span>Файл</span>
            <input
              type="file"
              name="imageUrl"
              value={imageUrl}
              onChange={onChangeImageUrl}
            ></input>
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path"
              type="text"
              placeholder="Загрузите файл с изображением"
            ></input>
          </div>
        </div>
        <div className="col s6">
          <button
            className=" right waves-effect blue darken-1 btn"
            type="submit"
            onClick={onBtnClick}
          >
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddItemA;
