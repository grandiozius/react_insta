import React from "react";
import User from "./User";
import Palette from "./Palette";

const Profile = () => {
    return (
        <div className="continer profile">
            <User
                src="https://image.shutterstock.com/image-photo/close-portrait-smiling-handsome-man-260nw-1011569245.jpg"
                alt="handsome_man"
                name="handsome_man"
            />
            <Palette />
        </div>
    );
}

export default Profile;
