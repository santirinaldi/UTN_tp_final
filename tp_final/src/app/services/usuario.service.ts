import { Injectable, OnInit } from '@angular/core';
import { Usuario } from '../Models/usuario';
import { JSONService } from './JSON/json.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  // private userList = new Array<Usuario>();
  // private userId = 0;

  constructor(private jsonService: JSONService, private router: Router) {
    //this.pedidoAPI();
  }

  // pedidoAPI() {
  //    this.jsonService.getAll()
  //    .then((response) => response.json())
  //    .then((json) => {
  //      json.forEach((item:Usuario) => {
  //       if(item.baja != 1) {
  //         this.userList.push(item);
  //       }
  //      })
  //    })
  //  .catch (error =>
  //    console.log(error))
  //   }

  add(user: Usuario) {
    // user.id = this.userId;
    // this.userList.push(user);
    // this.userId++;
    this.jsonService.add(user).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/inicioSesion']);
    });
  }

  baja(usuario: Usuario) {
    ///RECIBE USUARIO A ELIMINAR
    usuario.baja = 1;
    this.jsonService.putUser(usuario);
  }

  getUser(id:number, userList: Array<Usuario>):Usuario {
    let user = new Usuario();
    const aux = userList.find((user) => user.id === id);
    if(aux !== undefined) {
      user = aux;
    }
    console.log(user);
    return user;
  }

  checkLoggedIn() {
    const log = localStorage.getItem('userLoggedin');
    return log;
  }

  logOut() {
    localStorage.removeItem('userLoggedin');
    this.router.navigate(['inicioSesion']);
  }

  verifyLogged(): boolean {
    const token = localStorage.getItem('userLoggegin');
    return token ? true : false;
  }
}
