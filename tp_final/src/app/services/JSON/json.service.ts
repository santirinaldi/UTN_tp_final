import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { Usuario } from 'src/app/Models/usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JSONService {

  private apiURL = "http://localhost:3000";
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
      estado: usuario.baja,
      rutinas: usuario.listaRutinas,
      recetas: usuario.listaRecetas
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

  // async getAll(): Array<Object> {

  //   const allUsers = fetch('http://localhost:3000/users')
  //   .then((response) => response.json())
  //   .then((json) => 
  //     console.log("JSON: ", json)
  //   );

  //   return allUsers;

  // }

  getAll(): Promise<any> { /// EJEMPLO GET
    return fetch('http://localhost:3000/users'); /// RETORNA UNA PROMESA A CAPTURAR EN EL COMPONENTE QUE LO REQUIERA
  }

  // add(user: Usuario) {
  //   return this.http.post(this.apiURL + '/users', user);
  // }

  // getAll(){
  //   ///FUNCION QUE RETORNA LOS DATOS DEL JSON-SERVER
  //    return this.http.get<Usuario>(this.apiURL + '/users');
  // }

  
}
