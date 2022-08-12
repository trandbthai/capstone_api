document.getElementById("btn-submit").onclick = function (e) {
  console.log("hello");
  e.preventDefault();
  // check validation
  var isValid = checkValidation();
  console.log(isValid);
  if (!isValid) {
    return;
  }

  //   post data api
  var email = document.getElementById("email").value;
  var name = document.getElementById("name").value;
  var password = document.getElementById("password").value;
  var phone = document.getElementById("phone").value;
  var gender = true;
  if (document.getElementById("female").checked) {
    gender = false;
  }
  var newUser = {
    email: email,
    password: password,
    name: name,
    gender: gender,
    phone: phone,
  };

  console.log(newUser);

  var promise = axios({
    url: " https://shop.cyberlearn.vn/api/Users/signup",
    method: "POST",
    data: newUser,
  });

  promise.then(function (result) {
    console.log("result", result);
    document.getElementById("register-mess").innerHTML = result.data.message;
    resetInput();
  });

  promise.catch(function (err) {
    console.log("err", err);
    document.getElementById("register-mess").innerHTML =
      err.response.data.message;
    resetInput();
  });
};

const checkValidation = () => {
  //   check valueMissing and patternMismatch
  var inputList = document.querySelectorAll(".input_style");

  for (let i = 0; i < inputList.length; i++) {
    let input = inputList[i];
    if (input.validity.valueMissing) {
      document.getElementById("txt-" + `${input.id}`).innerHTML =
        `${input.name}` + " không được để trống.";
      return false;
    } else if (input.validity.patternMismatch) {
      document.getElementById("txt-" + `${input.id}`).innerHTML =
        `${input.name}` + " không đúng định dạng.";
    } else {
      document.getElementById("txt-" + `${input.id}`).innerHTML = "";
    }
  }

  //check gender
  var maleChecked = document.getElementById("male").checked;
  var femaleChecked = document.getElementById("female").checked;
  if (!maleChecked && !femaleChecked) {
    document.getElementById("txt-gender").innerHTML = "Vui lòng chọn giới tính";
    return false;
  } else {
    document.getElementById("txt-gender").innerHTML = "";
  }

  //   check password
  var pwd = document.getElementById("password");
  var pwdConfirm = document.getElementById("passwordConfirm");

  if (pwd.value !== pwdConfirm.value) {
    document.getElementById("txt-passwordConfirm").innerHTML =
      "Mật khẩu không trùng khớp.";
    return false;
  } else {
    document.getElementById("txt-passwordConfirm").innerHTML = "";
  }

  return true;
};

window.resetInput = () => {
  var inputList = document.querySelectorAll(".input_style");

  for (let i = 0; i < inputList.length; i++) {
    let input = inputList[i];
    console.log(input);
    document.getElementById(input.id).value = "";
  }
};
