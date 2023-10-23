import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario';

import FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class PostJSONService {

  private user: Object = {};
  private usersList: Object[] = [];

  constructor() { }

  add(usuario:  Usuario) {

    this.user = {
      id: usuario.Id,
      name: usuario.userName,
      lastname: usuario.userLastname,
      email: usuario.userEmail,
      pass: usuario.userPass,
      estado: usuario.Estado,
      rutinas: usuario.Rutinas,
      recetas: usuario.Recetas
    };
    ///leer json y guardar en userList
    this.usersList.push(this.user);
    ///escribir el json

    let blob = new Blob([JSON.stringify(this.usersList)], { type: 'application/json' });
    FileSaver.saveAs(blob, 'test.json');

    console.log("USER LIST: ", this.usersList);
  }
  
}
