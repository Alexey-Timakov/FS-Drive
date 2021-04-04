document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByClassName("quest-and-ans__button");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.toggle("active");
        buttons[i].nextElementSibling.style.display = "none";
        buttons[i].querySelector(".arrow_up").classList.toggle("active");
        buttons[i].querySelector(".arrow_down").classList.toggle("active");

        buttons[i].addEventListener("click", function() {
            this.classList.toggle("active");
            let answerDiv = this.nextElementSibling;
            let arrowDown = this.querySelector(".arrow_down");
            let arrowUp = this.querySelector(".arrow_up");

            if (answerDiv.style.display == "block") {
                answerDiv.style.display = "none";
                arrowDown.classList.toggle("active");
                arrowUp.classList.toggle("active");
            } else {
                answerDiv.style.display = "block";
                arrowDown.classList.toggle("active");
                arrowUp.classList.toggle("active");
            }
        });
    }
});