
export default class VideoError extends Error {
    constructor(message:string,name:string) {
      super(message)
      this.message = message || 'Credenciales incorrectas. Asegúrate que el username y contraseña sean correctas.'
      this.name =  name || 'CredencialesIncorrectas'
     
      
    }
  }