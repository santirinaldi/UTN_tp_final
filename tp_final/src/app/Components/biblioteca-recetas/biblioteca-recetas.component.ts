import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Models/usuario';


@Component({
  selector: 'app-biblioteca-recetas',
  templateUrl: './biblioteca-recetas.component.html',
  styleUrls: ['./biblioteca-recetas.component.css']
})
export class BibliotecaRecetasComponent {
  constructor (private servicioUsuario: UsuarioService) {
  }

  @ViewChild('lista')lista!:ElementRef;
  @ViewChild('popupItem')popupItem!:ElementRef;

   
    const log = this.servicioUsuario.checkLoggedIn();

    const user: Usuario | undefined; 
    this.servicioUsuario.getUser(1).suscribe((usuario: Usuario)=>this.user=usuario);
    

  
}
