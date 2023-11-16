import { Injectable, OnInit } from '@angular/core';
import { Usuario } from '../Models/usuario';
import { JSONService } from './JSON/json.service';
import { Router } from '@angular/router';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
//private userList = new Array<Usuario>();
//private userId = 0;
 private userList: any;

  constructor(private jsonService: JSONService, private router: Router) {
    this.pedidoAPI();
  }
  private pedidoAPI() {
    this.jsonService.getAll().subscribe({
      next: (data) => {
        this.userList = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getUser2(id: number): Observable<Usuario> {
    let user = new Usuario();
    const aux = this.userList?.find((user: Usuario) => user.id === id);
    if (aux !== undefined) {
      user = aux;
    }
    return of(user);
  }


  add(user: Usuario) {
    // user.id = this.userId;
    // this.userList.push(user);
    // this.userId++;
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

  getUsers() {
    return this.userList;

  }

  getUser(id:number, userList: Array<Usuario>):Usuario {
    let user = new Usuario();
    const aux = userList.find((user) => user.id === id);
    if(aux !== undefined) {
      user = aux;
    }
    //console.log(user);
    return user;
  }

  getById(userId: number){
    let users = this.userList.filter((user: { userId: number; }) => {
      return user.userId == userId;
    });

    return (users.length > 0) ? users[0] : null;
  }  


  // getUser3(id: number): Observable<Usuario> {
  //   let user = new Usuario();
  //   if (this.userList) {
  //     const aux = this.userList.find((user: Usuario) => user.id === id);
  //     if (aux !== undefined) {
  //       user = aux;
  //     }
  //   }
  //   return of(user);
  // }

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
