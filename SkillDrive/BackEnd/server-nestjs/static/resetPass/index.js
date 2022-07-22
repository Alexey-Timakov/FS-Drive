document.addEventListener("DOMContentLoaded", () => {
  const error = document.querySelector(".reset-pass-error");
  const userMail = document.querySelector("#userMail");
  const userPassword = document.querySelector("#userPassword");
  const userPasswordCheck = document.querySelector("#userPasswordCheck");
  const submitButton = document.querySelector(".submit-footer__button");

  document.querySelectorAll(".block-input__wrapper > a").forEach(item => item.addEventListener("click", changePassView));

  submitButton.addEventListener("click", submitChangePass);

  let errorCount = 0;

  const userData = {
    "userMail": "",
    "userPassword": "",
  };

  function changePassView(event) {
    event.preventDefault();
    let inputField = event.target.previousElementSibling;
    if (inputField.getAttribute('type') == 'password') {
      event.target.classList.add('eye-on');
      inputField.setAttribute('type', 'text');
    } else {
      event.target.classList.remove('eye-on');
      inputField.setAttribute('type', 'password');
    }
  }

  function showError() {
    error.classList.add("is-active");
  }

  function hideError() {
    error.classList.remove("is-active");
  }

  function submitButtonShowWaiting() {
    submitButton.innerHTML = "";
    submitButton.classList.add("is-waiting");
  }

  function submitButtonHideWaiting() {
    submitButton.innerHTML = "Продолжить";
    submitButton.classList.remove("is-waiting");
  }

  function submitButtonShowSuccess() {
    submitButton.innerHTML = "Успешно!";
    submitButton.disabled = true;
    submitButton.classList.remove("is-waiting");
  }

  function showErrorInput(key) {
    key.parentNode.nextElementSibling.classList.add("active");
    key.classList.add("error");
  }

  function hideErrorInput(key) {
    key.parentNode.nextElementSibling.classList.remove("active");
    key.classList.remove("error");
  }

  function checkUserMail() {
    const regularEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    if (!regularEmail.test(String(userMail.value).toLowerCase())) {
      showErrorInput(userMail);
      errorCount += 1;
    } else {
      hideErrorInput(userMail);
      userData.userMail = userMail.value;
    }
  }

  function checkUserPassword() {
    const strongPass = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if (!strongPass.test(userPassword.value)) {
      showErrorInput(userPassword);
      errorCount += 1;
    } else {
      hideErrorInput(userPassword);
      if (userPassword.value !== userPasswordCheck.value) {
        showErrorInput(userPasswordCheck);
        errorCount += 1;
      } else {
        hideErrorInput(userPasswordCheck);
        userData.userPassword = userPassword.value;
      }
    }
  }

  function submitChangePass(event) {
    event.preventDefault();
    hideError();

    errorCount = 0;
    checkUserMail();
    checkUserPassword();

    if (errorCount === 0) {
      submitButtonShowWaiting();
      console.log(userData);

      fetch("http://localhost:3000/users/changepass", {
        method: "POST",
        headers: {
          "Origin": "http://localhost:8080",
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(userData),
      })
        .then(res => {
          if (res.ok) {
            submitButtonShowSuccess();
          }
          else {
            showError();
            submitButtonHideWaiting();
            console.log(res);
          }
        })
        .catch(err => {
          showError();
          submitButtonHideWaiting();
          console.log(err);
        })
    }
  }
})