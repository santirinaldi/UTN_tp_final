import { Component } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  userEmail: string = '';
  userPass: string = '';

  constructor(private servicioUsuario: UsuarioService) {}

  verifyUser() {
    let user = new Usuario();
    user.email = this.userEmail;
    user.passWord = this.userPass;

    console.log(this.servicioUsuario.getUsers());
    //let userID = this.buscarUsuario(user);
  }

  // buscarUsuario(userBuscado:Usuario) {
    
  //   let userList = this.servicioUsuario.getUsers();

  //   const user = userList.find((user) => {
  //     user.email === userBuscado.email && user.passWord === userBuscado.passWord
  //   });

  //   return user?.id;
  // }

}
