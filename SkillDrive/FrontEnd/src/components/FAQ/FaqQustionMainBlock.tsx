import * as React from "react";

import "./images/undraw_questions.svg";
import FaqQuestionElementsWrapper from "./FaqQuestionElementsWrapper";

function MainFaq() {
  return (
    <main>
      <section className="faq-logo">
        <figure><img src="./undraw_questions.svg" alt="Схематическое векторное изображение человека с вопросом" /></figure>
        <div className="faq-logo__text">
          <h1>Частые вопросы</h1>
          <p>Отвечаем на вопросы, которые у вас могут возникнуть.</p>
        </div>
      </section>
      <FaqQuestionElementsWrapper />
    </main>
  )
}

export default MainFaq;