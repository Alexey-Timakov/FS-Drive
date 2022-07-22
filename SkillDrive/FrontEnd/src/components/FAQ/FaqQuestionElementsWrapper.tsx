import * as React from "react";
import FaqQuestionElement from "./FaqQuestionElement";
import questions from "./FaqQuestionsList";

function FaqQuestionElementsWrapper() {

  return (
    <section className="quest-and-ans">
      {questions.map(qa => <FaqQuestionElement question={qa.question} answer={qa.answer} key={qa.id} />)}
    </section>
  )
};

export default FaqQuestionElementsWrapper;