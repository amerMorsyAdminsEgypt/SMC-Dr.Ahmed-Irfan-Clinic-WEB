// // var baseurl = "https://api-elsakr.adminssw.com/";
// var baseurl = "https://api-admins-transportation.adminssw.com/";
// // var baseurl = "http://192.168.1.180:80/";
// window.onload = function () {
//   render();
// };

// function render() {
//   firebase.auth().languageCode = "ar";
//   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
//     "recaptcha-container"
//   );
//   recaptchaVerifier.render();
// }

// function phoneAuth() {
//   //get the number
//   userCountryCode = $("#ccnamecc option:selected").attr("data-countrycode");
//   userCountryCodeName = $("#ccnamecc option:selected").attr(
//     "data-countrycodename"
//   );
//   userPhone = $("#number").val();
//   var number = userCountryCode + userPhone;
//   //phone number authentication function of firebase
//   //it takes two parameter first one is number,,,second one is recaptcha
//   firebase
//     .auth()
//     .signInWithPhoneNumber(number, window.recaptchaVerifier)
//     .then(function (confirmationResult) {
//       //s is in lowercase
//       window.confirmationResult = confirmationResult;
//       coderesult = confirmationResult;
//       //******** console.log(coderesult);
//       //******** alert("Message sent");
//       $(".alert.alert-danger").fadeOut();
//       $("#phoneNumberDiv").fadeOut();
//       $("#verificationCodeDiv").fadeIn(1000);
//     })
//     .catch(function (error) {
//       //******** alert(error.message);
//       $(".alert.alert-danger").empty();
//       $(".alert.alert-danger").append(error.message);
//       $(".alert.alert-danger").fadeIn();
//     });
// }

// function codeverify() {
//   userCountryCode = $("#ccnamecc option:selected").attr("data-countrycode");
//   userCountryCodeName = $("#ccnamecc option:selected").attr(
//     "data-countrycodename"
//   );
//   userPhone = $("#number").val();

//   var code = document.getElementById("verificationCode").value;
//   coderesult
//     .confirm(code)
//     .then(function (result) {
//       //******** alert("Successfully registered");
//       //******** var user = result.user;
//       //******** console.log(user);
//       $(".alert.alert-danger").fadeOut();
//       checkPhone(userCountryCode, userCountryCodeName, userPhone);
//     })
//     .catch(function (error) {
//       //******** alert(error.message);
//       $(".alert.alert-danger").empty();
//       $(".alert.alert-danger").append(error.message);
//       $(".alert.alert-danger").fadeIn();
//     });
// }

// function checkPhone(userCountryCode, userCountryCodeName, userPhone) {
//   var changePass = {
//     url: "" + baseurl + "/users/checkPhone",
//     method: "POST",
//     timeout: 0,
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     data: {
//       userCountryCode: userCountryCode,
//       userCountryCodeName: userCountryCodeName,
//       userPhone: userPhone,
//     },
//   };
//   $.ajax(changePass).done(function (response1) {
//     // console.log(response1);
//     if (response1.status == 1) {
//       userId = response1.userData.userId;
//       $("#userId").val(userId);
//       $("#verificationCodeDiv").fadeOut();
//       $("#changePasswordDiv").fadeIn(1000);
//     } else {
//       $(".alert.alert-danger").empty();
//       $(".alert.alert-danger").append(response1.msg);
//       $(".alert.alert-danger").fadeIn();
//     }
//   });
// }

// // checkPhone("+20", "EG", "01141997397");

// function updatePassword() {
//   userId = $("#userId").val();
//   userPassword = $("#userPassword").val();
//   // console.log(userId);
//   // console.log(userPassword);

//   var updatePass = {
//     url: "" + baseurl + "/users/UpdatePassword",
//     method: "POST",
//     timeout: 0,
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     data: {
//       userId: userId,
//       userPassword: userPassword,
//     },
//   };
//   $.ajax(updatePass).done(function (response2) {
//     // console.log(response2);
//     if (response2.status == 1) {
//       window.location.replace("index.php");
//     } else {
//       $(".alert.alert-danger").empty();
//       $(".alert.alert-danger").append(response2.msg);
//       $(".alert.alert-danger").fadeIn();
//     }
//   });
// }
