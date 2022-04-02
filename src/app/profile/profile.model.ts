export class Profile{
    id:string;
    name:string;
    email:string|undefined;
    profileImage:string;
    username:string;
  isSubscribed: any;
  isVerified: boolean;

    constructor(id:string, name:string,email:string, profileImage:string, username:string, isVerified: boolean){
        this.id = id;
        this.name = name;
        this.profileImage = profileImage;
        this.email = email;
        this.username = username;
        this.isVerified = isVerified;
    }
}