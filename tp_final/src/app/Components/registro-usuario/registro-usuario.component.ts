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
    user.name = this.userName;
    user.lastName = this.userLastname;
    user.email = this.userEmail;
    user.passWord = this.userPass;
  }

}
