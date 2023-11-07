import { Injectable } from '@angular/core';
import { Observable, Subject, pipe } from 'rxjs';
import { Usuario } from 'src/app/Models/usuario';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JSONService {

  private apiURL = "http://localhost:3000/users";
  private user: Object = {};
  private usersList: Object[] = [];

  private refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  getRefresh$() {
    return this.refresh$;
  }

  getAll() {
    return this.http.get(this.apiURL);
  }

  add(usuario: Usuario) {

    this.user = {
      id: usuario.id,
      name: usuario.name,
      lastName: usuario.lastName,
      email: usuario.email,
      passWord: usuario.passWord,
      baja: usuario.baja,
      bibliotecaRutinas: usuario.bibliotecaRutinas,
      bibliotecaRecetas: usuario.bibliotecaRecetas
    };

    return this.http.post(this.apiURL, this.user);
  }

  putUser(usuario: Usuario) {
    return this.http.put(`http://localhost:3000/users/${usuario.id}`,usuario);
  }

  // add(usuario:  Usuario) {

  //   this.user = {
  //     id: usuario.id,
  //     name: usuario.name,
  //     lastname: usuario.lastName,
  //     email: usuario.email,
  //     passWord: usuario.passWord,
  //     baja: usuario.baja,
  //     bibliotecaRutina: usuario.bibliotecaRutinas,
  //     bibliotecaReceta: usuario.bibliotecaRecetas
  //   };

  //   fetch("http://localhost:3000/users",
  //   {
  //       method: "POST",
  //       /*headers: {
  //         'Content-Type': 'application/json',
  //       },*/
  //       headers: new Headers({'content-type': 'application/json',Accept: 'application/json',}),
  //       body: JSON.stringify(this.user)
  //   });

  // }

  // getById(id: string | null) {
  //   return fetch('http://localhost:3000/users');
  // }

  // getAll(): Promise<any> { /// EJEMPLO GET
  //   return fetch('http://localhost:3000/users'); /// RETORNA UNA PROMESA A CAPTURAR EN EL COMPONENTE QUE LO REQUIERA
  // }

  // putUser(usuario:Usuario) {
  //     const user = {
  //       id: usuario.id,
  //       name: usuario.name,
  //       lastname: usuario.lastName,
  //       email: usuario.email,
  //       passWord: usuario.passWord,
  //       baja: usuario.baja,
  //       bibliotecaRutina: usuario.bibliotecaRutinas,
  //       bibliotecaReceta: usuario.bibliotecaRecetas
  //     };

  //     fetch(`http://localhost:3000/users/${user.id}`,
  //     {
  //         method: "PUT",
  //         /*headers: {
  //           'Content-Type': 'application/json',
  //         },*/
  //         headers: new Headers({'content-type': 'application/json',Accept: 'application/json',}),
  //         body: JSON.stringify(user)
  //     });
  // }

}
