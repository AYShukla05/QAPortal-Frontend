import { Profile } from "../profile/profile.model";

export class Post{
    public owner:Profile;
    public title: string;
    public body: string;
    public id:string;

    constructor(owner: Profile, title: string, body: string, id:string) {
        this.owner = owner;
        this.title = title;
        this.body = body;
        this.id = id;
    }
}