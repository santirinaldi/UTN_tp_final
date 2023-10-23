import { Injectable } from '@angular/core';
import { Usuario } from '../Models/usuario';
import { PostJSONService } from './JSON/post-json.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private idUsuario = 0;

  constructor(private jsonservice: PostJSONService) { }

  add(usuario:  Usuario) {
    usuario.Id = this.idUsuario;
    this.idUsuario++;
    this.jsonservice.add(usuario);
  }
  getAll() {
    //return this.listaUsuarios;
  }
}