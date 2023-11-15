import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Models/usuario';
import { Lista } from 'src/app/Models/lista';
import { JSONService } from 'src/app/services/JSON/json.service';

@Component({
  selector: 'app-biblioteca-rutinas',
  templateUrl: './biblioteca-rutinas.component.html',
  styleUrls: ['./biblioteca-rutinas.component.css']
})
export class BibliotecaRutinasComponent implements OnInit {
  protected user: Usuario= new Usuario();
  protected rutinaActual?: Lista;
  constructor (private servicioUsuario: UsuarioService, private jsonService: JSONService){}

    
  
    @ViewChild('lista')lista!:ElementRef;
    @ViewChild('popupItem')popupItem!:ElementRef;
  
  
    ngOnInit(): void {
      const log = this.servicioUsuario.checkLoggedIn();
      this.servicioUsuario.getUser2(1).subscribe((usuario: Usuario)=>{
        console.log(usuario);
        this.user=usuario
        console.log(this.user);
        
      });
    } 

    mostrarRutina(rutina: Lista) {
      console.log(rutina);
      this.rutinaActual=rutina;
    }

    nombreListaActualizar(nombre: string){
      console.log(nombre);
      const usuarioActualizado: Usuario={
        ...this.user,
      bibliotecaRutinas: {...this.user.bibliotecaRutinas, nombre: nombre}
      };
      console.log(usuarioActualizado);
      this.jsonService.putUser(usuarioActualizado).subscribe((response) => {
        this.user=response;
      })
    }

    
}

