export class Post{
    public owner: string;
    public title: string;
    public body: string;
    public id:number;

    constructor(owner: string, title: string, body: string, id:number) {
        this.owner = owner;
        this.title = title;
        this.body = body;
        this.id = id;
    }
}