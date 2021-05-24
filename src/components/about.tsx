import * as React from "react";
import Header from "./header";
import NoScript from "./NoScript";
import AboutIntro from "./About_Intro";
import AboutContacts from "./About_Contacts";
import AboutTeam from "./About_Team";
import Footer from "./Footer";

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