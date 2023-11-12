import { Injectable, OnInit } from '@angular/core';
import { Usuario } from '../Models/usuario';
import { JSONService } from './JSON/json.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private jsonService: JSONService, private router: Router) {}

  add(user: Usuario) {
    this.jsonService.add(user).subscribe((response) => {
      console.log(response);
    });
  }

  baja(usuario: Usuario) {
    ///RECIBE USUARIO A ELIMINAR
    usuario.baja = 1;
    this.jsonService.putUser(usuario).subscribe((response) => {
      console.log(response);
    });
  }

  getUser(id: number, userList: Array<Usuario>): Usuario {
    let user = new Usuario();
    const aux = userList.find((user) => user.id === id);
    if (aux !== undefined) {
      user = aux;
    }
    //console.log(user);
    return user;
  }

  checkLoggedIn() {
    const log = localStorage.getItem('userLoggedin');
    return log;
  }

  logOut() {
    localStorage.removeItem('userLoggedin');
    this.router.navigate(['/inicio']);
  }

  verifyLogged(): boolean {
    const token = localStorage.getItem('userLoggegin');
    return token ? true : false;
  }
}
