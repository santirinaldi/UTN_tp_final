import { Component } from '@angular/core';
import { Usuario } from '../../Models/usuario';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent {

  userName: string = '';
  userLastname: string = '';
  userEmail: string = '';
  userPass: string = '';

  constructor() {}

  addUser() {
    let user = new Usuario();
    user.Nombre = this.userName;
    user.Apellido = this.userLastname;
    user.Email = this.userEmail;
    user.Pass = this.userPass;
  }

}
