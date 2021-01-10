
export default class User {
    username: string;
    email:string;
    password:string | undefined;
    _id:string | undefined

    constructor(_username: string, _email:string, _password:string | undefined,__id:string | undefined) {
       
    this.username = _username;
      this.email= _email;
      this.password = _password;
      this._id=__id
    }
}