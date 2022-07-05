document.addEventListener("DOMContentLoaded", () => {
    const error = document.querySelector(".reset-pass-error");
    const userMail = document.querySelector("#userMail");
    const userPassword = document.querySelector("#userPassword");
    const userPasswordCheck = document.querySelector("#userPasswordCheck");
    const submitButton = document.querySelector(".submit-footer__button");
    
    document.querySelectorAll(".block-input__wrapper > a").forEach(item => item.addEventListener("click", changePassView));

    submitButton.addEventListener("click", submitChangePass);

    let errorCount = 0;

    let userData = {
        "userMail": "",
        "userPassword" : "",
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
            errorCount +=1;
            return false;
        } else {
            hideErrorInput(userMail);
            userData.userMail = userMail.value;
            return true;
        }
    }

    function checkUserPassword() {
        const strongPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        if (!strongPass.test(userPassword.value)) {
            showErrorInput(userPassword);
            errorCount +=1;
            return false;
        } else {
            if (userPassword.value != userPasswordCheck.value) {
                showErrorInput(userPasswordCheck);
                errorCount +=1;
                return false;
            } else {
                hideErrorInput(userPasswordCheck);
                userData.userPassword = userPassword.value;
                return true;
            }
        }
    }

    function submitChangePass(event) {
        event.preventDefault();
        error.classList.remove("is-active");
        checkUserMail();
        checkUserPassword();
        
        if (errorCount == 0) {
            submitButton.innerHTML="";
            submitButton.classList.add("is-waiting");
            console.log(userData);
            fetch("http://localhost:8000/changePass", {
                method: "POST",
                headers: {
                    "Origin": "http://localhost:8080",
                    "Content-Type": "application/json;charset=utf-8",
                  },
                body: JSON.stringify(userData),
            })
            .then(res => res.json())
            .then(res => {
                submitButton.classList.remove("is-waiting");            
                if (res.isOK) {
                    submitButton.disabled = true;
                    submitButton.innerHTML="Успешно!";
                    console.log(res);
                } else {
                    console.log(res);
                    error.classList.add("is-active");
                    submitButton.innerHTML="Продолжить";
                }
            })
            .catch(err => {
                console.log(err);
                error.classList.add("is-active");
                submitButton.innerHTML="Продолжить";
            })
        }
    }
})