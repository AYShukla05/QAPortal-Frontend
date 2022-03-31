export class Profile{
    id:string;
    name:string;
    email:string|undefined;
    profileImage:string;
    username:string;
  isSubscribed: any;

    constructor(id:string, name:string,email:string, profileImage:string, username:string){
        this.id = id;
        this.name = name;
        this.profileImage = profileImage;
        this.email = email;
        this.username = username;
    }
}