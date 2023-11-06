import { Component,OnInit } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-borrar-usuario',
  templateUrl: './borrar-usuario.component.html',
  styleUrls: ['./borrar-usuario.component.css']
})
export class BorrarUsuarioComponent {

  userList: Usuario[] = [];

  constructor(private servicioUsuario: UsuarioService) { }
  ///Input me tiene que llegar algun dato de algun componente

  ngOnInit(): void {
    this.servicioUsuario.getUsers(this.userList);
  }

  borrarUsuario() {
    const log = this.servicioUsuario.checkLoggedIn();
    if(log !== null) {
      const user = this.servicioUsuario.getUser(Number(log),this.userList);
      if(user) {
        this.servicioUsuario.baja(user);
        console.log("Eliminando..");
        this.servicioUsuario.logOut();
      }
    }
    else {
      ///No se tiene que ver el boton
    }
  }
}
