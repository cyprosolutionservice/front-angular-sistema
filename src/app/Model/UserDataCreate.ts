export class UserDataCreate{
    NOMBRE: string;
    APELLIDO:string;
    E_MAIL: string;
    CLAVE: string;
    ROL_ID: string;


    constructor(NOMBRE: string, APELLIDO:string, E_MAIL:string, CLAVE: string, ROL_ID: string){
        this.NOMBRE = NOMBRE;
        this.APELLIDO = APELLIDO;
        this.E_MAIL = E_MAIL;
        this.CLAVE = CLAVE;
        this.ROL_ID = ROL_ID;
    }
}