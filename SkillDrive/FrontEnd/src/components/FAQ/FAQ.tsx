import * as React from "react";
import { useEffect } from "react";
import "../../scss/faq.scss";

import Header from "../Common/Header";
import NoScript from "../Common/NoScript";
import FaqQuestionMainBlock from "./FaqQustionMainBlock";
import Footer from "../Common/Footer";

function Faq() {

  useEffect(() => {
    let buttons = document.getElementsByClassName("quest-and-ans__button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.toggle("active");
      buttons[i].nextElementSibling.classList.toggle("active");
      buttons[i].querySelector(".arrow_up").classList.toggle("active");
      buttons[i].querySelector(".arrow_down").classList.toggle("active");

      buttons[i].addEventListener("click", function () {
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("active");
        this.querySelector(".arrow_down").classList.toggle("active");
        this.querySelector(".arrow_up").classList.toggle("active");
      });
    }
  })

  return (
    <>
      <Header />
      <NoScript />
      <FaqQuestionMainBlock />
      <Footer />
    </>
  )
}

export default Faq;