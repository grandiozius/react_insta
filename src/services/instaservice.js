export default class InstaService {
    constructor() {
        this._apiBase = "http://localhost:3000/";
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }

        return res.json();
    }

    getAllPosts = async () => {
        const res = await this.getResource("posts/");
        return res;
    }

    getAllUsers = async () => {
        const res = await this.getResource("posts/");
        return res.map(post => this._transformPosts(post, "users"));
    }

    getAllPhotos = async () => {
        const res = await this.getResource("posts/");
        return res.map(post => this._transformPosts(post, "photos"));
    }

    _transformPosts = (post, type) => {
        switch (type) {
            case "users":
                return {
                    name: post.name,
                    altname: post.altname,
                    photo: post.photo,
                    id: post.id,
                };
            case "photos":
                return {
                    src: post.src,
                    alt: post.alt,
                    id: post.id,
                };
            default:
                return post;
        }
    }
}
