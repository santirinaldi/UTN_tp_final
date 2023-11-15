import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { JSONService } from 'src/app/services/JSON/json.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Models/usuario';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-biblioteca-rutinas',
  templateUrl: './biblioteca-rutinas.component.html',
  styleUrls: ['./biblioteca-rutinas.component.css'],
})
export class BibliotecaRutinasComponent implements OnInit {
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
}
