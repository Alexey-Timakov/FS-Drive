import * as React from "react";

function AboutContacts () {
    return (
        <section className="about-contacts">
        <div className="about-contacts__main-block">
            <h2>Контакты</h2>
            <div className="about-contacts__block">
                <div className="about-contacts__block-info">
                    <p className="about-contacts__block-info_descr">Электронная почта</p>
                    <a className="about-contacts__block-info_data" href="mailto:drive@skillfactory.com" aria-label="Электронная почта SkillDrive">drive@skillfactory.com</a>
                </div>
                <div className="about-contacts__block-info">
                    <p className="about-contacts__block-info_descr">Телефон</p>
                    <a className="about-contacts__block-info_data" href="tel:+79121234567" aria-label="Номер телефона SkillDrive">+7-912-123-45-67</a>
                </div>
            </div>
        </div>
        
    </section>
    )
}

export default AboutContacts;