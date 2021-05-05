import * as React from "react";
import Member from "./Member";

import "../images/Ellipse 9.png";
import "../images/Ellipse 10.png";
import "../images/Ellipse 11.png";
import "../images/Ellipse 12.png";
import "../images/Ellipse 13.png";
import "../images/Ellipse 14.png";

function AboutTeam () {
    const ourTeam = [
        {
            "id": "1",
            "name": "Иван Иванов",
            "ocupation": "CEO",
            "src": "./images/Ellipse 9.png"
        },
        {
            "id": "2",
            "name": "Алексей Смирнов",
            "ocupation": "Frontend-разработчик",
            "src": "./images/Ellipse 10.png"
        },
        {
            "id": "3",
            "name": "Денис Ярцев",
            "ocupation": "Backend-разработчик",
            "src": "./images/Ellipse 11.png"
        },
        {
            "id": "4",
            "name": "Николай Морозов",
            "ocupation": "Дизайнер",
            "src": "./images/Ellipse 12.png"
        },
        {
            "id": "5",
            "name": "Ирина Деева",
            "ocupation": "Копирайтер",
            "src": "./images/Ellipse 13.png"
        },
        {
            "id": "6",
            "name": "Мария Стрелкова",
            "ocupation": "SMM",
            "src": "./images/Ellipse 14.png"
        },   
    ]
    return (
        <section className="about-team">
            <h2>Команда</h2>
            <div className="about-team__all">
                {ourTeam.map (member => <Member
                    name={member.name}
                    ocupation={member.ocupation}
                    src={member.src}
                    key={member.id}/>)}
            </div>
        </section>
    )
}

export default AboutTeam;