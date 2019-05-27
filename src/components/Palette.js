import React, {Component} from "react";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";
import InstaService from "../services/instaservice";

export default class Palette extends Component {
    InstaService = new InstaService();
    state = {
        photos: [],
        loading: true,
        error: false,
    };

    componentDidMount() {
        this.updatePhotos();
    }

    updatePhotos() {
        this.InstaService.getAllPhotos()
        .then(this.onPhotosLoaded)
        .catch(this.onError);
    }

    onPhotosLoaded = (photos) => {
        this.setState({
            photos,
            loading: false,
            error: false,
        });
    }

    onError = (err) => {
        this.setState({
            photos: [],
            loading: false,
            error: true,
        });
    }

    renderItems(arr) {
        return arr.map(item => {
            const {src, alt, id} = item;
            return (
                <img src={src} alt={alt} key={id}></img>
            );
        });
    }

    render() {
        const {error, photos, loading} = this.state;
        return (
            <div className="palette">
                {loading ? <Loading /> : null}
                {error ? <ErrorMessage /> : null}
                {!loading && !error ? this.renderItems(photos): null}
            </div>
        );
    }
}
