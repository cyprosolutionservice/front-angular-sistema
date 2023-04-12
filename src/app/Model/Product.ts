export class Producto{
    CODPRODUCTO?: string;
    CODPRODTEC?: string;
    DESCRIPCION: string;
    UNIDAD: string;
    TIPOA: string;
    CODFAMILIA?: string;
    CODDEPTO?: string;
    CODCATEGORIA?: string;
    CODLISTA: string;
    PRECIO: string;



    constructor(CODPRODUCTO: string, CODPRODTEC: string, DESCRIPCION: string, UNIDAD: string, 
        TIPOA: string, CODFAMILIA: string, CODDEPTO: string, CODCATEGORIA: string, CODLISTA: string, PRECIO: string){

            this.CODPRODUCTO = CODPRODUCTO;
            this.CODPRODTEC = CODPRODTEC;
            this.DESCRIPCION= DESCRIPCION;
            this.UNIDAD= UNIDAD;
            this.TIPOA = TIPOA;
            this.CODFAMILIA = CODFAMILIA;
            this.CODDEPTO = CODDEPTO;
            this.CODCATEGORIA = CODCATEGORIA;
            this.CODLISTA = CODLISTA;
            this.PRECIO = PRECIO;
        }
}