import * as React from "react";

import "../../images/undraw_team_spirit.svg";

function AboutIntro () {
    return (
        <section className="about-us">
        <figure><img src="./images/undraw_team_spirit.svg" alt="Схематическое векторное изображение команды разработчиков"/></figure>
        <div className="about-us__text">
            <h1>О нас</h1>
            <p>Это учебный проект, созданный с целью получения боевого опыта в разработке настоящего живого веб-приложения.
            Этот сервис имитирует работу каршеринга, в котором можно не только арендовать автомобили, но и сдавать их в аренду.</p>    
        </div>
    </section>
    )
}

export default AboutIntro;