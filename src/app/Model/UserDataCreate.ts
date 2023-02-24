export class UserDataCreate{
    NOMBRE: string;
    APELLIDO:string;
    CLAVE: string;
    ROL_ID: string;


    constructor(NOMBRE: string, APELLIDO:string, CLAVE: string, ROL_ID: string){
        this.NOMBRE = NOMBRE;
        this.APELLIDO = APELLIDO;
        this.CLAVE = CLAVE;
        this.ROL_ID = ROL_ID;
    }
}