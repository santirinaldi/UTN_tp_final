import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario';

import FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class PostJSONService {

  // private user: Object = {};
  // private usersList: Object[] = [];

  // constructor() { }

  // add(usuario:  Usuario) {

  //   this.user = {
  //     id: usuario.Id,
  //     name: usuario.userName,
  //     lastname: usuario.userLastname,
  //     email: usuario.userEmail,
  //     pass: usuario.userPass,
  //     estado: usuario.Estado,
  //     rutinas: usuario.Rutinas,
  //     recetas: usuario.Recetas
  //   };
  //   ///leer json y guardar en userList
  //   this.usersList.push(this.user);
  //   ///escribir el json

  //   fetch("http://localhost:3000/users",
  //   {
  //       method: "POST",
  //       /*headers: {
  //         'Content-Type': 'application/json',
  //       },*/
  //       headers: new Headers({'content-type': 'application/json',Accept: 'application/json',}),
        
  //       body: JSON.stringify({"Id": 1,
  //       "userName": "Santiago2",
  //       "userLastname": "Rinaldi2",
  //       "userEmail": "santiago2@mail.com",
  //       "userPass": "1234",
  //       "Estado": true,
  //       "Rutinas": [],
  //       "Recetas": []})
  //   });


  // }
  
}
