export default class UserError extends Error{
    constructor(message:string, name:string){
        super(message)
        this.message= message || "new User error"
        this.name=name || "UserError" 
    }
}