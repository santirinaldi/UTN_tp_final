import { Component } from '@angular/core';
import { Usuario } from '../../Models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

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

  constructor(private usuarioService: UsuarioService) {}

  addUser() {
    let user = new Usuario();
    user.userName = this.userName;
    user.userLastname = this.userLastname;
    user.userEmail = this.userEmail;
    user.userPass = this.userPass;

    this.usuarioService.add(user);
  }

}
