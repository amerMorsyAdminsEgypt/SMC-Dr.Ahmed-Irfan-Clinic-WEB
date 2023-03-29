export const isValidNameAr = (text) => {
  const ARABIC_PATTERN = /^[\u0621-\u064A\0-9\s]{2,400}$/gi;

  return ARABIC_PATTERN.test(text.trim());
};
export const isValidNameEn = (text) => {
  const ENGLISH_PATTERN = /^[a-z\d\s]{2,400}$/gi;

  return ENGLISH_PATTERN.test(text.trim());
};

export const isValidTextAr = (text) => {
  const ARABIC_PATTERN =
    /^([\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufbc1]|[\ufbd3-\ufd3f]|[\ufd50-\ufd8f]|[\ufd92-\ufdc7]|[\ufe70-\ufefc]|[\ufdf0-\ufdfd]|\d|\s)*$/gi;

  return ARABIC_PATTERN.test(text.trim());
};
export const isValidTextEn = (text) => {
  const ENGLISH_PATTERN = /^[a-z\d\s!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?]*$/gi;

  return ENGLISH_PATTERN.test(text.trim());
};
export const isValidEmail = (text) => {
  const EMAIL_PATTERN = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/gi;

  return EMAIL_PATTERN.test(text.trim());
};

export const isValidPassword = (text) => {
  // Should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long
  const PASSWORD_PATTERN =
    /(?=(.*[0-9]))(?=.*[\\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;

  return PASSWORD_PATTERN.test(text.trim());
};

export const isValidInteger = (text) => {
  const INTGER_PATTERN = /^\d+$/gi;

  return INTGER_PATTERN.test(text.trim());
};
export const isValidFloat = (text) => {
  const FLOAT_PATTERN = /^[+-]?\d+(\.\d+)?$/gi;

  return FLOAT_PATTERN.test(text.trim());
};

//#region Top 15 Commonly Used Regex

// 1. Digits
// Whole Numbers – /^\d+$/
// Decimal Numbers – /^\d*\.\d+$/
// Whole + Decimal Numbers – /^\d*(\.\d+)?$/
// Negative, Positive Whole + Decimal Numbers – /^-?\d*(\.\d+)?$/
// Whole + Decimal + Fractions – /[-]?[0-9]+[,.]?[0-9]*([\/][0-9]+[,.]?[0-9]*)*/

// 2. Alphanumeric Characters
// Alphanumeric without space – /^[a-zA-Z0-9]*$/
// Alphanumeric with space – /^[a-zA-Z0-9 ]*$/

// 3. Email
// Common email Ids – /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/
// Uncommon email ids – /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/

// 4. Password Strength
// Complex: Should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long
// /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
// Moderate: Should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long
// /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/

// 5. Username
// Alphanumeric string that may include _ and – having a length of 3 to 16 characters –
// /^[a-z0-9_-]{3,16}$/

// 6. URL
// Include http(s) Protocol
// /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/
// Protocol Optional
// /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

// 7. IP Address
/* Match IPv4 address */
// /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
// /* Match IPv6 address */
// /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/

// 8. Dates
// Date Format YYYY-MM-dd using separator (-)
// /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
// Date Format dd-MM-YYYY using separators (- or . or /)
// /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
// Date Format dd-mmm-YYYY using separators (- or . or /)
// /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/

// 9. Time
// Time Format HH:MM 12-hour, optional leading 0
// /^(0?[1-9]|1[0-2]):[0-5][0-9]$/
// Time Format HH:MM 12-hour, optional leading 0, Meridiems (AM/PM)
// /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/
// Time Format HH:MM 24-hour with leading 0
// /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
// Time Format HH:MM 24-hour, optional leading 0
// /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
// Time Format HH:MM:SS 24-hour
// /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/

// 10. HTML Tags
// Elements with Attributes /<\/?[\w\s]*>|<.+[\W]>/

// 11. Javascript Handlers
// Inline JS handler /\bon\w+=\S+(?=.*>)/
// Inline JS handler with element /(?:<[^>]+\s)(on\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/

// 12. Slug
// Slug /^[a-z0-9]+(?:-[a-z0-9]+)*$/

// 13. Match Duplicates in a String
// Search Duplicates /(\b\w+\b)(?=.*\b\1\b)/

// 14. Phone Numbers
// International Phone Numbers – with optional country code/extension
// /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/

// 15. File Path
// File Path with Filename and extension
// /((\/|\\|\/\/|https?:\\\\|https?:\/\/)[a-z0-9 _@\-^!#$%&+={}.\/\\\[\]]+)+\.[a-z]+$/
// File Path with optional Filename, extension
// /^(.+)/([^/]+)$/
// File Name with extension having 3 chars
// /^[\w,\s-]+\.[A-Za-z]{3}$/

//#endregion Top 15 Commonly Used Regex
