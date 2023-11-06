import { Component,OnInit } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario';
import { JSONService } from 'src/app/services/JSON/json.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-borrar-usuario',
  templateUrl: './borrar-usuario.component.html',
  styleUrls: ['./borrar-usuario.component.css']
})
export class BorrarUsuarioComponent {

  userList: Usuario[] = [];

  constructor(private servicioUsuario: UsuarioService, private jsonService: JSONService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.jsonService.getAll().subscribe((data: any) => {
      this.userList = data;
    });
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
