import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { Usuario } from 'src/app/Models/usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JSONService {

  private apiURL = "http://localhost:3000/users";
  private user: Object = {};
  private usersList: Object[] = [];

  constructor(private http: HttpClient) { }

  add(usuario:  Usuario) {

    this.user = {
      id: usuario.id,
      name: usuario.name,
      lastname: usuario.lastName,
      email: usuario.email,
      pass: usuario.passWord,
      baja: usuario.baja,
      rutinas: usuario.listaRutinas,
      recetas: usuario.listaRecetas
    };}

    modify(usuario:  Usuario) {

      this.user = {
        name: usuario.name,
        lastname: usuario.lastName,
        email: usuario.email,
        pass: usuario.passWord,
        baja: usuario.baja,
      };

    fetch("http://localhost:3000/users",
    {
        method: "POST",
        /*headers: {
          'Content-Type': 'application/json',
        },*/
        headers: new Headers({'content-type': 'application/json',Accept: 'application/json',}),
        body: JSON.stringify(this.user)
    });

  }

  getAll(): Promise<any> { /// EJEMPLO GET
    return fetch('http://localhost:3000/users'); /// RETORNA UNA PROMESA A CAPTURAR EN EL COMPONENTE QUE LO REQUIERA
  }

  putUser(usuario:Usuario) {
      const user = {
        id: usuario.id,
        name: usuario.name,
        lastname: usuario.lastName,
        email: usuario.email,
        pass: usuario.passWord,
        baja: usuario.baja,
        rutinas: usuario.listaRutinas,
        recetas: usuario.listaRecetas
      };
  
      fetch(`http://localhost:3000/users/${user.id}`,
      {
          method: "PUT",
          /*headers: {
            'Content-Type': 'application/json',
          },*/
          headers: new Headers({'content-type': 'application/json',Accept: 'application/json',}),
          body: JSON.stringify(user)
      });
  }
 
}
