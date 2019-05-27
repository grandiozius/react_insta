import React, {Component} from "react";
import User from "./User";
import InstaService from "../services/instaservice";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";

export default class Feed extends Component {
    InstaService = new InstaService();
    state = {
        users: [],
        loading: true,
        error: false,
    };

    componentDidMount() {
        this.updateUsers();
    }

    updateUsers() {
        this.InstaService.getAllUsers()
        .then(this.onUsersLoaded)
        .catch(this.onError);
    }

    onUsersLoaded = (users) => {
        this.setState({
            users,
            loading: false,
            error: false,
        });
    }

    onError = (err) => {
        this.setState({
            users: [],
            loading: false,
            error: true,
        });
    }

    renderItems(arr) {
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
        const {error, users, loading} = this.state;
        return (
            <div className="right">
                <User
                    src="https://image.shutterstock.com/image-photo/close-portrait-smiling-handsome-man-260nw-1011569245.jpg"
                    alt="handsome_man"
                    name="handsome_man"
                />
                <div className="users__block">
                    {loading ? <Loading /> : null}
                    {error ? <ErrorMessage /> : null}
                    {!loading && !error ? this.renderItems(users) : null}
                </div>
            </div>
        );
    }
}
