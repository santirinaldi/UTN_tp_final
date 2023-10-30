import { Injectable,OnInit } from '@angular/core';
import { Usuario } from '../Models/usuario';
import { JSONService } from './JSON/json.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService{
  private userList = new Array<Usuario>();
  private userId = 0;

  constructor(private jsonService: JSONService) {
      this.pedidoAPI();
  }

  /*cargarUserList() {
    this.jsonService.getAll().subscribe((data: Usuario) => {
      this.userList.push(data);
    });
  }*/

  
  pedidoAPI() {
     this.jsonService.getAll()
     .then((response) => response.json())
     .then((json) => {
       this.userList = json;
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

  getUsers() {
    return this.userList;
  }

  getByID(userId:number) {
    return this.userList.find((user) => {
      user.id = userId;
    });
  }

  baja(usuario:Usuario) {
    ///RECIBE USUARIO A ELIMINAR
    usuario.baja = 1;
  }
}
