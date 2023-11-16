import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cierre-sesion',
  templateUrl: './cierre-sesion.component.html',
  styleUrls: ['./cierre-sesion.component.css'],
})
export class CierreSesionComponent {
  router!: Router;

  constructor(
    private servicioUsuario: UsuarioService,
    private loginService: LoginService
  ) {}

  // ngOnInit(): void {
  //   if (this.servicioUsuario.verifyLogged()) {
  //     this.router.navigate(['/inicio']);
  //   }
  // }

  onLogout(): void {
    this.loginService.logOut();
  }
}
