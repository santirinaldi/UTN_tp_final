import { Injectable,OnInit } from '@angular/core';
import { Usuario } from '../Models/usuario';
import { JSONService } from './JSON/json.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService{
  private userList = new Array<Usuario>();
  private userId = 0;

  constructor(private jsonService: JSONService, private router: Router) {
      this.pedidoAPI();
  }

  pedidoAPI() {
     this.jsonService.getAll()
     .then((response) => response.json())
     .then((json) => {
       json.forEach((item:Usuario) => {
        if(item.baja != 1) {
          this.userList.push(item);
        }
       })
     })
   .catch (error =>
     console.log(error))
  }

  add(user:Usuario) {
    user.id = this.userId;
    this.userList.push(user);
    this.userId++;
    this.jsonService.add(user);
  }

  baja(usuario:Usuario) {
    ///RECIBE USUARIO A ELIMINAR
    usuario.baja = 1;
    this.jsonService.putUser(usuario);
  }

  getUsers() {
    return this.userList;
  }

  getUser(id:number) {
    return this.userList.find((user) => user.id === id);
  }

  checkLoggedIn() {
    const log = localStorage.getItem("userLoggedin");
    return log;
  }

  logOut (){
    localStorage.removeItem("userLoggedin");//ver, uso userId o userLoggegin?
    this.router.navigate(['user-signup'])//llevar a pantalla de inicio de sesion, revisar
  }

  verifyLogged(): boolean{
    const token= localStorage.getItem("userLoggegin");
    return token ? true : false;
  }
}
