import * as React from "react";

import "./About.scss";

// import Header from "../Header/Header";
// import NoScript from "../Common/NoScript";
import AboutIntro from "./About_Intro";
import AboutContacts from "./About_Contacts";
import AboutTeam from "./About_Team";
// import Footer from "../Footer/Footer";

function About() {
    return (
        <>
            {/* <Header /> */}
            {/* <NoScript /> */}
            <main>
                <AboutIntro />
                <AboutContacts />
                <AboutTeam />
            </main>
            {/* <Footer /> */}
        </>
    )
}

export default About;