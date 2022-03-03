export class Profile{
    id:string;
    name:string;
    email:string|undefined;
    password:string;
    username:string;

    constructor(id:string, name:string,email:string, password:string, username:string){
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.username = username;
    }
}