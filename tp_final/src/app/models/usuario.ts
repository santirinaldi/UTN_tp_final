import { BibliotecaRecetas } from "./biblioteca-recetas";
import { BibliotecaRutinas } from "./biblioteca-rutinas";

export class Usuario {
    id: number = 0;
    name: string = "";
    lastName: string = "";
    email: string = "";
    passWord: string = "";
    baja: number = 0;
    bibliotecaRutinas: BibliotecaRutinas = new BibliotecaRutinas(); 
    bibliotecaRecetas: BibliotecaRecetas = new BibliotecaRecetas();    
}
