import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/Models/usuario';
import { JSONService } from 'src/app/services/JSON/json.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-borrar-usuario',
  templateUrl: './borrar-usuario.component.html',
  styleUrls: ['./borrar-usuario.component.css'],
})
export class BorrarUsuarioComponent implements OnInit {
  loggedInStatus!: Number;
  userLogged!: Usuario;
  subcripcion!: Subscription;

  constructor(
    private servicioUsuario: UsuarioService,
    private loginService: LoginService,
    private jsonService: JSONService
  ) {}

  ngOnInit(): void {
    this.loginService.getisLoggedIn().subscribe((value) => {
      this.loggedInStatus = value;
      if (this.loggedInStatus != -1) {
        this.getUser();
      } else {
        console.log('nada');
      }
    });

    this.subcripcion = this.jsonService.refresh$.subscribe(() => {
      this.getUser();
    });
  }

  getUser() {
    this.jsonService.getUserByID(this.loggedInStatus).subscribe((user) => {
      this.userLogged = user;
      console.log(this.userLogged);
    });
  }

  borrarUsuario() {
    if (this.loggedInStatus != -1) {
      this.servicioUsuario.baja(this.userLogged);
      console.log('Eliminando..');
      this.servicioUsuario.logOut();
    } else {
      ///No se tiene que ver el boton
    }
  }
}
