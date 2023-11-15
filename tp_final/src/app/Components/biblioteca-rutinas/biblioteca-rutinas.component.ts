import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { JSONService } from 'src/app/services/JSON/json.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Models/usuario';

@Component({
  selector: 'app-biblioteca-rutinas',
  templateUrl: './biblioteca-rutinas.component.html',
  styleUrls: ['./biblioteca-rutinas.component.css'],
})
export class BibliotecaRutinasComponent implements OnInit {
  loggedInStatus!: Number;
  userLogged!: Usuario;

  constructor(
    private servicioUsuario: UsuarioService,
    private loginService: LoginService,
    private jsonService: JSONService
  ) {}

  ngOnInit(): void {
    // this.isLogged = this.servicioUsuario.checkLoggedIn();

    this.loginService.getisLoggedIn().subscribe((value) => {
      this.loggedInStatus = value;
      if (this.loggedInStatus != -1) {
        this.jsonService.getUserByID(this.loggedInStatus).subscribe((user) => {
          this.userLogged = user;
          console.log(this.userLogged);
        });
      } else {
        console.log('nada');
      }
    });
  }
}
