import { Component,ViewChild,ElementRef } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario';
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


constructor(private servicioUsuario: UsuarioService) {}

  addUser() {
    let user = new Usuario();
    user.name = this.userName;
    user.lastName = this.userLastname;
    user.email = this.userEmail;
    user.passWord = this.userPass;
    this.servicioUsuario.add(user);
  }

}
