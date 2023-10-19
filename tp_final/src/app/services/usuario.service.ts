import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private userList = new Array<Usuario>();
  private userId = 0;
  constructor() { }

  add(user:Usuario) {
    user.id = this.userId;
    this.userList.push(user);
    this.userId++;
  }

  getUsers() {
    return this.userList;
  }

  getByID(userId:number) {
    return this.userList.find((user) => {
      user.id = userId;
    });
  }
}
