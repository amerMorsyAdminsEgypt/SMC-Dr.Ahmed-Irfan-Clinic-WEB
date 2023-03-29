// export const BASE_URL =
//   "https://api-medical-center-management-dev-v1.4.arcplangroup.com/";
export const BASE_URL = "https://api-smc-Dr-Ahmed-Irfan-Clinic.adminssw.com/";
// export const BASE_URL = "https://api-medical-center-management-dev-v1.0.premcoprecast.com/";
// export const BASE_URL = "https://api-smc-Sales.premcoprecast.com/";
// export const BASE_URL = "https://api-breeze-v1.0.premcoprecast.com/";
// export const BASE_URL = "https://api-smc-aldalal.premcoprecast.com/";
// export const BASE_URL = "https://api-smc-zamzam.premcoprecast.com/";
// export const BASE_URL = "https://api-smc-wellness.premcoprecast.com/";
// export const BASE_URL = "https://api-smc-merta.premcoprecast.com/";

import { getDeviceName, getBrowserName } from "@/utils/functions";
export const USER_VERSION = {
  userPlatFormToken: "PFT-3",
  userFirebaseToken: "test",
  userVersionNumber: "1.0",
  deviceNameEn: "Unkonwn",
  deviceVersion: getBrowserName() + " " + getDeviceName(),
};

export const STATUS = {
  SUCCESS: 200, // success operation
  INVALID_TOKEN: 498, //invalid token
  CATCH: 500, // catch
  NO_CONTENT: 204, // no data
  ERROR: 406, // validation
  VERSION: 306, // error version
};

export const DEFAULT_COUNTRY_CODE = {
  countryCode: "+20",
  countryCodeName: "EG",
  CCWithCCName: "EG +20",
};

export const TAX_VALUE = 14;
export const PAGE_SIZE = 16;
export const IMPOSSIBLE_TOKEN = 0;
export const SERVICES_RESERVATIONS_CALENDAR_INTERVAL = 60 * 30;
export const SERVICE_TYPE_NAME_MIN_LENGTH = 3;
export const SERVICE_TYPE_NAME_MAX_LENGTH = 50;
export const SERVICE_NAME_DESC = 500;
export const SCIENTIFIC_DEGREE_NAME_MIN_LENGTH = 3;
export const SCIENTIFIC_DEGREE_NAME_MAX_LENGTH = 50;
export const SCIENTIFIC_DEGREE_NAME_DESC = 500;
export const GENERAL_SPECIALIATY_NAME_MIN_LENGTH = 3;
export const GENERAL_SPECIALIATY_NAME_MAX_LENGTH = 50;
export const GENERAL_SPECIALIATY_NAME_DESC = 500;
export const SPECIAL_SPECIALIATY_NAME_MIN_LENGTH = 3;
export const SPECIAL_SPECIALIATY_NAME_MAX_LENGTH = 50;
export const SPECIAL_SPECIALIATY_NAME_DESC = 500;
export const SERVICE_MIN_LENGTH = 3;
export const SERVICE_MAX_LENGTH = 50;
export const SERVICE_DESC = 500;

export const NAME_MIN_LENGTH = 3;
export const NAME_MAX_LENGTH = 50;
export const TEXT_MAX_LENGTH = 500;
export const TEXT_MAX_LENGTH_SUPER = 1000000;
export const MAX_ROWS_TEXTAREA = 100;

export const NEWS_MEDIA_TYPE_TOKEN_IMAGE = "MET-1";
export const NEWS_MEDIA_TYPE_TOKEN_VIDEO = "MET-2";
export const NEWS_MEDIA_TYPE_TOKEN_AUDIO = "MET-3";
export const NEWS_MEDIA_TYPE_TOKEN_PDF = "MET-4";
export const NEWS_MEDIA_TYPE_TOKEN_EXCEL = "MET-5";
export const NEWS_MEDIA_TYPE_TOKEN_WORD = "MET-6";
export const NEWS_MEDIA_TYPE_TOKEN_POWER_POINT = "MET-7";

export const IMAGE_EXTENSIONS = [
  "jpeg",
  "jpg",
  "gif",
  "tiff",
  "psd",
  "tiff",
  "eps",
  "ai",
  "aidd",
  "raw",
];
export const VIDEO_EXTENSIONS = [
  "mov",
  "avi",
  "wmv",
  "mp4",
  "m4p",
  "m4v",
  "mpg",
  "mp2",
  "mpeg",
  "mpe",
  "mpv",
  "3gp",
  "flv",
];
export const AUDIO_EXTENSIONS = [
  "aif",
  "cda",
  "mid",
  "mp3",
  "mpa",
  "ogg",
  "wav",
  "wma",
  "wpl",
];
export const PDF_EXTENSIONS = ["pdf"];
export const EXCEL_EXTENSIONS = ["xlsx", "xlsm", "xlsb", "xltx"];
export const WORD_EXTENSIONS = ["doc", "docm", "docx"];
export const POWER_POINT_EXTENSIONS = ["ppsx", "ppt", "pptm", "pptx"];
