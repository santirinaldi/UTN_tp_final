import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent {

  userName: string = '';
  userLastname: string = '';
  userEmail: string = '';
  userPassword: string = '';

  editUser() {
    
  }

}
