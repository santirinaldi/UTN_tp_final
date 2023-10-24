import { Injectable } from '@angular/core';
import { Usuario } from '../Models/usuario';
import { PostJSONService } from './JSON/post-json.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private userList = new Array<Usuario>();
  private userId = 0;
  constructor(private jsonService: PostJSONService) { }

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

  baja(usuario:Usuario) {
    ///RECIBE USUARIO A ELIMINAR
    usuario.baja = 1;
  }
}
