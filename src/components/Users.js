import React, {Component} from "react";
import User from "./User";
import InstaService from "../services/instaservice";
import ErrorMessage from "./ErrorMessage";

export default class Feed extends Component {
    InstaService = new InstaService();
    state = {
        users: [],
        error: false,
    };

    componentDidMount() {
        this.updatePosts();
    }

    updatePosts() {
        this.InstaService.getAllPosts()
        .then(this.onPostsLoaded)
        .catch(this.onError);
    }

    onPostsLoaded = (posts) => {
        const users = posts.map(item => {
            const {name, altname, photo, id} = item;
            return {name, altname, photo, id};
        });
        this.setState({
            users,
        });
    }

    onError = (err) => {
        this.setState({
            error: true,
        });
    }

    renderUsers(arr) {
        return arr.map(item => {
            const {name, altname, photo, id} = item;
            return (
                <User
                    key={id}
                    src={photo}
                    alt={altname}
                    name={name}
                    min
                />
            );
        });
    }

    render() {
        const {error, users} = this.state;
        const items = this.renderUsers(users);
        return (
            <div className="right">
                <User
                    src="https://image.shutterstock.com/image-photo/close-portrait-smiling-handsome-man-260nw-1011569245.jpg"
                    alt="prince"
                    name="Harry_the_prince"
                />
                <div className="users__block">
                    {error ? <ErrorMessage /> : null}
                    {items}
                </div>
            </div>
        );
    }
}
