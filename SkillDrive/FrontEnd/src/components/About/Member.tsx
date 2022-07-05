import * as React from "react";

function Member (props) {
    const altImage = props.name + "фото";
    return (
        <figure>
            <img src={props.src} alt={altImage} />
            <figcaption>
                <p className="about-team__all_name">{props.name}</p>
                <p className="about-team__all_ocupation">{props.ocupation}</p>
            </figcaption>
        </figure>
    )
}

export default Member;