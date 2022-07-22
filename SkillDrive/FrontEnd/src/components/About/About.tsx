import * as React from "react";
import "../../scss/about.scss";

import Header from "../Common/Header";
import NoScript from "../Common/NoScript";
import AboutIntro from "./About_Intro";
import AboutContacts from "./About_Contacts";
import AboutTeam from "./About_Team";
import Footer from "../Common/Footer";

function About () {
    return (
        <>
            <Header />
            <NoScript />
            <main>
                <AboutIntro />
                <AboutContacts />
                <AboutTeam />
            </main>
            <Footer />
        </>
    )
}

export default About;