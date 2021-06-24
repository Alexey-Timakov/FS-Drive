import * as React from "react";
import QAElement from "./QA_Element";
import questions from "./Faq_quiestions";

function FaqQAMain () {

    return (
        <section className="quest-and-ans">
            {questions.map(qa => <QAElement question={qa.question} answer={qa.answer} key={qa.id}/>)}
        </section>
    )
};

export default FaqQAMain;