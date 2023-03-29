import { STATUS, BASE_URL } from "@/utils/constants";
import { EMPLOYEE_TYPE } from "@/utils/constantLists";
import store from "../store";
import i18n from "@/i18n/index.js";

const lang = localStorage.getItem("userLanguage") || "ar";
// const theme = localStorage.getItem("userTheme") || "light";
const rootStyle = document.documentElement.style;
document.title = i18n.t("projectName");

//#region Authentication
export const ifAuthenticated = (to, from, next) => {
  if (store.getters.userData) {
    next({ path: "/news" });
  } else {
    next();
  }
};
export const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.userData) {
    next({ path: "/" });
  } else {
    next();
  }
};
//#endregion Authentication

//#region Validation
export const validNumber = (number) => {
  var re = /^[0-9]*$/;
  return re.test(number);
};
export const validEmail = (email) => {
  var re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
export const isNameAr = (name) => {
  // loop throw data and trim
  const NAME_PATTERN_AR = /^[ \u0600-\u065F\u066A-\u06EF\u06FA-\u06FF0-9-_]+$/;
  return NAME_PATTERN_AR.test(name);
};
export const isTextAr = (text) => {
  // loop throw data and trim
  const TEXT_PATTERN_AR =
    /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF][ \u0600-\u065F\u066A-\u06EF\u06FA-\u06FF0-9-،._\\/\n\r\t(){}'\\" ]+$/;
  return TEXT_PATTERN_AR.test(text);
};
export const isTextEn = (text) => {
  // loop throw data and trim
  const TEXT_PATTERN_EN = /^[a-zA-Z0-9-،._\\/\n\r\t(){}'\\" ]/;
  return TEXT_PATTERN_EN.test(text);
};
export const isNameEN = (name) => {
  // loop throw data and trim
  const NAME_PATTERN_EN = /^[a-zA-Z0-9\s]+$/;
  return NAME_PATTERN_EN.test(name);
};

export const isLessThan = (val, len) => {
  // loop throw data and trim
  return val.length < len;
};
export const isGreaterThan = (val, len) => {
  // loop throw data and trim
  return val.length > len;
};
//#endregion Validation

//#region Date & Time
export const date2slash = (date) => {
  if (date.indexOf("-") > -1) return date.replace(/-/g, "/");
  else return date;
};
export const date2dash = (date) => {
  if (date.indexOf("/") > -1) return date.replace(/\//g, "-");
  else return date;
};
export const timeTo12 = (time = "") => {
  if (time.length > 1) {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? " am" : " pm"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
    time[0] = time[0] < 10 ? "0" + time[0] : time[0];
    // time[3] = ""; hide seconds
    return time.join("");
  }
  return time;
};
export const timeTo24 = (time = "") => {
  if (time.length > 1) {
    const [theTime, modifier] = time.split(" ");
    let [hours, minutes, seconds] = theTime.split(":");

    if (hours == "12") {
      hours = "00";
    }
    if (modifier == "PM" || modifier == "pm") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}:${seconds}`;
  }
  return time;
};
export const timeToAr = (time) => {
  if (time.indexOf("AM") > -1) return time.replace(/AM/g, "ص");
  else if (time.indexOf("PM") > -1) return time.replace(/PM/g, "م");
  else return time;
};
export const timeToEn = (time) => {
  if (time.indexOf("ص") > -1) return time.replace(/ص/g, "AM");
  else if (time.indexOf("م") > -1) return time.replace(/م/g, "PM");
  else return time;
};
export const timeToLang = (time, lang = "ar") => {
  if (lang == "ar" && time.indexOf("AM") > -1) return time.replace(/AM/i, "ص");
  else if (lang == "ar" && time.indexOf("PM") > -1)
    return time.replace(/PM/i, "م");
  else if (lang == "ar" && time.indexOf("am") > -1)
    return time.replace(/am/i, "ص");
  else if (lang == "ar" && time.indexOf("pm") > -1)
    return time.replace(/pm/i, "م");
  else if (lang == "en" && time.indexOf("ص") > -1)
    return time.replace(/ص/i, "AM");
  else if (lang == "en" && time.indexOf("م") > -1)
    return time.replace(/م/i, "PM");
  else return time;
};
export const getTimeFormatInMinSec = (seconds = "", minutes = "") => {
  seconds = seconds.toString().length == 1 ? `0${seconds}` : seconds;
  minutes = minutes.toString().length == 1 ? `0${minutes}` : minutes;
  let string = `${minutes}:${seconds}`;
  return string;
};

export const convertValueToMilliSeconds = (value, convertFrom) => {
  /*
  convertFrom :
  1 => Seconds case
  2 => Minutes case
  3 => Hours case
  4 => Days case
  */
  let response = {
    data: {
      status: STATUS.ERROR,
      msg: i18n.t("failedOperation"),
      data: "",
    },
  };
  value = value == "" || value == undefined ? 0 : value;
  if (isNaN(value)) {
    response.data.msg = value + " " + i18n.t("mustBeNumber");
    return response;
  }
  value = parseFloat(value);
  if (!Number.isInteger(value)) {
    response.data.msg = value + " " + i18n.t("mustBeInteger");
    return response;
  }
  switch (convertFrom) {
    case 1:
      if (value < 0 || value > 59) {
        response.data.msg =
          value + " " + i18n.t("mustBeGreaterThan0AndLessThan59");
        return response;
      }
      response.data.data = value * 1000;
      break;
    case 2:
      if (value < 0 || value > 59) {
        response.data.msg =
          value + " " + i18n.t("mustBeGreaterThan0AndLessThan59");
        return response;
      }
      response.data.data = value * 60 * 1000;
      break;
    case 3:
      if (value < 0 || value > 23) {
        response.data.msg =
          value + " " + i18n.t("mustBeGreaterThan0AndLessThan23");
        return response;
      }
      response.data.data = value * 60 * 60 * 1000;
      break;
    case 4:
      response.data.data = value * 24 * 60 * 60 * 1000;
      break;
    default:
      return response;
  }
  response.data.status = STATUS.SUCCESS;
  response.data.msg = i18n.t("successOperation");
  return response;
};
export const convertToMilliSeconds = (seconds, minutes, hours, days) => {
  let response = {
    data: {
      status: STATUS.SUCCESS,
      msg: i18n.t("successOperation"),
      data: "",
    },
  };
  let check1 = convertValueToMilliSeconds(seconds, 1);
  if (check1.data.status != STATUS.SUCCESS) return check1;

  let check2 = convertValueToMilliSeconds(minutes, 2);
  if (check2.data.status != STATUS.SUCCESS) return check2;

  let check3 = convertValueToMilliSeconds(hours, 3);
  if (check3.data.status != STATUS.SUCCESS) return check3;

  let check4 = convertValueToMilliSeconds(days, 4);
  if (check4.data.status != STATUS.SUCCESS) return check4;

  response.data.data =
    check1.data.data + check2.data.data + check3.data.data + check4.data.data;
  return response;
};
export const convertMilliSecondsToTime = (value) => {
  let response = {
    data: {
      status: STATUS.ERROR,
      msg: i18n.t("failedOperation"),
      data: "",
    },
  };
  value = value == "" || value == undefined ? 0 : value;
  if (isNaN(value)) {
    value = 0;
  }
  value = parseFloat(value);
  if (!Number.isInteger(value)) {
    value = 0;
  }
  if (value < 0) value = 0;

  var days = Math.floor(value / (24 * 60 * 60 * 1000));
  var remainderOfDays = value % (24 * 60 * 60 * 1000);
  var hours = Math.floor(remainderOfDays / (60 * 60 * 1000));
  var remainderOfHours = remainderOfDays % (60 * 60 * 1000);
  var minutes = Math.floor(remainderOfHours / (60 * 1000));
  var remainderOfMinutes = remainderOfHours % (60 * 1000);
  var seconds = Math.round(remainderOfMinutes / 1000);

  var string = `${days} ${i18n.t("days")}, `;
  string += `${hours} ${i18n.t("hours")}, `;
  string += `${minutes} ${i18n.t("minutes")}, `;
  string += `${seconds} ${i18n.t("seconds")}`;
  let data = {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    string: string,
  };

  response.data.status = STATUS.SUCCESS;
  response.data.msg = i18n.t("successOperation");
  response.data.data = data;
  return response;
};
export const convertTimeAndDaysToString = (seconds, minutes, hours, days) => {
  let response = {
    data: {
      status: STATUS.SUCCESS,
      msg: i18n.t("successOperation"),
      data: "",
    },
  };
  seconds = seconds == "" || seconds == undefined ? 0 : seconds;
  if (isNaN(seconds)) seconds = 0;
  seconds = parseFloat(seconds);
  if (seconds < 0) seconds = 0;

  minutes = minutes == "" || minutes == undefined ? 0 : minutes;
  if (isNaN(minutes)) minutes = 0;
  minutes = parseFloat(minutes);
  if (minutes < 0) minutes = 0;

  hours = hours == "" || hours == undefined ? 0 : hours;
  if (isNaN(hours)) hours = 0;
  hours = parseFloat(hours);
  if (hours < 0) hours = 0;

  days = days == "" || days == undefined ? 0 : days;
  if (isNaN(days)) days = 0;
  days = parseFloat(days);
  if (days < 0) days = 0;

  var string = `${days} ${i18n.t("days")}, `;
  string += `${hours} ${i18n.t("hours")}, `;
  string += `${minutes} ${i18n.t("minutes")}, `;
  string += `${seconds} ${i18n.t("seconds")}`;
  let data = {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    string: string,
  };

  response.data.data = data;
  return response;
};
export const getDateAndTime = (dateTime) => {
  let dateAndTime = dateTime.split(" ");
  let date = dateAndTime[0];
  let time = dateAndTime[1] + dateAndTime[2] + dateAndTime[3];
  let date_time = {
    date,
    time,
  };
  return date_time;
};
export const setDateAndTime = (date, time) => {
  if (date && time) {
    return `${date} ${time}`;
  } else {
    return ``;
  }
};

export const getDayOfDate = (date = "") => {
  let dayNumber = new Date().getDay();
  if (date) dayNumber = new Date(date).getDay();
  let day = "";
  if (dayNumber == 0) day = i18n.t("daysOfWeek.Sunday");
  else if (dayNumber == 1) day = i18n.t("daysOfWeek.Monday");
  else if (dayNumber == 2) day = i18n.t("daysOfWeek.Tuesday");
  else if (dayNumber == 3) day = i18n.t("daysOfWeek.Wednesday");
  else if (dayNumber == 4) day = i18n.t("daysOfWeek.Thursday");
  else if (dayNumber == 5) day = i18n.t("daysOfWeek.Friday");
  else if (dayNumber == 6) day = i18n.t("daysOfWeek.Saturday");
  return day;
};
export const getDayTokenOfDate = (date) => {
  let listDaysOfWeekData = [];
  let dateTime = new Date(date);
  if (!date || dateTime == "Invalid Date") return "";
  let dayNumber = dateTime.getDay();
  let day = "";

  if (store.getters.userData) {
    listDaysOfWeekData =
      store.getters.userData.constantLists.listDaysOfWeekData;
  } else {
    listDaysOfWeekData = [];
  }

  if (listDaysOfWeekData.length > 0) {
    if (dayNumber == 0) day = listDaysOfWeekData[1].itemToken;
    else if (dayNumber == 1) day = listDaysOfWeekData[2].itemToken;
    else if (dayNumber == 2) day = listDaysOfWeekData[3].itemToken;
    else if (dayNumber == 3) day = listDaysOfWeekData[4].itemToken;
    else if (dayNumber == 4) day = listDaysOfWeekData[5].itemToken;
    else if (dayNumber == 5) day = listDaysOfWeekData[6].itemToken;
    else if (dayNumber == 6) day = listDaysOfWeekData[0].itemToken;
  }
  return day;
};
export const formateDateDMY = (date, lang) => {
  let dates = date.split("/");
  if (lang == "en") {
    return dates[2] + "/" + dates[1] + "/" + dates[0];
  }
  return date;
};
export const formateDateTimeLang = (date, time, lang = "ar") => {
  if (date && time)
    return (
      getDayOfDate(date) +
      " " +
      formateDateDMY(date, lang) +
      " - " +
      timeToLang(time, lang)
    );
  else return i18n.t("notFound");
};
export const getObjectOfDateTime = (dateTime = "now") => {
  let response = {
    dateTimeUTC: "",
    dateTime: "",
    dateTime12: "",
    date: "",
    time: "",
    time12: "",
    timeCustomized: "",
  };

  // let theDateTime = dateTime ? new Date(dateTime) : new Date();
  let theDateTime = new Date(dateTime);
  if (!dateTime || theDateTime == "Invalid Date") theDateTime = new Date();

  let year = theDateTime.getFullYear();
  let month = theDateTime.getMonth() + 1;
  let day = theDateTime.getDate();
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  let hours = theDateTime.getHours();
  let minutes = theDateTime.getMinutes();
  let seconds = theDateTime.getSeconds();
  let m = "AM";
  let hours12;
  if (hours >= 12) {
    m = "PM";
    hours12 = hours % 12 < 10 ? `0${hours % 12}` : hours % 12;
  } else {
    hours12 = hours % 12 < 10 ? `0${hours}` : hours;
  }
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  let date = `${year}/${month}/${day}`;
  let time24 = `${hours}:${minutes}:${seconds}`;
  let time12 = `${hours12}:${minutes}:${seconds} ${m}`;
  let timeCustomized = `${hours12}:${minutes} ${m}`;
  let fullDateTime = `${date} ${time24}`;
  let fullDateTime12 = `${date} ${time12}`;

  response.dateTimeUTC = theDateTime;
  response.dateTime = fullDateTime;
  response.dateTime12 = fullDateTime12;
  response.date = date;
  response.time = time24;
  response.time12 = time12;
  response.timeCustomized = timeCustomized;
  return response;
};

export const addOrSubSecondsToDateTime = function (
  dateTime,
  seconds = 0,
  operation = "add"
) {
  let theDateTime = new Date(dateTime);
  if (!dateTime || theDateTime == "Invalid Date") return dateTime;
  let operationSgin = 1;
  switch (operation) {
    case "sub":
      operationSgin = -1;
      break;
    case "add":
    default:
      operationSgin = 1;
      break;
  }
  return new Date(theDateTime.getTime() + operationSgin * seconds * 1000);
};
//#endregion Date & Time

//#region General
export const setDataMultiLang = (lang, dataAr, dataEn, dataUnd = "") => {
  if (lang == "en") return dataEn;
  else if (lang == "und") return dataUnd;
  else return dataAr;
};
export const isDataExist = (data) => {
  return data || data === 0 ? data : i18n.t("notFound");
};
export const moneyFormat = (money) => {
  return (typeof money !== "undefined" ? money : 0) + i18n.t("EGP");
};
export const numberToAr = (number) => {
  if (number.indexOf("0") > -1) number = number.replace(/0/g, "٠");
  if (number.indexOf("1") > -1) number = number.replace(/1/g, "١");
  if (number.indexOf("2") > -1) number = number.replace(/2/g, "٢");
  if (number.indexOf("3") > -1) number = number.replace(/3/g, "٣");
  if (number.indexOf("4") > -1) number = number.replace(/4/g, "٤");
  if (number.indexOf("5") > -1) number = number.replace(/5/g, "٥");
  if (number.indexOf("6") > -1) number = number.replace(/6/g, "٦");
  if (number.indexOf("7") > -1) number = number.replace(/7/g, "٧");
  if (number.indexOf("8") > -1) number = number.replace(/8/g, "٨");
  if (number.indexOf("9") > -1) number = number.replace(/9/g, "٩");
  return number;
};
export const numberToEn = (number) => {
  if (number.indexOf("٠") > -1) number = number.replace(/٠/g, "0");
  if (number.indexOf("١") > -1) number = number.replace(/١/g, "1");
  if (number.indexOf("٢") > -1) number = number.replace(/٢/g, "2");
  if (number.indexOf("٣") > -1) number = number.replace(/٣/g, "3");
  if (number.indexOf("٤") > -1) number = number.replace(/٤/g, "4");
  if (number.indexOf("٥") > -1) number = number.replace(/٥/g, "5");
  if (number.indexOf("٦") > -1) number = number.replace(/٦/g, "6");
  if (number.indexOf("٧") > -1) number = number.replace(/٧/g, "7");
  if (number.indexOf("٨") > -1) number = number.replace(/٨/g, "8");
  if (number.indexOf("٩") > -1) number = number.replace(/٩/g, "9");
  return number;
};
export const getDeviceName = () => {
  return navigator.userAgent;
};
export const getBrowserName = () => {
  let userAgent = navigator.userAgent;

  if (userAgent.includes("Firefox") && !userAgent.includes("Seamonkey"))
    return "Firefox";
  else if (userAgent.includes("Seamonkey")) return "Seamonkey";
  else if (userAgent.includes("OPR") || userAgent.includes("Opera"))
    return "Opera";
  else if (userAgent.includes("MSIE") || userAgent.includes("Trident"))
    return "Internet Explorer";
  else if (userAgent.includes("Chrome") && !userAgent.includes("Chromium"))
    return "Chrome";
  else if (userAgent.includes("Chromium")) return "Chromium";
  else if (
    userAgent.includes("Safari") &&
    (!userAgent.includes("Chrome") || !userAgent.includes("Chromium"))
  )
    return "Safari";
  else return "Unkonwn";
};
export const checkPrivilege = (privilegeStatus) => {
  let employeeTypeToken =
    store.getters.userData.employeePersonalData.employeeTypeToken || null;

  return employeeTypeToken == EMPLOYEE_TYPE.FounderOfSystem ||
    privilegeStatus == true
    ? true
    : false;
};
//#endregion General

//#region lang & theme
if (lang == "en") {
  rootStyle.setProperty("--position-start", "left");
  rootStyle.setProperty("--position-end", "right");
  rootStyle.setProperty("--direction", "ltr");
  rootStyle.setProperty("--font-family", "sans-serif");
  rootStyle.setProperty("--display-btn-en", "none");
  rootStyle.setProperty("--display-btn-ar", "block");
  rootStyle.setProperty("--position-left-status", "auto");
  rootStyle.setProperty("--position-right-status", "0");
  rootStyle.setProperty("--fab-container-left", "auto");
  rootStyle.setProperty("--fab-container-right", "15px");
  rootStyle.setProperty("--sync-image-left", "auto");
  rootStyle.setProperty("--sync-image-right", "-10px");
  rootStyle.setProperty("--selection-dropdown-left", "auto");
  rootStyle.setProperty("--selection-dropdown-right", "1rem");
} else {
  rootStyle.setProperty("--position-start", "right");
  rootStyle.setProperty("--position-end", "left");
  rootStyle.setProperty("--direction", "rtl");
  rootStyle.setProperty("--font-family", "arabic");
  rootStyle.setProperty("--display-btn-en", "block");
  rootStyle.setProperty("--display-btn-ar", "none");
  rootStyle.setProperty("--position-left-status", "0");
  rootStyle.setProperty("--position-right-status", "auto");
  rootStyle.setProperty("--fab-container-left", "15px");
  rootStyle.setProperty("--fab-container-right", "auto");
  rootStyle.setProperty("--sync-image-left", "-10px");
  rootStyle.setProperty("--sync-image-right", "auto");
  rootStyle.setProperty("--selection-dropdown-left", "1rem");
  rootStyle.setProperty("--selection-dropdown-right", "auto");
}

// if (theme == "dark") {
//   rootStyle.setProperty("--color-top", "#011F26");
//   rootStyle.setProperty("--color-middel", "#01151A");
//   rootStyle.setProperty("--color-bg-main", "#1A1D21");
//   rootStyle.setProperty("--color-bg-page-content", "#1A1D21");
// } else {
//   rootStyle.setProperty("--color-top", "#42466b");
//   rootStyle.setProperty("--color-middel", "#383454");
//   rootStyle.setProperty("--color-bg-main", "#FFFFFF");
//   rootStyle.setProperty("--color-bg-page-content", "#FFFFFF");
// }
// check the user is login or not to hide or show sidebar
export const checkLoginForShowSidebar = () => {
  if (store.getters.userData) {
    document.body.classList.remove("change-app-content-layout");
  } else {
    document.body.classList.add("change-app-content-layout");
  }
};
checkLoginForShowSidebar();
//#endregion lang & theme

//#region downloadFileFromServer
export const downloadFileFromServer = (
  language,
  userAuthorizeToken,
  filePath
) => {
  window.open(
    `${BASE_URL}/General//AutoDwnloadFille?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filePath=${filePath}`,
    "_blank"
  );
};
export const viewFileFromServer = (filePath) => {
  window.open(`${BASE_URL}/${filePath}`, "_blank");
};
//#endregion downloadFileFromServer
