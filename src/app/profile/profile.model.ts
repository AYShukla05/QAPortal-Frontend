export class Profile{
    id:string;
    name:string;
    password:string;
    user:number;
    username:string;

    constructor(id:string, name:string, password:string, user:number, username:string){
        this.id = id;
        this.name = name;
        this.password = password;
        this.user = user;
        this.username = username;
    }
}