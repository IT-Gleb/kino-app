export const MAXITEMSONPAGE = 8;

export const BaseImagePath = process.env.PUBLIC_URL + "/accets/imgs/cards/";
// console.log(BaseImagePath);

export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function noFakePathinImage(paramFilename) {
  const fakePath = "C:\\fakepath\\";

  let currStr = paramFilename.replace(fakePath, "");
  // console.log(currStr);
  return currStr;
}

export function get_Day(paramDate) {
  let dt = new Date(paramDate);
  return dt.toLocaleDateString();
}

// export const Segodnya = () => {
//   let dt = new Date();
//   let day = dt.getDay() + 1;
//   let strDay = "";
//   let Month = dt.getMonth();
//   let strMounth = "";
//   if (day < 10) {
//     strDay = "0" + String(day);
//   }
//   if (Month < 10) {
//     strMounth = "0" + String(Month + 1);
//   }
//   let seg = strDay + "." + strMounth + "." + String(dt.getFullYear());
//   return seg;
// };

export const now_Date = () => {
  let dt = new Date();
  let day = dt.getDate();
  let strDay = String(day).padStart(2, "0");
  let strMonth = String(dt.getMonth() + 1).padStart(2, "0");
  // let strMounth = "";
  // strDay = String(day);
  // if (day < 10) {
  //   strDay = "0" + String(day);
  // }
  // strMounth = String(Month);
  // if (Month < 10) {
  //   strMounth = "0" + String(Month);
  // }
  let seg = String(dt.getFullYear()) + "-" + strMonth + "-" + strDay;
  return seg;
};

export const dateStringFromData = (paramData) => {
  // let dt = new Date(paramStr);
  let dt = paramData;
  let day = dt.getDate();
  let strDay = "";
  let strMonth = String(dt.getMonth() + 1).padStart(2, "0");
  // let strMounth = "";
  strDay = String(day).padStart(2, "0");
  // if (day < 10) {
  //   strDay = "0" + String(day);
  // }
  // strMounth = String(Month);
  // if (Month < 10) {
  //   strMounth = "0" + String(Month);
  // }
  let result = String(dt.getFullYear()) + "-" + strMonth + "-" + strDay;
  return result;
};

export const nowDay = (paramDate) => {
  let dt = null;
  let strDay = "";
  if (paramDate.length > 0) {
    dt = new Date(paramDate);
  } else {
    dt = new Date();
  }
  let indexDay = dt.getDay();
  switch (indexDay) {
    case 0:
      strDay = "Воскресение";
      break;
    case 1:
      strDay = "Понедельник";
      break;
    case 2:
      strDay = "Вторник";
      break;
    case 3:
      strDay = "Среда";
      break;
    case 4:
      strDay = "Четверг";
      break;
    case 5:
      strDay = "Пятница";
      break;
    case 6:
      strDay = "Суббота";
      break;
    default:
      strDay = "Воскресение";
      break;
  }
  return strDay;
};

export function dateToLocale(paramDate) {
  let dt = new Date(paramDate);
  // console.log(dt);
  return dt.toLocaleDateString();
}

export const getSearchData = async (paramUrl) => {
  let result = [];
  try {
    const res = await fetch(paramUrl, {
      method: "GET",
      "Content-Type": "application/json",
    });
    if (res.ok) {
      result = await res.json();
    }
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getParamStr = (paramBool, paramStr) => {
  if (paramBool) {
    return "Films?search=" + paramStr;
  } else {
    return "Films?title=" + paramStr;
  }
};

export const getStrMonth = (paramMonth) => {
  const mounths = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  return mounths[paramMonth];
};

export const getMonthStr = (paramDate, paramNum) => {
  let result = "";
  let nowDate = new Date(paramDate);
  let newDate = new Date(paramDate);
  newDate.setDate(newDate.getDate() + paramNum);
  if (nowDate.getMonth() === newDate.getMonth())
    result = getStrMonth(nowDate.getMonth());
  else
    result =
      getStrMonth(nowDate.getMonth()) + "/" + getStrMonth(newDate.getMonth());

  return result;
};
