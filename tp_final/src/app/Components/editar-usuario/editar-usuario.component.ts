import { Component,ViewChild,ElementRef } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario';
import { JSONService } from 'src/app/services/JSON/json.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent {
  userName: string = '';
  userLastname: string = '';
  userEmail: string = '';
  userPass: string = '';


constructor(private servicioUsuario: UsuarioService, private servicioJson: JSONService) {}


  /*<button type="button" class="btn primary" (click)="modificarUsuario()">Modificar</button>*/

  editarUsuario() {
    const log = this.servicioUsuario.checkLoggedIn();
    if(log !== null) {
      const user = this.servicioUsuario.getUser(Number(log));
      if(user) {
        user.name=this.userName;
        user.lastName=this.userLastname;
        user.email=this.userEmail;
        user.passWord=this.userPass;
        this.servicioJson.putUser(user);
         console.log("Actualizando..");
      }
    }

}}
