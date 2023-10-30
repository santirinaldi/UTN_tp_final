import { Component } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-borrar-usuario',
  templateUrl: './borrar-usuario.component.html',
  styleUrls: ['./borrar-usuario.component.css']
})
export class BorrarUsuarioComponent {
  constructor(private servicioUsuario: UsuarioService) { }
  ///Input me tiene que llegar algun dato de algun componente
  borrarUsuario() {
    const log = this.servicioUsuario.checkLoggedIn();
    if(log !== null) {
      const user = this.servicioUsuario.getUser(Number(log));
      if(user) {
        this.servicioUsuario.baja(user);
        localStorage.removeItem(log);
        console.log("Eliminando..");
      }
    }
    else {
      ///No se tiene que ver el boton
    }
  }
}
