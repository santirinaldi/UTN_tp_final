import { Component } from '@angular/core';
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
    ///this.servicioUsuario.baja(usuario) Necesito el usuario
  }
}
