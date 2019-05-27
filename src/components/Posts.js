import React, {Component} from "react";
import User from "./User";
import InstaService from "../services/instaservice";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";

export default class Posts extends Component {
    InstaService = new InstaService();
    state = {
        posts: [],
        loading: true,
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
        this.setState({
            posts,
            loading: false,
            error: false,
        });
    }

    onError = (err) => {
        this.setState({
            posts: [],
            loading: false,
            error: true,
        });
    }

    renderItems(arr) {
        return arr.map(item => {
            const {name, altname, photo, src, alt, descr, id} = item;
            return (
                <div key={id} className="post">
                    <User
                        src={photo}
                        alt={altname}
                        name={name}
                        min
                    />
                    <img src={src} alt={alt}></img>
                    <div className="post__name">
                        {altname}
                    </div>
                    <div className="post__descr">
                        {descr}
                    </div>
                </div>
            );
        });
    }

    render() {
        const {error, posts, loading} = this.state;
        return (
            <div className="left">
                {loading ? <Loading /> : null}
                {error ? <ErrorMessage /> : null}
                {!loading && !error ? this.renderItems(posts) : null}
            </div>
        );
    }
}
