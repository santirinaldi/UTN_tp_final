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

/*modificarUsuario() {
    let userId = this.buscarUsuario(userId);
    userId.name = this.userName;
    user.lastName = this.userLastname;
    user.email = this.userEmail;
    user.passWord = this.userPass;
    this.servicioUsuario.(user);
  }

  usar getUser y putUser*/

  /*<button type="button" class="btn primary" (click)="modificarUsuario()">Modificar</button>*/

  buscarUsuario(userBuscado:Usuario) {
    
    let userList = this.servicioUsuario.getUsers();
    let userID = -1;
    console.log(userList);

    userList.forEach((user) => {
      if(user.passWord === userBuscado.passWord && user.email === userBuscado.email) {
        userID = user.id;
      }
    });

    return userID;
  }

}
