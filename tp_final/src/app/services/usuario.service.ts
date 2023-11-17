import { Injectable, OnInit } from '@angular/core';
import { Usuario } from '../Models/usuario';
import { JSONService } from './JSON/json.service';
import { Router } from '@angular/router';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private userList: any;
  user: any;

  constructor(private jsonService: JSONService, private router: Router) {}

  /*
  private userList = new Array<Usuario>();
    //private userList = new Array<Usuario>();
    //private userId = 0;
 

  constructor(private jsonService: JSONService, private router: Router) {
    this.pedidoAPI();
  }
  

  getUser(id:number, userList: Array<Usuario>):Usuario {
  */

  private pedidoAPI() {
    this.jsonService.getAll().subscribe({
      next: (data) => {
        this.userList = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  add(user: Usuario) {
    // user.id = this.userId;
    // this.userList.push(user);
    // this.userId++;
    this.jsonService.add(user).subscribe((response) => {
      console.log(response);
      this.router.navigateByUrl('/inicio-sesion');
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

    return user;
  }



  checkLoggedIn() {
    const log = localStorage.getItem('loggedIn');
    return log;
  }

  logOut() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/inicio']);
  }

  verifyLogged(): boolean {
    const token = localStorage.getItem('loggedIn');
    return token ? true : false;
  }




}

